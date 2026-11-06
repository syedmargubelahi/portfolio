import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui';

/**
 * A thin bar under the header that shows how far down the page you are.
 * It only reports scrolling; it never changes how the page scrolls.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      ref.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, doc.scrollTop / max) : 0));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return (
    <span className="scroll-progress" aria-hidden="true">
      <span ref={ref} className="scroll-progress-bar" />
    </span>
  );
}

/** A floating "Back to top" button that appears once you have scrolled past the first screen. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <a className="to-top" href="#top" aria-label="Back to top">
      <Icon name="arrow-up" />
    </a>
  );
}
