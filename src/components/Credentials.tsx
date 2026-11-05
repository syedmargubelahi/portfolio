import type { Credential, CredentialType, Involvement } from '../content';
import { formatDate } from '../format';
import { DraftBadge, ExternalLink, Icon, Reveal, SectionHeading } from './ui';

const GROUPS: { type: CredentialType; title: string }[] = [
  { type: 'certification', title: 'Certifications' },
  { type: 'award', title: 'Awards' },
  { type: 'training', title: 'Training' },
  { type: 'conference', title: 'Conferences' },
  { type: 'seminar', title: 'Seminars' },
  { type: 'volunteering', title: 'Volunteering' },
  { type: 'extracurricular', title: 'Activities' },
];

const INVOLVEMENT: Record<Involvement, string> = {
  attended: 'Attended',
  spoke: 'Speaker',
  organized: 'Organiser',
  certified: 'Certified',
  awarded: 'Awarded',
  participated: 'Participant',
  volunteered: 'Volunteer',
};

export function CredentialsSection({ items }: { items: Credential[] }) {
  const groups = GROUPS.map((g) => ({ ...g, items: items.filter((i) => i.type === g.type) })).filter((g) => g.items.length);
  return (
    <section className="section credentials" id="credentials" aria-labelledby="credentials-title">
      <div className="container">
        <SectionHeading id="credentials-title" eyebrow="Credentials" title="Training, activities and recognition." />
        <div className="credential-groups">
          {groups.map((g) => (
            <Reveal key={g.type} className="credential-group">
              <h3 className="sub-heading">{g.title}</h3>
              <ul className="credential-list">
                {g.items.map((c) => (
                  <li key={c.id} className="credential">
                    <span className={`pill pill--${c.involvement}`}>{INVOLVEMENT[c.involvement]}</span>
                    <div>
                      <h4>
                        {c.url ? (
                          <ExternalLink href={c.url} label={`${c.title}, ${c.issuer}`}>
                            {c.title} <Icon name="arrow-up-right" />
                          </ExternalLink>
                        ) : (
                          c.title
                        )}
                        <DraftBadge show={c.visibility === 'draft'} />
                      </h4>
                      <p className="credential-meta">
                        {c.issuer} · <time dateTime={c.date}>{formatDate(c.date)}</time>
                      </p>
                      {c.description && <p>{c.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
