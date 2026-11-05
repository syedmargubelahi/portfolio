import type { CaseStudy, FeatureStatus, Project } from '../content';
import { Icon } from './ui';

const STATUS: Record<FeatureStatus, { label: string; icon: 'check' | 'circle' | 'minus' }> = {
  completed: { label: 'Built', icon: 'check' },
  planned: { label: 'Planned', icon: 'circle' },
  'not-built': { label: 'Not in this version', icon: 'minus' },
};

/** The case study opens in place under its project. Empty parts are left out. */
export function CaseStudyPanel({ id, open, project, study }: { id: string; open: boolean; project: Project; study: CaseStudy }) {
  return (
    <div id={id} className={`case-study ${open ? 'is-open' : ''}`} hidden={!open} role="region" aria-label={`${project.name} case study`}>
      <div className="case-grid">
        <div className="case-block case-block--lead">
          <h4>The problem</h4>
          <p>{study.problem}</p>
        </div>

        <div className="case-block">
          <h4>My contribution</h4>
          <p>{study.contribution}</p>
          {study.collaboration && <p className="case-note">{study.collaboration}</p>}
        </div>

        {study.approach.length > 0 && (
          <div className="case-block case-block--wide">
            <h4>Approach</h4>
            <ol className="case-steps">
              {study.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
          </div>
        )}

        {study.features.length > 0 && (
          <div className="case-block case-block--wide">
            <h4>Features</h4>
            <ul className="feature-list">
              {study.features.map((f) => (
                <li key={f.label} className={`feature feature--${f.status}`}>
                  <span className="feature-status">
                    <Icon name={STATUS[f.status].icon} />
                    {STATUS[f.status].label}
                  </span>
                  <span className="feature-label">
                    {f.label}
                    {f.detail && <span className="feature-detail"> — {f.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {study.tools.length > 0 && (
          <div className="case-block">
            <h4>Tools</h4>
            <ul className="tag-list">
              {study.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {study.outcomes.length > 0 && (
          <div className="case-block">
            <h4>Where it stands</h4>
            <ul className="plain-list">
              {study.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {study.lessons.length > 0 && (
          <div className="case-block case-block--wide">
            <h4>Lessons</h4>
            <ul className="plain-list">
              {study.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
