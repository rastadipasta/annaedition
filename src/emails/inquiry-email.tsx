import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import type { ValidInquiry } from "@/lib/inquiry-schema";

const labels = { private: "Privatkunden", business: "Unternehmen", call: "Call a Designer" } as const;

export function InquiryEmail({ inquiry }: { inquiry: ValidInquiry }) {
  return <Html><Head /><Preview>Neue {labels[inquiry.type]}-Anfrage von {inquiry.name}</Preview><Body style={body}><Container style={container}><Text style={eyebrow}>ANNA ÉDITION · NEUE ANFRAGE</Text><Heading style={heading}>{labels[inquiry.type]}</Heading><Text><strong>{inquiry.name}</strong><br /><Link href={`mailto:${inquiry.email}`}>{inquiry.email}</Link>{inquiry.phone ? <><br />{inquiry.phone}</> : null}</Text><Hr style={rule} /><Section>{Object.entries(inquiry.details).map(([key, value]) => <Text key={key}><strong>{key}</strong><br />{Array.isArray(value) ? value.join(", ") : value}</Text>)}</Section>{inquiry.message ? <><Hr style={rule} /><Text><strong>Nachricht</strong><br />{inquiry.message}</Text></> : null}{inquiry.attachmentUrls.length ? <><Hr style={rule} /><Text><strong>Dateien</strong></Text>{inquiry.attachmentUrls.map((url, index) => <Text key={url}><Link href={url}>Datei {index + 1} öffnen</Link></Text>)}</> : null}</Container></Body></Html>;
}

export function ConfirmationEmail({ inquiry }: { inquiry: ValidInquiry }) {
  return <Html><Head /><Preview>Deine Anfrage ist bei ANNA ÉDITION angekommen</Preview><Body style={body}><Container style={container}><Text style={eyebrow}>ANNA ÉDITION</Text><Heading style={heading}>Danke, {inquiry.name.split(" ")[0]}.</Heading><Text>Deine Anfrage ist sicher bei mir angekommen. Ich sehe mir deine Angaben persönlich an und melde mich mit einer ersten Einschätzung und passenden nächsten Schritten.</Text><Hr style={rule} /><Text>Herzliche Grüße<br /><em>Anna</em><br />ANNA ÉDITION</Text></Container></Body></Html>;
}

const body = { backgroundColor: "#f5f1ec", color: "#211b18", fontFamily: "Arial, sans-serif", padding: "32px 12px" };
const container = { backgroundColor: "#ffffff", border: "1px solid #4e0401", borderRadius: "24px 24px 8px 8px", maxWidth: "600px", padding: "36px" };
const eyebrow = { color: "#6f2521", fontSize: "12px", letterSpacing: "2px" };
const heading = { color: "#4e0401", fontFamily: "Georgia, serif", fontSize: "42px", fontWeight: "400" };
const rule = { borderColor: "#d8c4b1", margin: "28px 0" };
