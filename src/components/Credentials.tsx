import { useId, useState, type CSSProperties } from 'react';
import type { Credential, CredentialType, Involvement } from '../content';
import { formatDate } from '../format';
import { DraftBadge, ExternalLink, Icon, Reveal, SectionHeading } from './ui';

const TYPES: { type: CredentialType; title: string }[] = [
  { type: 'certification', title: 'Certifications' },
  { type: 'award', title: 'Awards' },
  { type: 'training', title: 'Training' },
  { type: 'conference', title: 'Conferences' },
  { type: 'seminar', title: 'Seminars' },
  { type: 'volunteering', title: 'Volunteering' },
  { type: 'extracurricular', title: 'Activities' },
];

const SINGULAR: Record<CredentialType, string> = {
  certification: 'Certification',
  award: 'Award',
  training: 'Training',
  conference: 'Conference',
  seminar: 'Seminar',
  volunteering: 'Volunteering',
  extracurricular: 'Activity',
};

const INVOLVEMENT: Record<Involvement, string> = {
  attended: 'Attended',
  spoke: 'Speaker',
  organized: 'Organiser',
  certified: 'Certified',
  awarded: 'Awarded',
  participated: 'Participant',
  volunteered: 'Volunteer',
};

/** How many records show before "Show all". */
const LIMIT = 8;

export function CredentialsSection({ items }: { items: Credential[] }) {
  const [filter, setFilter] = useState<CredentialType | 'all'>('all');
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  const filters = [
    { type: 'all' as const, title: 'All', count: items.length },
    ...TYPES.map((t) => ({ ...t, count: items.filter((i) => i.type === t.type).length })).filter((t) => t.count > 0),
  ];
  const matching = filter === 'all' ? items : items.filter((i) => i.type === filter);
  const shown = expanded ? matching : matching.slice(0, LIMIT);

  const choose = (type: CredentialType | 'all') => {
    setFilter(type);
    setExpanded(false);
  };

  return (
    <section className="section credentials" id="credentials" aria-labelledby="credentials-title">
      <div className="container">
        <SectionHeading id="credentials-title" eyebrow="Credentials" title="Training, activities and recognition." />

        <Reveal className="filter-bar">
          <div className="filter-scroll" role="group" aria-label="Show credentials by type">
            {filters.map((f) => (
              <button
                key={f.type}
                type="button"
                className="filter-chip"
                aria-pressed={filter === f.type}
                onClick={() => choose(f.type)}
              >
                {f.title}
                <span className="filter-count">{f.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Re-keyed on each filter so the rows fade in afresh. */}
        <p className="visually-hidden" aria-live="polite">
          Showing {shown.length} of {matching.length}
        </p>
        <ul key={filter} id={listId} className="credential-rows">
          {shown.map((c, i) => (
            <li key={c.id} className="credential-row" style={{ '--i': Math.min(i, 8) } as CSSProperties}>
              <span className="credential-year" aria-hidden="true">
                {c.date?.slice(0, 4) ?? '—'}
              </span>
              <div className="credential-body">
                <p className="credential-type">
                  {SINGULAR[c.type]}
                  <span className={`pill pill--${c.involvement}`}>{INVOLVEMENT[c.involvement]}</span>
                </p>
                <h3>
                  {c.url ? (
                    <ExternalLink href={c.url} label={`${c.title}, ${c.issuer}`}>
                      {c.title} <Icon name="arrow-up-right" />
                    </ExternalLink>
                  ) : (
                    c.title
                  )}
                  <DraftBadge show={c.visibility === 'draft'} />
                </h3>
                <p className="credential-meta">
                  {c.issuer}
                  {c.date && (
                    <>
                      {' · '}
                      <time dateTime={c.date}>{formatDate(c.date)}</time>
                    </>
                  )}
                </p>
                {c.description && <p className="credential-desc">{c.description}</p>}
              </div>
            </li>
          ))}
        </ul>

        {matching.length > LIMIT && (
          <div className="more-wrap">
            <button type="button" className="button button--ghost" aria-expanded={expanded} aria-controls={listId} onClick={() => setExpanded((e) => !e)}>
              <Icon name={expanded ? 'minus' : 'plus'} />
              {expanded ? 'Show fewer' : `Show all ${matching.length}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
