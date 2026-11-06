import type { CSSProperties } from 'react';
import type { CapabilityGroup, Profile } from '../content';
import { asset } from '../format';
import { DraftBadge, Monogram, Reveal, SectionHeading } from './ui';

export function About({ profile, capabilities }: { profile: Profile; capabilities: CapabilityGroup[] }) {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="About" title="Precise with words. Careful with numbers. Quick to ship." />

        <div className="about-grid">
          <Reveal className="about-portrait">
            {profile.portrait ? (
              <img
                className="portrait-img"
                src={asset(profile.portrait.src)}
                alt={profile.portrait.alt}
                width={profile.portrait.width}
                height={profile.portrait.height}
                loading="lazy"
              />
            ) : (
              <div className="portrait-placeholder">
                <span className="portrait-ring" aria-hidden="true" />
                <Monogram text={profile.monogram} size="lg" />
              </div>
            )}
            <p className="portrait-caption">
              <strong>{profile.name}</strong>
              <span>{profile.location}</span>
            </p>
          </Reveal>

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
