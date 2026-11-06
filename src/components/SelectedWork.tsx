import { useId, useState } from 'react';
import type { ImageMedia, Project, VideoMedia } from '../content';
import { asset, domainOf } from '../format';
import { CaseStudyPanel } from './CaseStudy';
import { PreviewVideo } from './PreviewVideo';
import { DraftBadge, ExternalLink, Icon, Reveal, SectionHeading } from './ui';

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Real problems, shipped as live products."
          intro="Three websites I took from idea to launch with AI-assisted tools. Every screenshot and clip comes from the live site."
        />
        <div className="work-list">
          {projects.map((p, i) =>
            p.media.length > 0 ? (
              <MediaProject key={p.id} project={p} flip={i % 2 === 1} startOnSecondClip={i === 0} />
            ) : (
              <TextProject key={p.id} project={p} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectActions({ project, caseOpen, onToggle, panelId }: {
  project: Project;
  caseOpen: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const live = project.link?.status === 'live';
  if (!live && !project.caseStudy) return null;
  return (
    <div className="project-actions">
      {live && project.link && (
        <ExternalLink href={project.link.url} label={`Visit ${project.name} website`} className="button button--primary">
          Visit Website
          <Icon name="arrow-up-right" />
        </ExternalLink>
      )}
      {project.caseStudy && (
        <button type="button" className="button button--ghost" aria-expanded={caseOpen} aria-controls={panelId} onClick={onToggle}>
          {caseOpen ? 'Hide Case Study' : 'View Case Study'}
          <Icon name={caseOpen ? 'minus' : 'plus'} />
        </button>
      )}
    </div>
  );
}

function MediaProject({ project, flip, startOnSecondClip }: { project: Project; flip: boolean; startOnSecondClip: boolean }) {
  const videos = project.media.filter((m): m is VideoMedia => m.kind === 'video');
  const tall = project.media.find((m): m is ImageMedia => m.kind === 'image' && m.height > m.width);
  const wide = project.media.filter((m): m is ImageMedia => m.kind === 'image' && m.height <= m.width);
  const [tab, setTab] = useState(startOnSecondClip && videos.length > 1 ? 1 : 0);
  const [caseOpen, setCaseOpen] = useState(false);
  const panelId = useId();
  const tabsId = useId();
  const current = videos[tab];

  return (
    <article className={`project project--media ${flip ? 'project--flip' : ''} accent--${project.accent}`} id={`work-${project.id}`} aria-labelledby={`${project.id}-name`}>
      <Reveal className="project-media">
        <div className="media-collage">
          {current ? (
            <figure className="frame frame--wide">
              {videos.length > 1 && (
                <div className="media-tabs" role="tablist" aria-label={`${project.name} previews`}>
                  {videos.map((v, i) => (
                    <button
                      key={v.src}
                      type="button"
                      role="tab"
                      id={`${tabsId}-${i}`}
                      aria-selected={tab === i}
                      aria-controls={`${tabsId}-panel`}
                      tabIndex={tab === i ? 0 : -1}
                      onClick={() => setTab(i)}
                      onKeyDown={(e) => {
                        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                        const next = (i + (e.key === 'ArrowRight' ? 1 : videos.length - 1)) % videos.length;
                        setTab(next);
                        document.getElementById(`${tabsId}-${next}`)?.focus();
                      }}
                    >
                      {v.label ?? v.caption ?? `Preview ${i + 1}`}
                    </button>
                  ))}
                </div>
              )}
              <div role={videos.length > 1 ? 'tabpanel' : undefined} id={`${tabsId}-panel`} aria-labelledby={videos.length > 1 ? `${tabsId}-${tab}` : undefined}>
                <PreviewVideo key={current.src} media={current} label={`${project.name}, ${current.label ?? current.caption ?? ''}`} />
              </div>
              {current.caption && <figcaption>{current.caption}</figcaption>}
            </figure>
          ) : (
            wide[0] && (
              <figure className="frame frame--wide">
                <img src={asset(wide[0].src)} alt={wide[0].alt} width={wide[0].width} height={wide[0].height} loading="lazy" decoding="async" />
                {wide[0].caption && <figcaption>{wide[0].caption}</figcaption>}
              </figure>
            )
          )}
          {tall && (
            <figure className="frame frame--phone">
              <img src={asset(tall.src)} alt={tall.alt} width={tall.width} height={tall.height} loading="lazy" decoding="async" />
            </figure>
          )}
        </div>
      </Reveal>

      <Reveal className="project-copy" delay={120}>
        <p className="eyebrow">{project.category}</p>
        <h3 id={`${project.id}-name`} className="project-name">
          {project.name}
          <DraftBadge show={project.visibility === 'draft'} />
        </h3>
        <p className="project-tagline">{project.tagline}</p>
        {project.summary && <p className="project-summary">{project.summary}</p>}
        {project.link && <p className="project-domain">{domainOf(project.link.url)}</p>}
        <ProjectActions project={project} caseOpen={caseOpen} onToggle={() => setCaseOpen((o) => !o)} panelId={panelId} />
      </Reveal>

      {project.caseStudy && <CaseStudyPanel id={panelId} open={caseOpen} project={project} study={project.caseStudy} />}
    </article>
  );
}

function TextProject({ project }: { project: Project }) {
  const [caseOpen, setCaseOpen] = useState(false);
  const panelId = useId();
  const live = project.link?.status === 'live';
  return (
    <article className={`project project--text accent--${project.accent}`} id={`work-${project.id}`} aria-labelledby={`${project.id}-name`}>
      <Reveal className="project-text-inner">
        <div className="project-text-mark" aria-hidden="true">
          {project.name}
        </div>
        <div className="project-copy">
          <p className="eyebrow">{project.category}</p>
          <h3 id={`${project.id}-name`} className="project-name">
            {project.name}
            <DraftBadge show={project.visibility === 'draft'} />
          </h3>
          <p className="project-tagline">{project.tagline}</p>
          {project.summary && <p className="project-summary">{project.summary}</p>}
          {project.link && (
            <p className="project-domain">
              {domainOf(project.link.url)}
              {!live && project.link.note && <span className="status-pill">{project.link.note}</span>}
            </p>
          )}
          <ProjectActions project={project} caseOpen={caseOpen} onToggle={() => setCaseOpen((o) => !o)} panelId={panelId} />
        </div>
      </Reveal>
      {project.caseStudy && <CaseStudyPanel id={panelId} open={caseOpen} project={project} study={project.caseStudy} />}
    </article>
  );
}
