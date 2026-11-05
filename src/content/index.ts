// The only module components import content from. It applies visibility and
// ordering in one place, so no draft reaches the public site by accident.
import type { Ordered } from './types.ts';
import { profile } from './profile';
import { projects } from './projects';
import { experience } from './experience';
import { education } from './education';
import { credentials } from './credentials';
import { publications } from './publications';
import { capabilities } from './capabilities';

/** Drafts show only under `npm run dev`, and only with ?drafts in the URL. */
export const showDrafts =
  import.meta.env.DEV && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('drafts');

export function visible<T extends Ordered>(items: T[]): T[] {
  return items.filter((item) => item.visibility === 'published' || showDrafts).sort((a, b) => a.order - b.order);
}

export const content = {
  profile,
  projects: visible(projects),
  experience: visible(experience),
  education: visible(education),
  credentials: visible(credentials),
  publications: visible(publications),
  capabilities: visible(capabilities),
};

export type * from './types.ts';
