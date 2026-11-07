import type { Profile } from './types.ts';

export const profile: Profile = {
  name: 'Syed Margub Elahi',
  preferredName: 'Margub',
  monogram: 'ME',
  location: 'Dhaka, Bangladesh',
  // Set this once the site has a public address. It turns on canonical and
  // Open Graph URL tags.
  siteUrl: 'https://syedmargubelahi.github.io/portfolio',
  titles: ['Sub-Editor', 'Office Administrator', 'Economics Researcher', 'AI-assisted Product Builder'],
  heroHeadline: 'Turning everyday problems into useful digital experiences.',
  heroWords: { highlight: 'useful' },
  heroIntro:
    'I’m Syed Margub Elahi, Sub-Editor at Bangladesh Betar and Senior Office Administrator since 2018, with an MA in Economics and three published research papers. I bring editorial precision, organised administration and data-driven thinking, and I use AI-assisted tools to turn ideas into live products.',
  shortBio:
    'Syed Margub Elahi, Dhaka: Sub-Editor at Bangladesh Betar and Senior Office Administrator. MA in Economics, three published econometric research papers and three live AI-assisted web products.',
  about: [
    'Teams rely on me to get the details right: on the page, in the office and in the numbers.',
    'At Bangladesh Betar, the national public broadcaster, I sub-edit and produce the Betar Bangla journal, from vetted copy and programme planning with 14 regional offices to print and nationwide distribution. At Vertical Horizon Limited I have run office administration since 2018: budgets, records, recruitment, payroll and examinations.',
    'My training is in economics, with an MA from Jahangirnagar University and a BSc from United International University. I have co-authored three published research papers on trade, remittances and inflation, and environmental quality, using econometric models such as 2SLS and ARDL. That training shapes how I approach a problem: what it costs, who it affects, and what the evidence says.',
    'I also build. Using AI-assisted tools, I have taken three ideas from a blank page to live websites: DeadlineDesk, PostDori and BCGO Career Map. Together, that makes me useful wherever a team needs clear writing, reliable operations and someone who learns and ships new tools fast.',
  ],
  strengths: [
    {
      title: 'Publication-ready editing',
      text: 'Sub-Editor at Bangladesh Betar since 2019: editing, proofreading and print production for the Betar Bangla journal.',
    },
    {
      title: 'Organised administration',
      text: 'Budgets, records, recruitment, payroll, procurement and exam logistics at Vertical Horizon since 2018.',
    },
    {
      title: 'Evidence-based thinking',
      text: 'MA in Economics and three published papers using 2SLS and ARDL econometric models.',
    },
    {
      title: 'Fast, AI-assisted delivery',
      text: 'Three live websites, each taken from idea to launch with AI-assisted tools.',
    },
  ],
  contactIntro: 'For roles, projects or collaborations, email is the fastest way to reach me. I reply personally.',
  // Email and LinkedIn from the CV; X and Facebook from the social links on
  // github.com/syedmargubelahi; Margub confirmed all three on 2026-11-06.
  // Instagram supplied by Margub on 2026-11-06. Phone number and home
  // address are deliberately not published. An empty list hides the Contact
  // section and its navigation link.
  contact: [
    { label: 'Email', href: 'mailto:smelahi25@gmail.com', display: 'smelahi25@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syedmargubelahi/', display: 'LinkedIn' },
    { label: 'X', href: 'https://x.com/elahiAI', display: 'X @elahiAI' },
    { label: 'Facebook', href: 'https://www.facebook.com/syed.elahi', display: 'Facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/margubsvibehub/', display: 'Instagram @margubsvibehub' },
    { label: 'GitHub', href: 'https://github.com/syedmargubelahi', display: 'GitHub' },
  ],
  // Only a public version of the CV belongs here: the CVs on file include a
  // phone number, home address and referees' contact details.
  // e.g. '/cv/syed-margub-elahi-cv.pdf' after placing the PDF in public/cv/.
  cvFile: undefined,
  // Margub's CV photo. Set to undefined to show the monogram.
  portrait: {
    kind: 'image',
    // Studio portrait supplied on 2026-11-07, upscaled 2x and sharpened.
    src: '/media/portrait/portrait-1200.jpg',
    alt: 'Portrait of Syed Margub Elahi in a black polo shirt against a warm orange background.',
    width: 1200,
    height: 1499,
    webp: [
      { src: '/media/portrait/portrait-480.webp', width: 480 },
      { src: '/media/portrait/portrait-800.webp', width: 800 },
      { src: '/media/portrait/portrait-1200.webp', width: 1200 },
      { src: '/media/portrait/portrait-1600.webp', width: 1600 },
    ],
  },
};
