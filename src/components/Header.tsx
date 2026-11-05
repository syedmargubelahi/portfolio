import { useEffect, useState } from 'react';
import type { Profile } from '../content';
import { useActiveSection } from '../hooks';
import { Monogram } from './ui';

export interface NavItem {
  id: string;
  label: string;
  show: boolean;
}

export function Header({ profile, items }: { profile: Profile; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(items.map((i) => i.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape, and when the screen grows to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 860px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header-inner">
        <a className="identity" href="#top" onClick={() => setOpen(false)} aria-label={`${profile.name}, back to top`}>
          <Monogram text={profile.monogram} size="sm" />
          <span className="identity-text">
            <span className="identity-name">{profile.name}</span>
            <span className="identity-role">Portfolio &amp; CV</span>
          </span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-toggle-bars" aria-hidden="true" />
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Main">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
