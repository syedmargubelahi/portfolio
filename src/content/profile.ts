import type { Profile } from './types.ts';

export const profile: Profile = {
  name: 'Syed Margub Elahi',
  preferredName: 'Margub',
  monogram: 'ME',
  location: 'Dhaka, Bangladesh',
  // Set this once the site has a public address. It turns on canonical and
  // Open Graph URL tags.
  siteUrl: 'https://syedmargubelahi.github.io/portfolio',
  heroHeadline: 'Turning everyday problems into useful digital experiences.',
  heroWords: { highlight: 'useful' },
  heroIntro:
    'I’m Syed Margub Elahi—an administration and editorial professional with a background in economics and a growing portfolio of technology projects.',
  shortBio:
    'Administration and editorial professional in Dhaka with a background in economics and published research, building practical technology projects.',
  about: [
    'My work sits where organisation, language and numbers meet. As a Sub-Editor at Bangladesh Betar I work with words every day, and as Senior Office Administrator at Vertical Horizon Limited I help keep an office running: its budgets, its records and the details that hold them together.',
    'I studied economics at United International University and Jahangirnagar University, and have co-authored three published research papers on trade, remittances and inflation, and environmental quality, using econometric models such as 2SLS and ARDL. Economics shapes how I look at a problem: what it costs, who it affects, and what a simple fix would change.',
    'Lately I have been turning everyday problems into working software. Using AI-assisted tools, I have taken three ideas to live websites: DeadlineDesk, PostDori and BCGO Career Map.',
  ],
  // Email and LinkedIn from the CV; X and Facebook from the social links on
  // github.com/syedmargubelahi; Margub confirmed all three on 2026-11-06. Phone number and home
  // address are deliberately not published. An empty list hides the Contact
  // section and its navigation link.
  contact: [
    { label: 'Email', href: 'mailto:smelahi25@gmail.com', display: 'smelahi25@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syedmargubelahi/', display: 'LinkedIn' },
    { label: 'X', href: 'https://x.com/elahiAI', display: 'X @elahiAI' },
    { label: 'Facebook', href: 'https://www.facebook.com/syed.elahi', display: 'Facebook' },
    { label: 'GitHub', href: 'https://github.com/syedmargubelahi', display: 'GitHub' },
  ],
  // Only a public version of the CV belongs here: the CVs on file include a
  // phone number, home address and referees' contact details.
  // e.g. '/cv/syed-margub-elahi-cv.pdf' after placing the PDF in public/cv/.
  cvFile: undefined,
  // Margub's CV photo. Set to undefined to show the monogram.
  portrait: {
    kind: 'image',
    src: '/media/portrait.jpg',
    alt: 'Portrait of Syed Margub Elahi.',
    width: 472,
    height: 591,
  },
};
