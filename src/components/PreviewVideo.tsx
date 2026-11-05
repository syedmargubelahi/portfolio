import { useEffect, useRef, useState } from 'react';
import type { VideoMedia } from '../content';
import { useInView, useReducedMotion } from '../hooks';
import { asset } from '../format';
import { Icon } from './ui';

/**
 * Short, silent product clip.
 * - Loads nothing until it is near the screen (poster image first).
 * - Plays only while visible, pauses offscreen.
 * - Never autoplays for reduced-motion visitors; they can press Play.
 * - A visitor's Pause is respected until they press Play again.
 */
export function PreviewVideo({ media, label }: { media: VideoMedia; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frameRef, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [nearRef, near] = useInView<HTMLDivElement>({ rootMargin: '300px 0px', once: true });
  const reduced = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);

  const wantsPlay = userPaused === null ? inView && !reduced : !userPaused && inView;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !near) return;
    if (wantsPlay) {
      v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  }, [wantsPlay, near]);

  const start = media.startAt ?? 0;

  return (
    <div
      className="video-frame"
      ref={(el) => {
        frameRef.current = el;
        nearRef.current = el;
      }}
    >
      <video
        ref={videoRef}
        src={near ? asset(media.src) : undefined}
        poster={asset(media.poster)}
        width={media.width}
        height={media.height}
        muted
        playsInline
        preload="none"
        aria-label={media.alt}
        onLoadedMetadata={(e) => {
          if (start) e.currentTarget.currentTime = start;
        }}
        onEnded={(e) => {
          e.currentTarget.currentTime = start;
          if (wantsPlay) e.currentTarget.play().catch(() => {});
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="video-toggle"
        onClick={() => setUserPaused(playing)}
        aria-label={`${playing ? 'Pause' : 'Play'} preview: ${label}`}
      >
        <Icon name={playing ? 'pause' : 'play'} />
        <span aria-hidden="true">{playing ? 'Pause' : 'Play'}</span>
      </button>
    </div>
  );
}
