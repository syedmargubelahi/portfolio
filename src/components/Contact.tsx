import type { Profile } from '../content';
import { asset } from '../format';
import { Icon, Reveal } from './ui';

/** Shown only when real contact details or a CV file exist. There is no form. */
export function Contact({ profile }: { profile: Profile }) {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-card">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let’s talk.</h2>
          <ul className="contact-links">
            {profile.contact.map((c) => {
              const external = /^https?:/.test(c.href);
              return (
                <li key={c.href}>
                  <a
                    className="button button--light"
                    href={c.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={`${c.label}: ${c.display}${external ? ' (opens in a new tab)' : ''}`}
                  >
                    <Icon name={c.href.startsWith('mailto:') ? 'mail' : 'arrow-up-right'} />
                    {c.display}
                  </a>
                </li>
              );
            })}
            {profile.cvFile && (
              <li>
                <a className="button button--outline-light" href={asset(profile.cvFile)} download>
                  <Icon name="download" />
                  Download CV (PDF)
                </a>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
