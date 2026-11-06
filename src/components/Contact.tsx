import { useState } from 'react';
import type { Profile } from '../content';
import { asset } from '../format';
import { Icon, Reveal } from './ui';

/** Copies the email address and confirms it in words; screen readers hear the confirmation too. */
function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard blocked: the email link next to this button still works.
    }
  };
  return (
    <button type="button" className={`button button--outline-light copy-email ${copied ? 'is-copied' : ''}`} onClick={copy}>
      <Icon name={copied ? 'check' : 'copy'} />
      <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  );
}

/** Shown only when real contact details or a CV file exist. There is no form. */
export function Contact({ profile }: { profile: Profile }) {
  const email = profile.contact.find((c) => c.href.startsWith('mailto:'))?.href.replace('mailto:', '');
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-card">
          <span className="contact-orb contact-orb--a" aria-hidden="true" />
          <span className="contact-orb contact-orb--b" aria-hidden="true" />
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
            {email && (
              <li>
                <CopyEmail email={email} />
              </li>
            )}
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
