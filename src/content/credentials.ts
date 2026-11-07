import type { Credential } from './types.ts';

// Certifications, training, workshops, seminars, conferences, activities,
// volunteering and awards. Source: all CVs on file (2018–2025), checked
// against each other on 2026-11-07. Each event appears once; when two CVs
// describe the same event, the details are merged into one record.
// `order` runs newest first; records without a year sit where the CVs list them.
// The page lets visitors filter by type.
//
// Copy a record, fill it in, and set visibility to 'published'.
// type:        certification | training | workshop | seminar | conference | extracurricular | volunteering | award
// involvement: attended | spoke | organized | certified | awarded | participated | volunteered

const brac = 'BRAC University';
const uiu = 'United International University';

export const credentials: Credential[] = [
  // ---------- 2021 ----------
  {
    id: 'digital-marketing-training',
    order: 1,
    visibility: 'published',
    type: 'training',
    involvement: 'certified',
    title: 'Digital Marketing',
    issuer: 'SR Dream IT',
    date: '2021-02',
    description: '36-hour certified training, February–March 2021.',
  },

  // ---------- 2018 ----------
  {
    // The 2018 CVs list this between 2018 events but give no year.
    id: 'uiu-stata-ii-training',
    order: 2,
    visibility: 'published',
    type: 'training',
    involvement: 'attended',
    title: 'Data Analysis with Stata (Stata-II)',
    issuer: uiu,
    description: '36-hour training. A second training, separate from the STATA 15 course in 2017.',
  },
  {
    id: 'buet-research-writing-2018',
    order: 3,
    visibility: 'published',
    type: 'workshop',
    involvement: 'attended',
    title: 'Arts and Techniques of Writing Research Articles',
    issuer: 'BUET Career Club',
    date: '2018',
  },
  {
    // The 2018 CVs say volunteer; later CVs say organiser. Margub confirmed organiser for 2018.
    id: 'icsd-organizer',
    order: 4,
    visibility: 'published',
    type: 'conference',
    involvement: 'organized',
    title: 'International Conference on Sustainable Development (ICSD) 2018',
    issuer: uiu,
    date: '2018-01',
    description:
      'Organiser on the ICSD organising committee. Managed a team of 50 volunteers for a three-day international conference and its closing ceremony.',
  },

  // ---------- 2017 ----------
  {
    // No CV gives a year; the 2018 CVs list it between 2017 and 2018 events.
    id: 'uiu-research-methodology',
    order: 5,
    visibility: 'published',
    type: 'workshop',
    involvement: 'attended',
    title: 'Research Methodology',
    issuer: uiu,
    description: 'Workshop by UIUJEF, supported by PPRC.',
  },
  {
    id: 'stata-15-training',
    order: 6,
    visibility: 'published',
    type: 'training',
    involvement: 'certified',
    title: 'Data Analysis, Management and Graphics with STATA 15',
    issuer: uiu,
    date: '2017-11',
    description: '36-hour certified training, September–November 2017.',
  },
  {
    id: 'uiu-project-management-2017',
    order: 7,
    visibility: 'published',
    type: 'seminar',
    involvement: 'attended',
    title: 'Global Career in Project Management',
    issuer: uiu,
    date: '2017',
  },
  {
    id: 'uiu-career-options-economics-2017',
    order: 8,
    visibility: 'published',
    type: 'seminar',
    involvement: 'attended',
    title: 'Career Options for Economics Graduates',
    issuer: uiu,
    date: '2017',
    description: 'Organised by UIUJEF and SANEM.',
  },
  {
    id: 'icsd-2017-volunteer',
    order: 9,
    visibility: 'published',
    type: 'conference',
    involvement: 'volunteered',
    title: 'International Conference on Sustainable Development (ICSD) 2017',
    issuer: uiu,
    date: '2017-01',
  },

  // ---------- 2016 ----------
  {
    id: 'pprc-bbs-urban-research-workshop-2016',
    order: 10,
    visibility: 'published',
    type: 'workshop',
    involvement: 'attended',
    title: 'Research Techniques for Urban Research, with a Special Focus on Urban Poverty',
    issuer: 'PPRC and BBS',
    date: '2016',
    description: 'Supported by the World Bank.',
  },
  {
    id: 'pprc-urban-poverty-conference-2016',
    order: 11,
    visibility: 'published',
    type: 'conference',
    involvement: 'attended',
    title: 'Urban Poverty, Challenges of Perspective and Action: A Research & Solutions Conference',
    issuer: 'PPRC',
    date: '2016',
  },

  // ---------- 2015 ----------
  {
    id: 'uk-education-fair-2015',
    order: 12,
    visibility: 'published',
    type: 'volunteering',
    involvement: 'volunteered',
    title: 'Student Helper, UK Education Fair 2015',
    issuer: 'British Council',
    date: '2015',
  },
  {
    id: 'econ-prodigy-2015',
    order: 13,
    visibility: 'published',
    type: 'extracurricular',
    involvement: 'participated',
    title: 'Quarter-finalist, Econ-Prodigy 2015',
    issuer: 'North South University',
    date: '2015',
  },

  // ---------- 2014 ----------
  {
    id: 'uiu-career-summit-2014',
    order: 14,
    visibility: 'published',
    type: 'conference',
    involvement: 'attended',
    title: 'International Career Summit 2014',
    issuer: uiu,
    date: '2014',
  },

  // ---------- 2013 ----------
  {
    // The MUN workshop appears in the CVs both under IABC and under workshops; it is one event.
    id: 'iabc-mun-2013',
    order: 15,
    visibility: 'published',
    type: 'extracurricular',
    involvement: 'volunteered',
    title: 'General Member, International Association of Business Communicators (IABC)',
    issuer: brac,
    date: '2013-03',
    description: 'Volunteered as a planner for the workshop of Model United Nations 2013, “The Art of Diplomacy”.',
  },
  {
    id: 'prothom-alo-jobs-cv-training-2013',
    order: 16,
    visibility: 'published',
    type: 'training',
    involvement: 'attended',
    title: 'CV Writing and Interview Skills',
    issuer: 'Prothom Alo Jobs',
    date: '2013',
    description: '8-hour exclusive training.',
  },

  // ---------- 2012: BRAC University, Fall semester ----------
  ...(
    [
      ['seminar', '7 Habits'],
      ['seminar', 'APON Drug Rehabilitation'],
      ['seminar', 'Public Health'],
      ['seminar', 'Global and Climate Change'],
      ['seminar', 'Meet the Employers'],
      ['workshop', 'Stress Management'],
      ['workshop', 'Anger Management'],
      ['workshop', 'Acceptance and Goal Setting Management'],
      ['training', 'Social Learning Lab'],
      ['training', 'Community Empowerment Programme (CEP)'],
    ] as const
  ).map(
    ([type, title], i): Credential => ({
      id: `brac-2012-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`,
      order: 17 + i / 100,
      visibility: 'published',
      type,
      involvement: 'attended',
      title,
      issuer: brac,
      date: '2012',
      description: 'Fall 2012.',
    }),
  ),
  ...(
    [
      ['Book Reading Competition', 'Fall 2012, Residential Semester.'],
      ['Residential Semester activity: Recycling', 'Fall 2012.'],
      ['Residential Semester activity: Creative Writing', 'Fall 2012.'],
    ] as const
  ).map(
    ([title, description], i): Credential => ({
      id: `brac-2012-rs-${i + 1}`,
      order: 18 + i / 100,
      visibility: 'published',
      type: 'extracurricular',
      involvement: 'participated',
      title,
      issuer: brac,
      date: '2012',
      description,
    }),
  ),

  // ---------- 2010–2011 ----------
  {
    id: 'duke-of-edinburgh-bronze',
    order: 19,
    visibility: 'published',
    type: 'award',
    involvement: 'awarded',
    title: 'The Duke of Edinburgh’s Award — Bronze Standard',
    issuer: 'Maple Leaf International School',
    date: '2011',
  },
  {
    id: 'great-water-challenge-2011',
    order: 20,
    visibility: 'published',
    type: 'award',
    involvement: 'awarded',
    title: 'Champion, The Great Water Challenge 2011',
    issuer: 'JAAGO Foundation',
    date: '2011',
    description: 'Won as part of Team Marines.',
  },
  {
    // World Health Day 2010, World Water Day 2011 and Universal Children’s Day 2011 are part of this record.
    id: 'jaago-volunteer',
    order: 21,
    visibility: 'published',
    type: 'volunteering',
    involvement: 'volunteered',
    title: 'Volunteer, JAAGO Foundation',
    issuer: 'JAAGO Foundation',
    date: '2010-01',
    description:
      'January 2010 – November 2011. Volunteered on World Health Day 2010, World Water Day 2011 and Universal Children’s Day (November 2011).',
  },
  {
    id: 'mlis-graduation-award-2010',
    order: 22,
    visibility: 'published',
    type: 'award',
    involvement: 'awarded',
    title: 'Graduation Award',
    issuer: 'Maple Leaf International School',
    date: '2010',
  },
];
