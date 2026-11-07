import type { Experience } from './types.ts';

// Sources: the CVs on file (2018–2025) and Margub's Facebook work history.
// Dates follow what Margub confirmed in chat.
//
// Writing style (CV and ATS friendly):
// - Start each highlight with a strong verb in the present tense for current roles, past tense otherwise.
// - Lead with scope and results that the sources state (offices, units, students, volunteers).
// - Never add a number, result or duty that no source gives. No money amounts.
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
    location: 'Ministry of Information and Broadcasting, Dhaka',
    summary:
      'Edit and produce the Betar Bangla journal and other publications of Bangladesh’s national public broadcaster, from programme planning to print and nationwide distribution.',
    highlights: [
      'Coordinate programme planning with 14 regional Betar offices and 6 central units, including World-Wide, Commercial and Agro-based Programme services.',
      'Edit, proofread and approve vetted programme plans, stories, poems, news, articles and photographs for publication, and keep complete file records.',
      'Manage the publication budget and payments to contractors, writers’ royalties, picture processing, printing and archive purchases.',
      'Lead print production with the printing press: cover briefs, final designs, corrections and press-ready news material for each release.',
      'Plan and run distribution of the journal across Bangladesh.',
      'Cover events and conferences with photographs for the journal’s record.',
      'Build the office library’s archive of books by renowned authors, including rare old editions.',
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
    location: 'Dhaka',
    summary:
      'Run office administration for an education provider that prepares students for Edexcel and Cambridge IGCSE, AS and A2 examinations.',
    highlights: [
      'Prepare departmental overhead budgets, and student attendance and performance reports.',
      'Interview, recruit and train examiners and invigilators, and process payroll slips for the department.',
      'Plan and deliver Flashback, the year-end syllabus review event.',
      'Prepare class tests and mock papers for Edexcel and Cambridge IGCSE, AS and A2.',
      'Organise exam seating plans and parent–teacher meetings.',
      'Maintain student, teacher and financial records on the verticalhorizon.info platform.',
      'Handle logistics and procurement.',
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
    location: 'Dhaka',
    summary: 'Own the organisation’s social media presence, from strategy to published content.',
    highlights: [
      'Design and run social media strategies aligned with the organisation’s goals.',
      'Write blog posts and marketing content.',
      'Create promotional materials for social media.',
    ],
  },
  {
    // Margub told us on 2026-11-07: project-based event work since 2025.
    // Event names to follow; add them as highlights when Margub supplies them.
    id: 'breakfast-club-dhaka',
    order: 3.5,
    visibility: 'published',
    role: 'Logistics and Security Admin',
    organization: 'Breakfast Club Dhaka',
    employment: 'Project-based',
    start: '2025',
    end: 'present',
    location: 'Dhaka',
    summary: 'Manage logistics and security administration for Breakfast Club Dhaka events, project by project.',
  },
  // British Council, Daraz and Banglalink Digital come from Margub's Facebook work history (chosen on 2026-11-07).
  // No source describes the duties, so these records carry no highlights.
  {
    id: 'british-council',
    order: 4,
    visibility: 'published',
    role: 'Temporary Staff',
    organization: 'British Council Bangladesh',
    start: '2018-03',
    end: '2018-09',
    location: 'Dhaka',
  },
  {
    id: 'maple-leaf-teacher',
    order: 5,
    visibility: 'published',
    role: 'Mathematics Teacher',
    organization: 'Maple Leaf International School',
    start: '2017-08',
    end: '2017-09',
    location: 'Dhaka',
    summary: 'Taught Edexcel mathematics (British curriculum) to classes 6 and 7.',
    highlights: [
      'Set class tests and monthly and half-yearly papers, and marked the scripts of 400 students.',
      'Planned lessons for each week and completed every topic on schedule.',
    ],
  },
  {
    id: 'daraz',
    order: 6,
    visibility: 'published',
    role: 'Junior Executive, Back Office Support',
    organization: 'Daraz',
    start: '2016-12',
    end: '2017-12',
    location: 'Dhaka',
  },
  {
    id: 'banglalink-digital',
    order: 7,
    visibility: 'published',
    role: 'International Customer Service and Sales Support',
    organization: 'Banglalink Digital',
    start: '2012-12',
    end: '2013-12',
  },
];
