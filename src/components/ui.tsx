// Small building blocks shared by every section.
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks';

export function Monogram({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`monogram monogram--${size}`} aria-hidden="true">
      {text}
    </span>
  );
}

/** Fades and lifts its children into view once. Reduced-motion visitors see them immediately. */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12, rootMargin: '0px 0px -8% 0px', once: true });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id: string }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      {/* The inner span slides up out of a mask when the heading scrolls into view. */}
      <h2 id={id} className="heading-mask">
        <span className="heading-line">{title}</span>
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}

type IconName =
  | 'arrow-up-right'
  | 'arrow-down'
  | 'arrow-up'
  | 'play'
  | 'pause'
  | 'plus'
  | 'check'
  | 'circle'
  | 'minus'
  | 'download'
  | 'mail'
  | 'copy';

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
    'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
    'arrow-up': <path d="M12 19V5M6 11l6-6 6 6" />,
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V6a2 2 0 0 1 2-2h8" />
      </>
    ),
    play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
    pause: (
      <>
        <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
        <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    circle: <circle cx="12" cy="12" r="6.5" />,
    download: <path d="M12 4v11M7 10l5 5 5-5M5 19h14" />,
    mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

/** A link that opens a project website in a new tab, safely and with a clear label. */
export function ExternalLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={`${label} (opens in a new tab)`}>
      {children}
    </a>
  );
}

export function DraftBadge({ show }: { show: boolean }) {
  return show ? <span className="draft-badge">Draft</span> : null;
}
