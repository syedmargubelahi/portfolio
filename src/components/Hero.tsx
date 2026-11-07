import { Fragment, type CSSProperties } from 'react';
import type { Profile, Project } from '../content';
import { asset } from '../format';
import { Icon, Monogram } from './ui';
import { ProjectCapsules } from './ProjectCapsules';
import { useCountUp, useInView, useTilt } from '../hooks';

export interface HeroStat {
  value: number;
  label: string;
}

/** A short fact shown on the portrait, e.g. a current role. Built from content, never typed. */
export interface HeroBadge {
  title: string;
  detail: string;
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

/** The portrait in a tall frame with an ember halo, plus a few facts floating on it. */
function Portrait({ profile, badges }: { profile: Profile; badges: HeroBadge[] }) {
  const tiltRef = useTilt<HTMLElement>(4);
  const p = profile.portrait;
  if (!p) {
    return (
      <div className="hero-monogram">
        <Monogram text={profile.monogram} size="lg" />
      </div>
    );
  }
  const webp = p.webp?.map((v) => `${asset(v.src)} ${v.width}w`).join(', ');
  const sizes = '(max-width: 960px) min(88vw, 460px), 460px';
  return (
    <figure ref={tiltRef} className="hero-portrait">
      <span className="portrait-halo" aria-hidden="true" />
      <div className="portrait-frame">
        <picture>
          {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
          <img
            src={asset(p.src)}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes={sizes}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      {badges.length > 0 && (
        <ul className="portrait-badges" aria-label="At a glance">
          {badges.map((b, i) => (
            <li key={b.title} className={`portrait-badge portrait-badge--${i + 1}`} style={{ '--i': i } as CSSProperties}>
              <strong>{b.title}</strong>
              <span>{b.detail}</span>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

export function Hero({
  profile,
  projects,
  stats = [],
  badges = [],
}: {
  profile: Profile;
  projects: Project[];
  stats?: HeroStat[];
  badges?: HeroBadge[];
}) {
  const nameWords = profile.name.split(' ');

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true">
        <span className="glow glow--ember" />
        <span className="glow glow--ember-soft" />
        <span className="hero-grid" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="kicker-dot" aria-hidden="true" />
            {profile.location}
          </p>

          <h1 id="hero-title" className="hero-name" aria-label={profile.name}>
            {nameWords.map((word, i) => (
              <Fragment key={i}>
                <span className="word-mask" aria-hidden="true">
                  <span
                    className={`word ${i === nameWords.length - 1 ? 'word--highlight' : ''}`}
                    style={{ '--i': i } as CSSProperties}
                  >
                    {word}
                  </span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <p className="hero-titles">
            {profile.titles.map((t, i) => (
              <span key={t} style={{ '--i': i } as CSSProperties}>
                {t}
              </span>
            ))}
          </p>

          <p className="hero-headline">{profile.heroHeadline}</p>
          <p className="hero-intro">{profile.heroIntro}</p>

          <div className="hero-actions">
            {projects.length > 0 && (
              <a className="button button--ember" href="#work">
                Explore My Work
                <Icon name="arrow-down" />
              </a>
            )}
            <a className="button button--outline-light" href="#experience">
              View Experience
            </a>
          </div>

          <HeroStats stats={stats} />
        </div>

        <div className="hero-visual">
          <Portrait profile={profile} badges={badges} />
        </div>
      </div>

      {projects.length > 0 && <ProjectCapsules projects={projects} />}
    </section>
  );
}
