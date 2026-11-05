import type { Education } from '../content';
import { formatRange } from '../format';
import { DraftBadge, Reveal, SectionHeading } from './ui';

export function EducationSection({ items }: { items: Education[] }) {
  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading id="education-title" eyebrow="Education" title="Grounded in economics." />
        <ol className="edu-list">
          {items.map((e, i) => (
            <Reveal as="li" key={e.id} className="edu-item" delay={i * 70}>
              <span className="edu-year" aria-hidden="true">
                {e.end.slice(0, 4)}
              </span>
              <div className="edu-body">
                <h3>
                  {e.qualification}
                  <DraftBadge show={e.visibility === 'draft'} />
                </h3>
                <p className="edu-inst">{e.institution}</p>
                {e.note && <p className="edu-note">{e.note}</p>}
              </div>
              <p className="edu-dates">{formatRange(e.start, e.end)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
