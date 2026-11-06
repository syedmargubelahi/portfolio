import type { CapabilityGroup } from './types.ts';

// No percentages or proficiency scores: list what you do and the tools you use.
// Skill names use the standard terms recruiters and ATS software search for.
// Source: CVs on file plus what Margub listed in chat.
export const capabilities: CapabilityGroup[] = [
  {
    id: 'administration',
    order: 1,
    visibility: 'published',
    title: 'Office administration',
    description: 'Keeping an office organised, its records accurate and its numbers in order.',
    items: [
      'Budget preparation',
      'Payroll processing',
      'Recruitment & training',
      'Records & database management',
      'Procurement & logistics',
      'Event management',
      'Exam coordination',
    ],
  },
  {
    id: 'editorial',
    order: 2,
    visibility: 'published',
    title: 'Editorial & communications',
    description: 'Making words clear and correct for print, broadcast and the screen.',
    items: [
      'Sub-editing',
      'Copy editing & proofreading',
      'Print production',
      'Content writing',
      'Social media management',
      'SEO (on-page & off-page)',
      'Public relations',
    ],
  },
  {
    id: 'research',
    order: 3,
    visibility: 'published',
    title: 'Economics & research',
    description: 'Looking at a problem through costs, people and data.',
    items: ['Econometrics (2SLS, ARDL)', 'Quantitative research', 'Data analysis', 'STATA', 'SPSS', 'Python'],
  },
  {
    id: 'tools',
    order: 4,
    visibility: 'published',
    title: 'Software & AI tools',
    description: 'What I use day to day, including AI-assisted workflows.',
    items: [
      'Microsoft Excel',
      'Microsoft Word',
      'Microsoft PowerPoint',
      'Microsoft Outlook',
      'HTML',
      'Canva (templates & graphics)',
      'Adobe Photoshop',
      'Adobe Creative Suite',
      'PhotoScape',
      'CapCut',
      'ChatGPT',
      'Claude',
      'Gemini',
    ],
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
