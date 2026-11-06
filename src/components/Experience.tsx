import { useId, useState } from 'react';
import type { Experience } from '../content';
import { formatDate, isoDate } from '../format';
import { DraftBadge, Icon, Reveal, SectionHeading } from './ui';

const VISIBLE = 3;

/** Shows the first few duties; the rest open in place with a smooth height change. */
function Highlights({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const first = items.slice(0, VISIBLE);
  const rest = items.slice(VISIBLE);
  return (
    <>
      <ul className="plain-list">
        {first.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      {rest.length > 0 && (
        <>
          <div id={id} className={`collapse ${open ? 'is-open' : ''}`} inert={!open}>
            <ul className="plain-list collapse-inner">
              {rest.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <button type="button" className="more-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'minus' : 'plus'} />
            {open ? 'Show fewer duties' : `Show ${rest.length} more ${rest.length === 1 ? 'duty' : 'duties'}`}
          </button>
        </>
      )}
    </>
  );
}

export function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Where I’ve worked." />
        <ol className="timeline">
          {items.map((job, i) => (
            <Reveal as="li" key={job.id} className={`timeline-item ${job.end === 'present' ? 'is-current' : ''}`} delay={Math.min(i, 3) * 90}>
              <div className="timeline-when">
                <time dateTime={isoDate(job.start)}>{formatDate(job.start)}</time>
                <span aria-hidden="true"> – </span>
                {job.end === 'present' ? (
                  <span className="present">
                    <span className="present-dot" aria-hidden="true" />
                    Present
                  </span>
                ) : (
                  <time dateTime={isoDate(job.end)}>{formatDate(job.end)}</time>
                )}
              </div>
              <span className="timeline-rail" aria-hidden="true">
                <span className="timeline-node" />
              </span>
              <div className="timeline-body">
                <h3 className="timeline-role">
                  {job.role}
                  <DraftBadge show={job.visibility === 'draft'} />
                </h3>
                <p className="timeline-org">
                  {job.organization}
                  {job.location && <span> · {job.location}</span>}
                </p>
                {job.employment && <span className="pill pill--soft">{job.employment}</span>}
                {job.summary && <p className="timeline-summary">{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && <Highlights items={job.highlights} />}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
