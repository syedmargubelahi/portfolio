import type { CSSProperties } from 'react';
import type { CapabilityGroup, Education, Experience, Profile, Publication } from '../content';
import { DraftBadge, Reveal, SectionHeading } from './ui';

/** A quick-facts card. Every line is drawn from published content. */
function AtAGlance({
  profile,
  capabilities,
  experience,
  education,
  publications,
}: {
  profile: Profile;
  capabilities: CapabilityGroup[];
  experience: Experience[];
  education: Education[];
  publications: Publication[];
}) {
  const current = experience.filter((e) => e.end === 'present');
  const languages = capabilities.find((c) => c.id === 'languages')?.items ?? [];
  const facts: { label: string; values: string[] }[] = [
    { label: 'Based in', values: [profile.location] },
    { label: 'Currently', values: current.map((e) => `${e.role}, ${e.organization}`) },
    { label: 'Education', values: education.slice(0, 2).map((e) => `${e.qualification}, ${e.institution}`) },
    { label: 'Research', values: publications.length ? [`${publications.length} published papers in applied economics`] : [] },
    { label: 'Languages', values: languages },
  ].filter((f) => f.values.length > 0);

  return (
    <Reveal className="glance">
      <p className="glance-title">At a glance</p>
      <dl className="glance-list">
        {facts.map((f) => (
          <div key={f.label} className="glance-row">
            <dt>{f.label}</dt>
            {f.values.map((v) => (
              <dd key={v}>{v}</dd>
            ))}
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export function About({
  profile,
  capabilities,
  experience = [],
  education = [],
  publications = [],
}: {
  profile: Profile;
  capabilities: CapabilityGroup[];
  experience?: Experience[];
  education?: Education[];
  publications?: Publication[];
}) {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="About" title="Precise with words. Careful with numbers. Quick to ship." />

        <div className="about-grid">
          <AtAGlance
            profile={profile}
            capabilities={capabilities}
            experience={experience}
            education={education}
            publications={publications}
          />

          <Reveal className="about-copy" delay={100}>
            {profile.about.map((para, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {para}
              </p>
            ))}
          </Reveal>
        </div>

        {profile.strengths && profile.strengths.length > 0 && (
          <ul className="strengths" aria-label="What I bring">
            {profile.strengths.map((s, i) => (
              <Reveal as="li" key={s.title} className="strength" delay={i * 80}>
                <span className="strength-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ul>
        )}

        {capabilities.length > 0 && (
          <div className="capabilities" aria-labelledby="capabilities-title">
            <h3 id="capabilities-title" className="sub-heading">
              Skills &amp; tools
            </h3>
            <ul className="capability-list">
              {capabilities.map((c, i) => (
                <Reveal as="li" key={c.id} className="capability" delay={i * 70}>
                  <span className="capability-index" aria-hidden="true" style={{ '--i': i } as CSSProperties}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="capability-head">
                    <h4>
                      {c.title}
                      <DraftBadge show={c.visibility === 'draft'} />
                    </h4>
                    <p>{c.description}</p>
                  </div>
                  <ul className="tag-list" aria-label={`${c.title} skills and tools`}>
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
