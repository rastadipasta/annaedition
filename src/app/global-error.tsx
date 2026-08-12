"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="de">
      <body style={{ fontFamily: "sans-serif", padding: "4rem", background: "#40191e", color: "#ffffff" }}>
        <main>
          <p>ANNA ÉDITION</p>
          <h1>Etwas ist schiefgegangen.</h1>
          <p>Bitte lade die Seite erneut oder versuche es in einem Moment noch einmal.</p>
          <button type="button" onClick={reset}>Erneut versuchen</button>
        </main>
      </body>
    </html>
  );
}
