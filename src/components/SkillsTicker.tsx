import { useState } from 'react';
import type { CapabilityGroup } from '../content';
import { Icon } from './ui';

/**
 * A slow, calm band of skills that drifts sideways. It pauses on hover, on
 * keyboard focus and with its own Pause button. With reduced motion it does
 * not move at all and becomes a row you can scroll sideways.
 */
export function SkillsTicker({ groups }: { groups: CapabilityGroup[] }) {
  const [paused, setPaused] = useState(false);
  const items = [...new Set(groups.flatMap((g) => g.items))];
  if (!items.length) return null;

  const row = (hidden: boolean) => (
    <ul className="ticker-row" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : 'Skills and tools'}>
      {items.map((item) => (
        <li key={item}>
          <span className="ticker-star" aria-hidden="true">
            ✦
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`ticker ${paused ? 'is-paused' : ''}`}>
      <div className="ticker-viewport" role="region" tabIndex={0} aria-label="Skills and tools, scroll sideways to see more">
        <div className="ticker-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        className="ticker-toggle"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play skills animation' : 'Pause skills animation'}
      >
        <Icon name={paused ? 'play' : 'pause'} />
      </button>
    </div>
  );
}
