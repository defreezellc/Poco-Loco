const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export function splitIsoDate(iso: string): { month: string; day: string; year: string } {
  const [year = '', month = '1', day = '1'] = iso.split('-');
  const monthIndex = Number(month) - 1;
  return {
    month: MONTHS[monthIndex] ?? month,
    day: String(Number(day)),
    year,
  };
}

/** Format YYYY-MM-DD without shifting the calendar day across time zones. */
export function formatLongDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function sampleCount(count: number, noun: string): string {
  const word = count === 1 ? noun : `${noun}s`;
  if (count === 0) return `No ${word} yet.`;
  return `${count} sample ${word}.`;
}

export function isPlaceholderEmail(email: string): boolean {
  return /@example\.(com|org|net)$/i.test(email);
}
