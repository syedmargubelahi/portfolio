import type { Experience } from './types.ts';

// Source: CV-of-Syed-Margub-Elahi 2025.pdf (August 2025), the newest CV on file.
// Dates follow what Margub confirmed in chat.
export const experience: Experience[] = [
  {
    id: 'bangladesh-betar',
    order: 1,
    visibility: 'published',
    role: 'Sub-Editor',
    organization: 'Bangladesh Betar',
    employment: 'Full-time',
    start: '2019-07',
    end: 'present',
    location: 'Ministry of Information and Broadcasting',
    summary: 'Editorial and production work on Bangladesh Betar’s publications, including the Betar Bangla journal.',
    highlights: [
      'Proofread, edit and keep file records for vetted programme plans, stories, poems, pictures, news and articles before publication.',
      'Work with the printing press on final designs and corrections, and prepare cover briefs and news material for each print release.',
      'Plan and run distribution of the journal across Bangladesh.',
      'Collect and archive books by renowned authors for the office library.',
    ],
  },
  {
    id: 'vertical-horizon',
    order: 2,
    visibility: 'published',
    role: 'Senior Office Administrator',
    organization: 'Vertical Horizon Limited',
    employment: 'Part-time',
    start: '2018-01',
    end: 'present',
    summary: 'Administration for an education provider preparing students for Edexcel and Cambridge examinations.',
    highlights: [
      'Prepare departmental overhead budgets and student attendance and performance sheets.',
      'Plan and run Flashback, the year-end syllabus review event.',
      'Prepare class tests and mock papers for Edexcel and Cambridge IGCSE, AS and A2.',
      'Manage student, teacher and financial records on the verticalhorizon.info platform.',
      'Interview, recruit and train examiners and invigilators, and handle payroll slips for the department.',
    ],
  },
  {
    // Confirmed by Margub on 2026-11-06.
    id: 'vertical-horizon-social',
    order: 3,
    visibility: 'published',
    role: 'Social Media Manager',
    organization: 'Vertical Horizon Limited',
    start: '2019',
    end: 'present',
    highlights: [
      'Design and run social media strategies aligned with the organisation’s goals.',
      'Write blog posts and marketing content.',
      'Create promotional materials for social media.',
    ],
  },
  {
    id: 'maple-leaf-teacher',
    order: 4,
    visibility: 'published',
    role: 'Mathematics Teacher',
    organization: 'Maple Leaf International School',
    start: '2017-08',
    end: '2017-09',
    highlights: [
      'Taught Edexcel mathematics to classes 6 and 7.',
      'Set class tests and half-yearly papers, and marked student scripts.',
      'Planned weekly lessons and delivered each topic to plan.',
    ],
  },
];
