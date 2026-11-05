const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2019-07' → 'Jul 2019', '2010' → '2010', 'present' → 'Present'. */
export function formatDate(value: string): string {
  if (value === 'present') return 'Present';
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

/** Machine-readable value for <time dateTime>. */
export function isoDate(value: string): string | undefined {
  return value === 'present' ? undefined : value;
}

export function formatRange(start: string | undefined, end: string): string {
  return start ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(end);
}

/** Turns a /public path like '/media/x.jpg' into a URL that works under the deploy base path. */
export function asset(path: string): string {
  return /^https?:/.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '');
}

export function domainOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}
