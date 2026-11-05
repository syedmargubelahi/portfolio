import type { Experience } from '../content';
import { formatDate, isoDate } from '../format';
import { DraftBadge, Reveal, SectionHeading } from './ui';

export function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Where I’ve worked." />
        <ol className="timeline">
          {items.map((job, i) => (
            <Reveal as="li" key={job.id} className="timeline-item" delay={i * 90}>
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
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="plain-list">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
