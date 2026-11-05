import type { Publication } from './types.ts';

// Each record was checked against Crossref on 2026-11-06; the URLs are the DOIs.
export const publications: Publication[] = [
  {
    id: 'environmental-quality-india-2023',
    order: 1,
    visibility: 'published',
    title: 'Determinants of environmental quality in India: evidence using the bootstrapped ARDL model with structural breaks',
    kind: 'research',
    authors: 'Samiha Khan, Rafael Alvarado, Muhammad Atif Nawaz, Zahoor Ahmed, Abdul Rehman & Syed Margub Elahi',
    outlet: 'Environmental Science and Pollution Research',
    citation: 'Vol. 30, pp. 64651–64661',
    date: '2023-04',
    url: 'https://doi.org/10.1007/s11356-023-26870-0',
  },
  {
    id: 'remittance-inflation-2021',
    order: 2,
    visibility: 'published',
    title: 'Remittance and Inflation Nexus in Bangladesh: Application of Dynamic ARDL Model with Linear Trend',
    kind: 'research',
    authors: 'Syed Margub Elahi & Md. Hasanur Rahman',
    outlet: 'Indonesian Journal of Business and Economics',
    citation: 'Vol. 4, No. 2',
    date: '2021-12',
    url: 'https://doi.org/10.25134/ijbe.v4i2.4513',
  },
  {
    id: 'bilateral-trade-deficit-2019',
    order: 3,
    visibility: 'published',
    title: 'Problems of Bilateral Trade Deficit between Bangladesh and India: A 2SLS Regression Analysis',
    kind: 'research',
    authors: 'Muntasir Murshed & Syed Margub Elahi',
    outlet: 'International Journal of Business, Economics and Management',
    citation: 'Vol. 6, No. 4, pp. 215–231',
    date: '2019',
    url: 'https://doi.org/10.18488/journal.62.2019.64.215.231',
  },
];
