export type ProjectCategory =
  | "Alle Projekte"
  | "Wohn- & Essbereiche"
  | "Küchen"
  | "Schlafzimmer"
  | "Home Office"
  | "Eingangsbereiche"
  | "Bäder"
  | "Gesamtkonzepte";

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ProjectStorySection {
  heading: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: number;
  category: ProjectCategory;
  excerpt: string;
  description: string;
  materials: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  storySections: ProjectStorySection[];
  order: number;
  featured?: boolean;
}

export interface DesignPackage {
  name: string;
  eyebrow: string;
  description: string;
  features: string[];
  price: string;
  priceValue?: number;
  priceCurrency?: string;
  priceUnit?: string;
}

export interface ServiceItem {
  title: string;
  text: string;
}

export interface CmsImage {
  url: string;
  alt?: string;
}

export interface SeoContent {
  title?: string;
  description?: string;
  image?: CmsImage;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageContent {
  eyebrow?: string;
  title?: string;
  accentTitle?: string;
  intro?: string;
  image?: CmsImage;
  paragraphs?: string[];
  quote?: string;
  secondaryTitle?: string;
  secondaryAccentTitle?: string;
  sections?: { heading: string; text: string }[];
  seo?: SeoContent;
  faqs?: FaqItem[];
}

export interface HomeContent {
  heroEyebrow?: string;
  heroLine1?: string;
  heroLine2?: string;
  heroLine3?: string;
  heroLine4?: string;
  heroIntro?: string;
  heroImage?: CmsImage;
  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyAccent?: string;
  philosophyText?: string;
  philosophyImage?: CmsImage;
  featuredEyebrow?: string;
  featuredTitle?: string;
  featuredAccent?: string;
  packagesEyebrow?: string;
  packagesTitle?: string;
  packagesAccent?: string;
  calloutEyebrow?: string;
  calloutTitle?: string;
  calloutAccent?: string;
  calloutIntro?: string;
  calloutPrice?: string;
  calloutSteps?: string[];
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutAccent?: string;
  aboutIntro?: string;
  aboutImage?: CmsImage;
}

export type InquiryType = "private" | "business" | "call";

export interface InquiryPayload {
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  consent: boolean;
  website?: string;
  startedAt: number;
  turnstileToken?: string;
  attachmentUrls?: string[];
  details: Record<string, string | string[]>;
}
