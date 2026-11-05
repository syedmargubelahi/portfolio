import type { Credential } from './types.ts';

// Certifications, training, seminars, conferences, extracurricular activities,
// volunteering and awards. Source: CVs on file (2022–2025). The section and its
// nav link stay hidden while this list has no published records.
//
// Copy a record, fill it in, and set visibility to 'published'.
// type:        certification | training | seminar | conference | extracurricular | volunteering | award
// involvement: attended | spoke | organized | certified | awarded | participated | volunteered

export const credentials: Credential[] = [
  {
    id: 'stata-15-training',
    order: 1,
    visibility: 'published',
    type: 'training',
    involvement: 'certified',
    title: 'Data Analysis, Management and Graphics with STATA 15',
    issuer: 'United International University',
    date: '2017-11',
    description: '36-hour certified training, September–November 2017.',
  },
  {
    id: 'digital-marketing-training',
    order: 2,
    visibility: 'published',
    type: 'training',
    involvement: 'certified',
    title: 'Digital Marketing',
    issuer: 'SR Dream IT',
    date: '2021-02',
    description: '36-hour certified training, February–March 2021.',
  },
  {
    id: 'icsd-organizer',
    order: 3,
    visibility: 'published',
    type: 'conference',
    involvement: 'organized',
    title: 'International Conference on Sustainable Development (ICSD) 2017 & 2018',
    issuer: 'United International University',
    date: '2018-01',
    description:
      'Organiser on the ICSD organising committee in January 2017 and January 2018. Managed a team of 50 volunteers for a three-day international conference and its closing ceremony.',
  },
  {
    id: 'econ-prodigy-2015',
    order: 4,
    visibility: 'published',
    type: 'extracurricular',
    involvement: 'participated',
    title: 'Quarter-finalist, Econ-Prodigy 2015',
    issuer: 'North South University',
    date: '2015',
  },
  {
    id: 'iabc-mun-2013',
    order: 5,
    visibility: 'published',
    type: 'extracurricular',
    involvement: 'volunteered',
    title: 'General Member, International Association of Business Communicators (IABC)',
    issuer: 'BRAC University',
    date: '2013-03',
    description: 'Volunteered as a planner for the workshop of Model United Nations 2013, “The Art of Diplomacy”.',
  },
  {
    id: 'duke-of-edinburgh-bronze',
    order: 6,
    visibility: 'published',
    type: 'award',
    involvement: 'awarded',
    title: 'The Duke of Edinburgh’s Award — Bronze Standard',
    issuer: 'Maple Leaf International School',
    date: '2011',
  },
  {
    id: 'great-water-challenge-2011',
    order: 7,
    visibility: 'published',
    type: 'award',
    involvement: 'awarded',
    title: 'Champion, The Great Water Challenge 2011',
    issuer: 'JAAGO Foundation',
    date: '2011',
    description: 'Won as part of Team Marines.',
  },
  {
    id: 'jaago-volunteer',
    order: 8,
    visibility: 'published',
    type: 'volunteering',
    involvement: 'volunteered',
    title: 'Volunteer, JAAGO Foundation',
    issuer: 'JAAGO Foundation',
    date: '2010-01',
    description:
      'January 2010 – November 2011. Volunteered at the foundation’s programmes for World Water Day, World Health Day and Universal Children’s Day.',
  },
];
