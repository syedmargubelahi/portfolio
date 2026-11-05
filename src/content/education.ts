import type { Education } from './types.ts';

// Grades are intentionally not published.
export const education: Education[] = [
  {
    id: 'ju-ma',
    order: 1,
    visibility: 'published',
    qualification: 'MA in Economics',
    institution: 'Jahangirnagar University',
    start: '2018-04',
    end: '2019-09',
  },
  {
    id: 'uiu-bsc',
    order: 2,
    visibility: 'published',
    qualification: 'BSc in Economics',
    institution: 'United International University',
    start: '2014-01',
    end: '2017-12',
  },
  {
    id: 'mlis-a',
    order: 3,
    visibility: 'published',
    qualification: 'A Levels',
    institution: 'Maple Leaf International School',
    start: '2009-01',
    end: '2010-10',
    note: 'Accounting',
  },
  {
    id: 'mlis-o',
    order: 4,
    visibility: 'published',
    qualification: 'O Levels',
    institution: 'Maple Leaf International School',
    start: '2008-01',
    end: '2009-01',
    note: 'Business Studies',
  },
];
