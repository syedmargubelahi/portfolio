import type { CapabilityGroup } from './types.ts';

// No percentages or proficiency scores: list what you do and the tools you use.
// Source: CVs on file plus what Margub listed in chat.
export const capabilities: CapabilityGroup[] = [
  {
    id: 'administration',
    order: 1,
    visibility: 'published',
    title: 'Administration',
    description: 'Keeping an office organised, its records accurate and its numbers in order.',
    items: ['Budgeting', 'Records & database management', 'Recruiting & training staff', 'Event planning'],
  },
  {
    id: 'editorial',
    order: 2,
    visibility: 'published',
    title: 'Editorial & content',
    description: 'Shaping words for print, broadcast and the screen.',
    items: ['Sub-editing & proofreading', 'Print production', 'Content writing', 'Social media content', 'SEO research', 'Public relations'],
  },
  {
    id: 'research',
    order: 3,
    visibility: 'published',
    title: 'Economics & research',
    description: 'Looking at a problem through costs, people and data.',
    items: ['Econometric analysis (2SLS, ARDL)', 'Data analysis', 'STATA', 'SPSS', 'Python'],
  },
  {
    id: 'tools',
    order: 4,
    visibility: 'published',
    title: 'Tools & AI workflows',
    description: 'What I use day to day, including AI-assisted workflows.',
    items: ['Excel', 'Word', 'PowerPoint', 'HTML', 'Canva', 'Adobe Creative Suite', 'Photoshop', 'PhotoScape', 'CapCut', 'ChatGPT', 'Claude', 'Gemini'],
  },
  {
    id: 'languages',
    order: 5,
    visibility: 'published',
    title: 'Languages',
    description: 'Languages I work and study in.',
    items: ['Bangla (native)', 'English (IELTS overall band 8.0)', 'Japanese (JLPT N5)'],
  },
];
