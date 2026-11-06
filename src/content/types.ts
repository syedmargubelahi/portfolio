// Shared shapes for every content file in this folder.
// Each record has `visibility` and `order`. Only `published` records reach the
// public site; drafts show up in `npm run dev` with a Draft badge so you can
// review them before publishing.

export type Visibility = 'published' | 'draft';

export interface Ordered {
  /** Stable, unique id. Used as the React key and in URLs (#work-<id>). */
  id: string;
  /** Lower numbers come first. */
  order: number;
  visibility: Visibility;
}

/** Dates are written as 'YYYY-MM' or 'YYYY'. */
export type YearMonth = string;

export interface ImageMedia {
  kind: 'image';
  /** Path under /public, e.g. '/media/deadlinedesk/home-desktop.jpg'. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface VideoMedia {
  kind: 'video';
  /** Muted, silent clip. WebM or MP4 under /public. */
  src: string;
  /** Still image shown before the clip plays and for reduced-motion visitors. */
  poster: string;
  /** Describes what the clip shows, for screen readers. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Short tab name when a project has several clips, e.g. 'Homepage'. */
  label?: string;
  /** Seconds to skip at the start (and on every loop), e.g. page-loading frames. */
  startAt?: number;
}

export type Media = ImageMedia | VideoMedia;

/**
 * live        – checked and reachable; the capsule links to it.
 * unverified  – supplied but not reachable or not yet checked; shown as text, never linked.
 */
export type LinkStatus = 'live' | 'unverified';

export interface ProjectLink {
  url: string;
  status: LinkStatus;
  /** Date the link was last checked, 'YYYY-MM-DD'. */
  checked?: string;
  /** Why the link is unverified. Shown to visitors in short form. */
  note?: string;
}

export type FeatureStatus = 'completed' | 'planned' | 'not-built';

export interface CaseStudy {
  problem: string;
  /** What Margub personally did. */
  contribution: string;
  /** Who else, or what else, helped. Keeps personal work and team work apart. */
  collaboration?: string;
  approach: string[];
  features: { label: string; status: FeatureStatus; detail?: string }[];
  tools: string[];
  outcomes: string[];
  /** Lessons must come from Margub. Leave empty until supplied. */
  lessons: string[];
}

export interface Project extends Ordered {
  name: string;
  /** Short catchy title shown in the capsule and the work section. */
  tagline: string;
  category: string;
  link?: ProjectLink;
  /** Optional single sentence. */
  summary?: string;
  /** Visual accent for this project's frames. */
  accent: 'royal' | 'lavender' | 'mint';
  media: Media[];
  /** Only add when there is enough verified content. Enables "View Case Study". */
  caseStudy?: CaseStudy;
}

export interface Experience extends Ordered {
  role: string;
  organization: string;
  /** Leave out when the CV does not say. */
  employment?: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer';
  start: YearMonth;
  end: YearMonth | 'present';
  location?: string;
  summary?: string;
  highlights?: string[];
}

export interface Education extends Ordered {
  qualification: string;
  institution: string;
  start?: YearMonth;
  end: YearMonth;
  note?: string;
}

export type CredentialType =
  | 'certification'
  | 'training'
  | 'seminar'
  | 'conference'
  | 'extracurricular'
  | 'volunteering'
  | 'award';

/** What Margub did at the event or programme. Keep this honest. */
export type Involvement =
  | 'attended'
  | 'spoke'
  | 'organized'
  | 'certified'
  | 'awarded'
  | 'participated'
  | 'volunteered';

export interface Credential extends Ordered {
  type: CredentialType;
  involvement: Involvement;
  title: string;
  issuer: string;
  /** Leave out when no source gives a date. */
  date?: YearMonth;
  url?: string;
  description?: string;
  /** Certificate scan or photo under /public. */
  image?: ImageMedia;
}

export interface Publication extends Ordered {
  title: string;
  kind: 'article' | 'research' | 'report' | 'broadcast' | 'other';
  /** Authors as published, e.g. 'Syed Margub Elahi & Md. Hasanur Rahman'. */
  authors?: string;
  outlet: string;
  /** Volume, issue and pages, e.g. 'Vol. 6, No. 4, pp. 215–231'. */
  citation?: string;
  date: YearMonth;
  url?: string;
  summary?: string;
}

export interface CapabilityGroup extends Ordered {
  title: string;
  description: string;
  items: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  /** Shown text, e.g. the email address or 'linkedin.com/in/…'. */
  display: string;
}

export interface Profile {
  name: string;
  preferredName: string;
  monogram: string;
  location: string;
  /** Full public URL once deployed, e.g. 'https://margub.me'. Enables canonical tags. */
  siteUrl?: string;
  heroHeadline: string;
  heroWords: { highlight: string };
  heroIntro: string;
  shortBio: string;
  about: string[];
  /** Empty list hides the Contact section and its nav link. */
  contact: ContactLink[];
  /** Path under /public to a PDF CV. Leave undefined to hide the download. */
  cvFile?: string;
  /** Path under /public to a portrait. Leave undefined to show the monogram. */
  portrait?: ImageMedia;
}
