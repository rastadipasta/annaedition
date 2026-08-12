"use client";

import { upload } from "@vercel/blob/client";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { TurnstileField } from "@/components/turnstile-field";
import type { InquiryPayload, InquiryType } from "@/lib/types";

const typeMeta: Record<InquiryType, { title: string; subtitle: string }> = {
  private: { title: "Privatkunden", subtitle: "Pakete & Räume" },
  business: { title: "Unternehmen", subtitle: "Business & Hospitality" },
  call: { title: "Call a Designer", subtitle: "1:1 online" },
};

const privateSteps = ["Projekt", "Ästhetik", "Budget", "Kontakt"];
const businessSteps = ["Unternehmen", "Projekt", "Umfang", "Kontakt"];
const callSteps = ["Ziel", "Inspiration", "Termin", "Kontakt"];

type FormValues = Record<string, string | string[]>;

function SelectField({ name, label, options, value, required, onChange }: { name: string; label: string; options: string[]; value?: string; required?: boolean; onChange: (name: string, value: string) => void }) {
  return <div className="field"><label htmlFor={name}>{label}{required ? " *" : ""}</label><select id={name} name={name} required={required} value={value || ""} onChange={(event) => onChange(name, event.target.value)}><option value="">Bitte auswählen</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}

function TextField({ name, label, value, required, type = "text", full, onChange }: { name: string; label: string; value?: string; required?: boolean; type?: string; full?: boolean; onChange: (name: string, value: string) => void }) {
  return <div className={`field${full ? " full" : ""}`}><label htmlFor={name}>{label}{required ? " *" : ""}</label><input id={name} name={name} type={type} required={required} value={value || ""} onChange={(event) => onChange(name, event.target.value)} /></div>;
}

function ChoiceGroup({ name, label, options, value, multiple, onChange }: { name: string; label: string; options: string[]; value?: string | string[]; multiple?: boolean; onChange: (name: string, value: string | string[]) => void }) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  function select(option: string) { if (!multiple) return onChange(name, option); onChange(name, values.includes(option) ? values.filter((item) => item !== option) : [...values, option]); }
  return <fieldset className="field full" style={{ border: 0, padding: 0, margin: 0 }}><legend>{label}</legend><div className="choice-grid">{options.map((option) => { const id = `${name}-${option.replace(/\W/g, "-")}`; return <div className="choice" key={option}><input id={id} type={multiple ? "checkbox" : "radio"} checked={values.includes(option)} onChange={() => select(option)} /><label htmlFor={id}>{option}</label></div>; })}</div></fieldset>;
}

export function InquiryForm() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("anfrage") as InquiryType) || "private";
  const [type, setType] = useState<InquiryType>(typeMeta[initialType] ? initialType : "private");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>({});
  const [files, setFiles] = useState<File[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const steps = type === "private" ? privateSteps : type === "business" ? businessSteps : callSteps;
  const update = (name: string, value: string | string[]) => setValues((current) => ({ ...current, [name]: value }));
  const progress = `${((step + 1) / steps.length) * 100}%`;

  const commonContact = <div className="form-grid"><TextField name="name" label="Vor- und Nachname" required value={values.name as string} onChange={update} /><TextField name="email" label="E-Mail-Adresse" type="email" required value={values.email as string} onChange={update} /><TextField name="phone" label="Telefonnummer" value={values.phone as string} onChange={update} /><TextField name="city" label="Wohnort" value={values.city as string} onChange={update} /><div className="field full"><label htmlFor="message">Nachricht, Anmerkungen und Weiteres</label><textarea id="message" value={(values.message as string) || ""} onChange={(event) => update("message", event.target.value)} /></div></div>;

  function chooseType(next: InquiryType) { setType(next); setStep(0); setValues({}); setFiles([]); setStatus("idle"); }

  function handleFiles(fileList: FileList | null) {
    const next = Array.from(fileList || []);
    if (next.length > 5) return setError("Bitte maximal fünf Dateien auswählen.");
    const invalid = next.find((file) => file.size > 25 * 1024 * 1024 || !["image/jpeg", "image/png", "application/pdf"].includes(file.type));
    if (invalid) return setError("Erlaubt sind JPG, PNG und PDF bis 25 MB je Datei.");
    setError(""); setFiles(next);
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setStatus("sending"); setError("");
    try {
      const attachmentUrls: string[] = [];
      for (const file of files) {
        const blob = await upload(`inquiries/${crypto.randomUUID()}-${file.name}`, file, { access: "public", handleUploadUrl: "/api/upload" });
        attachmentUrls.push(blob.url);
      }
      const { name = "", email = "", phone = "", message = "", website = "", ...details } = values;
      const payload: InquiryPayload = { type, name: String(name), email: String(email), phone: String(phone), message: String(message), website: String(website), consent: values.consent === "yes", startedAt, turnstileToken, attachmentUrls, details };
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || "Die Anfrage konnte nicht gesendet werden.");
      setStatus("success");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Die Anfrage konnte nicht gesendet werden."); setStatus("error"); }
  }

  const uploadField = <div className="field full"><label htmlFor="files">Grundrisse, Moodboards oder Inspirationen · JPG, PNG oder PDF · max. 25 MB</label><input id="files" type="file" multiple accept=".jpg,.jpeg,.png,.pdf" onChange={(event) => handleFiles(event.target.files)} /><small>{files.length ? `${files.length} Datei(en) ausgewählt` : "Optional, maximal fünf Dateien"}</small></div>;

  function privateStep() {
    if (step === 0) return <div className="form-grid"><ChoiceGroup name="area" label="Um welchen Bereich handelt es sich?" options={["Wohnzimmer", "Schlafzimmer", "Küche", "Badezimmer", "Home Office", "Gesamte Wohnung / Haus", "Neubau", "Anderer Bereich"]} value={values.area} onChange={update} /><SelectField name="size" label="Größe des Projekts" options={["Unter 20 m²", "20–50 m²", "50–100 m²", "Über 100 m²"]} value={values.size as string} onChange={update} /><SelectField name="stage" label="Projektphase" options={["Erste Ideenphase", "Planung läuft bereits", "Renovierung / Umbau geplant"]} value={values.stage as string} onChange={update} /></div>;
    if (step === 1) return <div className="form-grid"><ChoiceGroup name="atmosphere" label="Welche Atmosphäre wünschst du dir?" multiple options={["Ruhig & reduziert", "Modern", "Klassisch", "Zeitlos & elegant", "Warm & wohnlich", "Individuell"]} value={values.atmosphere} onChange={update} /><TextField name="pinterest" label="Pinterest-Board oder Inspirationslink" full value={values.pinterest as string} onChange={update} />{uploadField}</div>;
    if (step === 2) return <div className="form-grid"><SelectField name="budget" label="Budgetrahmen für die Umsetzung" required options={["Unter 10.000 €", "10.000–25.000 €", "25.000–50.000 €", "Über 50.000 €"]} value={values.budget as string} onChange={update} /><SelectField name="start" label="Gewünschter Projektstart" required options={["Sofort", "In 1–3 Monaten", "In 3–6 Monaten", "Flexibel / erste Ideen"]} value={values.start as string} onChange={update} /><SelectField name="source" label="Wie bist du auf ANNA ÉDITION aufmerksam geworden?" options={["Instagram", "Pinterest", "Empfehlung", "Google-Suche", "Flyer / Broschüre"]} value={values.source as string} onChange={update} /></div>;
    return commonContact;
  }

  function businessStep() {
    if (step === 0) return <div className="form-grid"><TextField name="company" label="Unternehmen" required value={values.company as string} onChange={update} /><TextField name="position" label="Position im Unternehmen" value={values.position as string} onChange={update} /><TextField name="websiteUrl" label="Website" full value={values.websiteUrl as string} onChange={update} /></div>;
    if (step === 1) return <div className="form-grid"><ChoiceGroup name="projectType" label="Art des Projekts" multiple options={["Büro", "Praxis", "Health & Wellbeing", "Gastronomie", "Hotel / Hospitality", "Immobilienprojekt", "Showroom", "Retail / Store", "Sonstiges"]} value={values.projectType} onChange={update} /><SelectField name="surface" label="Größe der Fläche" required options={["Unter 100 m²", "100–250 m²", "250–500 m²", "Über 500 m²"]} value={values.surface as string} onChange={update} /><TextField name="location" label="Standort des Projekts" required value={values.location as string} onChange={update} /><TextField name="goal" label="Projektziel" required value={values.goal as string} onChange={update} /></div>;
    if (step === 2) return <div className="form-grid"><ChoiceGroup name="services" label="Gewünschte Leistungen" multiple options={["Interior-Konzept", "Raumplanung", "Material- & Farbkonzept", "Möblierung", "3D-Visualisierung", "Projektbegleitung", "Full-Service"]} value={values.services} onChange={update} /><SelectField name="investment" label="Investitionsrahmen" required options={["Unter 25.000 €", "25.000–50.000 €", "50.000–100.000 €", "100.000–250.000 €", "Über 250.000 €"]} value={values.investment as string} onChange={update} /><SelectField name="start" label="Gewünschter Projektstart" required options={["Sofort", "In 1–3 Monaten", "In 3–6 Monaten", "Flexibel / erste Ideen"]} value={values.start as string} onChange={update} />{uploadField}</div>;
    return commonContact;
  }

  function callStep() {
    if (step === 0) return <div className="form-grid"><SelectField name="goal" label="Was ist dein vorrangiges Ziel?" required options={["Mehr Ruhe & Klarheit", "Optimierung des Grundrisses", "Stildefinition", "Material- & Farbkonzept", "Möblierungskonzept", "Entscheidungsfindung"]} value={values.goal as string} onChange={update} /></div>;
    if (step === 1) return <div className="form-grid"><TextField name="pinterest" label="Pinterest-Board oder Inspirationslink" full value={values.pinterest as string} onChange={update} />{uploadField}<div className="field full"><label htmlFor="call-note">Was möchtest du im Call klären?</label><textarea id="call-note" value={(values.callNote as string) || ""} onChange={(event) => update("callNote", event.target.value)} /></div></div>;
    if (step === 2) return <div className="form-grid"><SelectField name="budget" label="Budget für die Umsetzung" options={["Unter 10.000 €", "10.000–25.000 €", "25.000–50.000 €", "Über 50.000 €", "Noch offen"]} value={values.budget as string} onChange={update} /><SelectField name="time" label="Wunschzeitraum für den Call" required options={["Vormittags", "Mittags", "Nachmittags", "Abends"]} value={values.time as string} onChange={update} /></div>;
    return commonContact;
  }

  if (status === "success") return <div className="form-success"><Check size={38} aria-hidden="true" /><h2 className="display" style={{ fontSize: "3rem" }}>Danke für deine Anfrage.</h2><p>Wir melden uns persönlich mit einer ersten Einschätzung und passenden nächsten Schritten.</p></div>;

  const isLast = step === steps.length - 1;
  return (
    <>
      <div className="inquiry-tabs" role="tablist" aria-label="Art der Anfrage">
        {(Object.keys(typeMeta) as InquiryType[]).map((key) => <button key={key} className="inquiry-tab" type="button" role="tab" aria-selected={type === key} onClick={() => chooseType(key)}><strong>{typeMeta[key].title}</strong><span>{typeMeta[key].subtitle}</span></button>)}
      </div>
      <form className="form-shell" onSubmit={submit} noValidate={false}>
        <div className="form-progress"><span>{String(step + 1).padStart(2, "0")}</span><div className="form-progress-line"><span style={{ width: progress }} /></div><span>{steps[step]}</span></div>
        <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" value={(values.website as string) || ""} onChange={(event) => update("website", event.target.value)} aria-hidden="true" />
        {type === "private" ? privateStep() : type === "business" ? businessStep() : callStep()}
        {isLast ? <div className="field full" style={{ marginTop: "2rem" }}><label style={{ display: "flex", gap: ".7rem", alignItems: "flex-start" }}><input style={{ width: 20, minHeight: 20 }} type="checkbox" required checked={values.consent === "yes"} onChange={(event) => update("consent", event.target.checked ? "yes" : "")} /><span>Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage verarbeitet werden. *</span></label><TurnstileField onToken={setTurnstileToken} /></div> : null}
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="form-actions">{step > 0 ? <button className="button-link" type="button" onClick={() => setStep((value) => value - 1)}><ArrowLeft size={16} /> Zurück</button> : <span />}{isLast ? <button className="button-solid" type="submit" disabled={status === "sending"}>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"} <ArrowRight size={16} /></button> : <button className="button-solid" type="button" onClick={() => setStep((value) => value + 1)}>Weiter <ArrowRight size={16} /></button>}</div>
      </form>
    </>
  );
}
