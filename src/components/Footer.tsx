import type { Profile } from '../content';
import { Monogram } from './ui';

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-id">
          <Monogram text={profile.monogram} size="sm" />
          <p>
            <strong>{profile.name}</strong>
            <span>{profile.location}</span>
          </p>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} {profile.name}</p>
        <a className="footer-top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
