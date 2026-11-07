import { content, showDrafts } from './content';
import { Header, type NavItem } from './components/Header';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { About } from './components/About';
import { ExperienceSection } from './components/Experience';
import { EducationSection } from './components/Education';
import { CredentialsSection } from './components/Credentials';
import { PublicationsSection } from './components/Publications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SkillsTicker } from './components/SkillsTicker';
import { BackToTop } from './components/ScrollUI';

export function App() {
  const { profile, projects, experience, education, credentials, publications, capabilities } = content;
  const hasContact = profile.contact.length > 0 || Boolean(profile.cvFile);

  // A section with nothing published is not rendered, and neither is its link.
  const nav: NavItem[] = [
    { id: 'work', label: 'Work', show: projects.length > 0 },
    { id: 'about', label: 'About', show: true },
    { id: 'experience', label: 'Experience', show: experience.length > 0 },
    { id: 'education', label: 'Education', show: education.length > 0 },
    { id: 'writing', label: 'Research', show: publications.length > 0 },
    { id: 'credentials', label: 'Credentials', show: credentials.length > 0 },
    { id: 'contact', label: 'Contact', show: hasContact },
  ];

  // Hero figures are counted from published content, never typed in by hand.
  const stats = [
    { value: projects.filter((p) => p.link?.status === 'live').length, label: 'Live websites' },
    { value: publications.length, label: 'Published papers' },
    { value: experience.length, label: 'Roles held' },
    { value: credentials.length, label: 'Credentials & activities' },
  ].filter((s) => s.value > 0);

  // Facts on the hero portrait, also taken from published content.
  const currentRole = experience.find((e) => e.end === 'present');
  const topDegree = education[0];
  const badges = [
    ...(currentRole ? [{ title: currentRole.role, detail: currentRole.organization }] : []),
    ...(topDegree ? [{ title: topDegree.qualification, detail: topDegree.institution }] : []),
    ...(publications.length ? [{ title: `${publications.length} published papers`, detail: 'Applied economics research' }] : []),
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {showDrafts && <div className="draft-banner">Draft preview — drafts are visible only in development.</div>}
      <Header profile={profile} items={nav.filter((n) => n.show)} />
      <main id="main" tabIndex={-1}>
        <Hero profile={profile} projects={projects} stats={stats} badges={badges} />
        {capabilities.length > 0 && <SkillsTicker groups={capabilities} />}
        {projects.length > 0 && <SelectedWork projects={projects} />}
        <About
          profile={profile}
          capabilities={capabilities}
          experience={experience}
          education={education}
          publications={publications}
        />
        {experience.length > 0 && <ExperienceSection items={experience} />}
        {education.length > 0 && <EducationSection items={education} />}
        {publications.length > 0 && <PublicationsSection items={publications} />}
        {credentials.length > 0 && <CredentialsSection items={credentials} />}
        {hasContact && <Contact profile={profile} />}
      </main>
      <Footer profile={profile} />
      <BackToTop />
    </>
  );
}
