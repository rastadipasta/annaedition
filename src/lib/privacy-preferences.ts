export type ConsentChoice = "all" | "necessary";
export type Theme = "light" | "dark";

export const consentCookie = "anna_cookie_consent";
export const themeCookie = "anna-theme";
export const introStorage = "anna-site-intro-seen";
export const consentLifetime = 60 * 60 * 24 * 180;

// Version 2 also covers the optional intro preference. Old choices must be renewed.
export function readConsent() {
  const value = document.cookie.split(/;\s*/).find((entry) => entry.startsWith(`${consentCookie}=`))?.split("=")[1];
  const match = /^v2\.(all|necessary)\.(\d+)$/.exec(value || "");
  if (!match || Number(match[2]) <= Date.now()) return null;
  return { choice: match[1] as ConsentChoice, expiresAt: Number(match[2]) };
}

function writeCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

export function saveTheme(theme: Theme) {
  const consent = readConsent();
  if (consent?.choice !== "all") return;
  // Changing the theme must never extend its lifetime beyond the consent.
  writeCookie(themeCookie, theme, Math.max(0, Math.floor((consent.expiresAt - Date.now()) / 1000)));
}

export function rememberIntro() {
  if (readConsent()?.choice !== "all") return;
  try { sessionStorage.setItem(introStorage, "true"); } catch { /* Storage may be blocked. */ }
}

export function storeConsent(choice: ConsentChoice) {
  writeCookie(consentCookie, `v2.${choice}.${Date.now() + consentLifetime * 1000}`, consentLifetime);
  try { localStorage.removeItem(themeCookie); } catch { /* Remove legacy storage when possible. */ }
  if (choice === "all") {
    saveTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    if ((window as Window & { __annaIntroSeen?: boolean }).__annaIntroSeen) rememberIntro();
  } else {
    writeCookie(themeCookie, "", 0);
    try { sessionStorage.removeItem(introStorage); } catch { /* Storage may be blocked. */ }
  }
  window.dispatchEvent(new CustomEvent("anna:consent-change", { detail: choice }));
}

// Runs before hydration to avoid a light-theme flash. Only reads optional values
// after checking the consent version and its expiry; also removes legacy storage.
export const privacyBootstrapScript = `(function(){
  var allowed=false,theme='light',seen=false;
  try{
    var entries=document.cookie.split(/;\\s*/);
    var consent=entries.find(function(v){return v.indexOf('${consentCookie}=')===0});
    var match=/^v2\\.(all|necessary)\\.(\\d+)$/.exec(consent?consent.split('=')[1]:'');
    allowed=!!(match&&match[1]==='all'&&Number(match[2])>Date.now());
    if(allowed){
      var saved=entries.find(function(v){return v.indexOf('${themeCookie}=')===0});
      theme=saved&&saved.split('=')[1]==='dark'?'dark':'light';
    }else{
      document.cookie='${themeCookie}=; Max-Age=0; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
    }
  }catch(e){}
  try{localStorage.removeItem('${themeCookie}')}catch(e){}
  try{if(allowed){seen=sessionStorage.getItem('${introStorage}')==='true'}else{sessionStorage.removeItem('${introStorage}')}}catch(e){}
  document.documentElement.dataset.theme=theme;
  var enabled=false;
  try{enabled=!matchMedia('(prefers-reduced-motion: reduce)').matches&&!seen}catch(e){}
  window.__annaIntroEnabled=enabled;
  window.__annaIntroSeen=seen;
  document.documentElement.classList.add(enabled?'site-intro-enabled':'site-intro-skip');
})()`;
