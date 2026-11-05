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

export function App() {
  const { profile, projects, experience, education, credentials, publications, capabilities } = content;
  const hasContact = profile.contact.length > 0 || Boolean(profile.cvFile);

  // A section with nothing published is not rendered, and neither is its link.
  const nav: NavItem[] = [
    { id: 'work', label: 'Work', show: projects.length > 0 },
    { id: 'about', label: 'About', show: true },
    { id: 'experience', label: 'Experience', show: experience.length > 0 },
    {
      id: education.length ? 'education' : 'credentials',
      label: 'Credentials',
      show: education.length > 0 || credentials.length > 0,
    },
    { id: 'contact', label: 'Contact', show: hasContact },
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {showDrafts && <div className="draft-banner">Draft preview — drafts are visible only in development.</div>}
      <Header profile={profile} items={nav.filter((n) => n.show)} />
      <main id="main" tabIndex={-1}>
        <Hero profile={profile} projects={projects} />
        {projects.length > 0 && <SelectedWork projects={projects} />}
        <About profile={profile} capabilities={capabilities} />
        {experience.length > 0 && <ExperienceSection items={experience} />}
        {education.length > 0 && <EducationSection items={education} />}
        {credentials.length > 0 && <CredentialsSection items={credentials} />}
        {publications.length > 0 && <PublicationsSection items={publications} />}
        {hasContact && <Contact profile={profile} />}
      </main>
      <Footer profile={profile} />
    </>
  );
}
