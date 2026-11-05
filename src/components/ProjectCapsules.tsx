import type { CSSProperties } from 'react';
import type { Project } from '../content';
import { domainOf } from '../format';
import { DraftBadge, ExternalLink, Icon } from './ui';

/**
 * One fully clickable pill per project.
 * Live sites open in a new tab. A site that is not reachable yet is never
 * linked; its capsule jumps to the project's entry on this page instead.
 */
export function ProjectCapsules({ projects }: { projects: Project[] }) {
  return (
    <div className="capsules-wrap">
      <p className="capsules-label" id="capsules-label">
        Projects
      </p>
      <ul className="capsules" aria-labelledby="capsules-label">
        {projects.map((p, i) => {
          const domain = p.link ? domainOf(p.link.url) : undefined;
          const body = (
            <>
              <span className="capsule-mark" aria-hidden="true">
                {p.name.charAt(0)}
              </span>
              <span className="capsule-text">
                <span className="capsule-name">
                  {p.name}
                  <DraftBadge show={p.visibility === 'draft'} />
                </span>
                <span className="capsule-tagline">{p.tagline}</span>
                {domain && <span className="capsule-domain">{domain}</span>}
              </span>
              <span className="capsule-meta">
                {p.link?.status === 'live' ? (
                  <Icon name="arrow-up-right" className="capsule-arrow" />
                ) : (
                  <span className="capsule-status">{p.link?.note ?? 'Details soon'}</span>
                )}
              </span>
            </>
          );
          return (
            <li key={p.id} className={`capsule accent--${p.accent}`} style={{ '--i': i } as CSSProperties}>
              {p.link?.status === 'live' ? (
                <ExternalLink href={p.link.url} label={`Visit ${p.name} website, ${domain}`} className="capsule-link">
                  {body}
                </ExternalLink>
              ) : (
                <a href={`#work-${p.id}`} className="capsule-link" aria-label={`${p.name}: ${p.link?.note ?? 'details soon'}. Jump to project.`}>
                  {body}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
