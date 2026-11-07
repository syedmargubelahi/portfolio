import type { Project } from './types.ts';

// Add a project by copying one record and changing its fields.
// Media files live in /public/media/<project-id>/. Capture real screenshots and
// clips with:  npm run capture -- <project-id> https://example.com /another-page

export const projects: Project[] = [
  {
    id: 'deadlinedesk',
    order: 1,
    visibility: 'published',
    name: 'DeadlineDesk',
    tagline: 'Every expiry, one dashboard.',
    category: 'Compliance & renewals web app',
    link: {
      // The app is live on getdeadlinedesk.com; Margub confirmed this address on 2026-11-05.
      // deadlinedesk.com was a for-sale page when checked on 2026-11-05.
      url: 'https://getdeadlinedesk.com',
      status: 'live',
      checked: '2026-11-05',
    },
    summary:
      'Keeps a business’s licences, certificates, insurance, vehicle papers and contracts in one place, gives each one an owner, and emails the team before anything expires.',
    accent: 'ember',
    media: [
      {
        kind: 'video',
        src: '/media/deadlinedesk/home-preview.webm',
        poster: '/media/deadlinedesk/home-poster.jpg',
        alt: 'Scrolling through the DeadlineDesk homepage: the headline, the example deadline dashboard and the explanation of what the product does.',
        width: 1280,
        height: 800,
        startAt: 2.2,
        label: 'Homepage',
        caption: 'The live homepage',
      },
      {
        kind: 'video',
        src: '/media/deadlinedesk/demo-preview.webm',
        poster: '/media/deadlinedesk/demo-poster.jpg',
        alt: 'Scrolling through the public DeadlineDesk demo workspace: counts of overdue and upcoming deadlines, a bar showing how deadlines are spread, and lists grouped by urgency.',
        width: 1280,
        height: 800,
        startAt: 1.8,
        label: 'Demo workspace',
        caption: 'The public demo workspace, with sample data',
      },
      {
        kind: 'image',
        src: '/media/deadlinedesk/home-mobile.jpg',
        alt: 'DeadlineDesk homepage on a phone screen.',
        width: 780,
        height: 1688,
        caption: 'Homepage on mobile',
      },
    ],
    caseStudy: {
      problem:
        'Businesses hold many documents that expire: trade licences, enlistment certificates, insurance, vehicle fitness papers and leases. They are usually tracked in a spreadsheet or in one person’s memory. For contractors bidding on public tenders, one lapsed enlistment certificate can disqualify a bid.',
      contribution:
        'Came up with the product, defined who it is for and what it must do, made the product and design decisions, and took it to a live website.',
      collaboration: 'Built with an AI-assisted development workflow, with Claude as the coding assistant.',
      approach: [
        'Built first for Bangladeshi SME contractors, while keeping the data model industry-neutral: an obligation is a title, a date, a responsible person and a renewal rule.',
        'Every obligation has a named owner. An obligation nobody owns sends no reminders, and the form says so.',
        'Recording a renewal keeps the finished cycle and rolls the date forward, so history is never overwritten.',
        'A public, read-only demo workspace with sample data lets visitors try it before signing up.',
      ],
      features: [
        { label: 'Dashboard grouping deadlines into overdue, urgent, upcoming and safe', status: 'completed' },
        { label: 'Email reminders 90, 60, 30, 14, 7 and 1 days ahead, escalating to managers', status: 'completed' },
        { label: 'A responsible person and an optional backup for every deadline', status: 'completed' },
        { label: 'Renewal history that rolls each deadline forward', status: 'completed' },
        { label: 'Private document storage and an append-only audit trail', status: 'completed' },
        { label: 'CSV import and export', status: 'completed' },
        { label: 'Public demo workspace with sample data', status: 'completed' },
        { label: 'SMS and WhatsApp reminders', status: 'not-built', detail: 'Deliberately left out of this version' },
        { label: 'AI extraction of dates from uploaded documents', status: 'not-built', detail: 'Switched off in this version' },
      ],
      tools: [
        'React Router',
        'TypeScript',
        'Cloudflare Workers',
        'Supabase',
        'Tailwind CSS',
        'Playwright & Vitest',
        'Claude',
      ],
      outcomes: [
        'Live at getdeadlinedesk.com, with a public demo workspace anyone can open.',
        'No real card payment has been taken yet, so paid plans are not yet proven in production.',
      ],
      lessons: [],
    },
  },
  {
    id: 'postdori',
    order: 2,
    visibility: 'published',
    name: 'PostDori',
    tagline: 'Plan. Publish. Connect.',
    category: 'AI social media manager',
    link: {
      // The correct domain is postdori.com (postdory.com does not exist).
      url: 'https://postdori.com',
      status: 'live',
      checked: '2026-11-05',
    },
    // Taken from the live homepage. The signed-in app was not tested, so there
    // is no case study yet.
    summary:
      'An AI social media manager for small businesses: it plans, writes and schedules Facebook and Instagram posts in English, Bangla or Banglish, in the business’s own voice.',
    accent: 'lavender',
    media: [
      {
        kind: 'video',
        src: '/media/postdori/home-preview.webm',
        poster: '/media/postdori/home-poster.jpg',
        alt: 'Scrolling through the PostDori homepage: the headline “Your AI social media manager”, an example content calendar, and the five steps of how it works.',
        width: 1280,
        height: 800,
        startAt: 3.2,
        caption: 'The live homepage',
      },
      {
        kind: 'image',
        src: '/media/postdori/home-mobile.jpg',
        alt: 'PostDori homepage on a phone screen.',
        width: 780,
        height: 1688,
        caption: 'Homepage on mobile',
      },
    ],
  },
  {
    id: 'bcgo-careermap',
    order: 3,
    visibility: 'published',
    // BCGO stands for Bangladesh Career & Global Opportunities, as stated on the site.
    name: 'BCGO Career Map',
    tagline: 'Your next career step, mapped.',
    category: 'Bilingual career guide',
    link: {
      url: 'https://syedmargubelahi.github.io/careermap/',
      status: 'live',
      checked: '2026-11-05',
    },
    summary:
      'Bangladesh Career & Global Opportunities: a free Bangla and English guide that asks a few quick questions and shows what to study, which jobs fit your degree and results, and how to grow in Bangladesh or abroad.',
    accent: 'mint',
    media: [
      {
        kind: 'video',
        src: '/media/bcgo-careermap/home-preview.webm',
        poster: '/media/bcgo-careermap/home-poster.jpg',
        alt: 'Scrolling through BCGO Career Map in Bangla: the headline, a statistic on graduate unemployment from the BBS Labour Force Survey 2024, and the first of three quick questions about where you are in your studies.',
        width: 1280,
        height: 800,
        startAt: 3.5,
        caption: 'The live site, in Bangla',
      },
      {
        kind: 'image',
        src: '/media/bcgo-careermap/home-mobile.jpg',
        alt: 'BCGO Career Map on a phone screen.',
        width: 780,
        height: 1688,
        caption: 'On mobile',
      },
    ],
  },
];
