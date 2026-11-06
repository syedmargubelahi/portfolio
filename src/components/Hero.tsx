import { Fragment, type CSSProperties } from 'react';
import type { Profile, Project, VideoMedia } from '../content';
import { Icon, Monogram } from './ui';
import { PreviewVideo } from './PreviewVideo';
import { ProjectCapsules } from './ProjectCapsules';
import { useCountUp, useInView, useTilt } from '../hooks';

export interface HeroStat {
  value: number;
  label: string;
}

/** One figure that counts up when it first appears. Every figure is counted from the content files. */
function Stat({ stat, start, index }: { stat: HeroStat; start: boolean; index: number }) {
  const shown = useCountUp(stat.value, start, 1200 + index * 150);
  return (
    <div className="hero-stat" style={{ '--i': index } as CSSProperties}>
      <dt>{stat.label}</dt>
      <dd>
        <span aria-hidden="true">{shown}</span>
        <span className="visually-hidden">{stat.value}</span>
      </dd>
    </div>
  );
}

function HeroStats({ stats }: { stats: HeroStat[] }) {
  const [ref, inView] = useInView<HTMLDListElement>({ threshold: 0.4, once: true });
  if (!stats.length) return null;
  return (
    <dl ref={ref} className="hero-stats">
      {stats.map((s, i) => (
        <Stat key={s.label} stat={s} start={inView} index={i} />
      ))}
    </dl>
  );
}

export function Hero({ profile, projects, stats = [] }: { profile: Profile; projects: Project[]; stats?: HeroStat[] }) {
  const tiltRef = useTilt<HTMLElement>(3);
  const words = profile.heroHeadline.split(' ');
  // The hero frame shows the first real clip from the first project that has one.
  const featured = projects.find((p) => p.media.some((m) => m.kind === 'video'));
  const clip = featured?.media.find((m): m is VideoMedia => m.kind === 'video');

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true">
        <span className="glow glow--lavender" />
        <span className="glow glow--mint" />
        <span className="glow glow--royal" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="kicker-dot" aria-hidden="true" />
            {profile.preferredName} · {profile.location}
          </p>

          <h1 id="hero-title" className="hero-title" aria-label={profile.heroHeadline}>
            {words.map((word, i) => {
              const clean = word.replace(/[^\w]/g, '');
              const highlight = clean === profile.heroWords.highlight;
              return (
                <Fragment key={i}>
                <span className="word-mask" aria-hidden="true">
                  <span className={`word ${highlight ? 'word--highlight' : ''}`} style={{ '--i': i } as CSSProperties}>
                    {word}
                    {highlight && (
                      <svg className="word-underline" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M3 14 C 50 4, 120 4, 197 11" />
                      </svg>
                    )}
                  </span>
                </span>{' '}
                </Fragment>
              );
            })}
          </h1>

          <p className="hero-intro">{profile.heroIntro}</p>

          <div className="hero-actions">
            {projects.length > 0 && (
              <a className="button button--primary" href="#work">
                Explore My Work
                <Icon name="arrow-down" />
              </a>
            )}
            <a className="button button--ghost" href="#about">
              About Me
            </a>
          </div>

          <HeroStats stats={stats} />
        </div>

        <div className="hero-visual">
          {featured && clip ? (
            <figure ref={tiltRef} className={`hero-frame accent--${featured.accent}`}>
              <PreviewVideo media={clip} label={featured.name} />
              <figcaption className="hero-frame-caption">
                <span className="live-dot" aria-hidden="true" />
                {featured.name} — {clip.caption ?? featured.tagline}
              </figcaption>
            </figure>
          ) : (
            <div className="hero-monogram">
              <Monogram text={profile.monogram} size="lg" />
            </div>
          )}
        </div>
      </div>

      {projects.length > 0 && <ProjectCapsules projects={projects} />}
    </section>
  );
}
