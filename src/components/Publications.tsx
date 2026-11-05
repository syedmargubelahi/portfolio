import type { Publication } from '../content';
import { formatDate } from '../format';
import { DraftBadge, ExternalLink, Icon, Reveal, SectionHeading } from './ui';

export function PublicationsSection({ items }: { items: Publication[] }) {
  return (
    <section className="section publications" id="writing" aria-labelledby="writing-title">
      <div className="container">
        <SectionHeading id="writing-title" eyebrow="Research" title="Published research." />
        <ul className="publication-list">
          {items.map((p, i) => (
            <Reveal as="li" key={p.id} className="publication" delay={i * 60}>
              <p className="publication-meta">
                <span className="publication-outlet">{p.outlet}</span> · <time dateTime={p.date}>{formatDate(p.date)}</time>
                {p.citation && <span> · {p.citation}</span>}
              </p>
              <h3>
                {p.url ? (
                  <ExternalLink href={p.url} label={p.title}>
                    {p.title} <Icon name="arrow-up-right" />
                  </ExternalLink>
                ) : (
                  p.title
                )}
                <DraftBadge show={p.visibility === 'draft'} />
              </h3>
              {p.authors && <p className="publication-authors">{p.authors}</p>}
              {p.summary && <p>{p.summary}</p>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
