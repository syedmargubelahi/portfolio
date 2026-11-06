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
      'Coordinate programme planning with 14 regional Betar offices and 6 Dhaka units, including World-Wide, Commercial and Agro-based Programme services.',
      'Administer the publication budget and payments to contractors, writers’ royalties, picture processing, printing and archive purchases.',
      'Proofread, edit and keep file records for vetted programme plans, stories, poems, pictures, news and articles before publication.',
      'Work with the printing press on final designs and corrections, and prepare cover briefs and news material for each print release.',
      'Collect event and conference photographs for the Betar Bangla journal.',
      'Plan and run distribution of the journal across Bangladesh.',
      'Collect and archive books by renowned authors, including rare old archives, for the office library.',
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
      'Plan exam seating arrangements and parent–teacher meetings.',
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
      'Taught Edexcel mathematics (British curriculum) to classes 6 and 7.',
      'Set class tests, monthly and half-yearly papers, and marked the scripts of 200 students.',
      'Planned weekly lessons and delivered each topic to plan.',
    ],
  },
];
