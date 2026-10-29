/**
 * Site-wide copy for the homepage, footer, and search setting.
 * Replace the sample strings when the real words are ready.
 * Menu items, events, photos, and zine issues live in src/content/.
 */

export interface HoursRow {
  days: string;
  time: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteInfo {
  name: string;
  shortName: string;
  description: string;
  /** Shown in the hero. This is draft copy until you replace it. */
  tagline: string;
  about: string[];
  address: string[];
  /** Use a real inbox. Addresses at example.com are shown as samples, not links. */
  email: string;
  hours: HoursRow[];
  /**
   * Leave false while the pages still use sample copy, so search engines
   * skip the site. Set true when the real content is published.
   */
  indexable: boolean;
}

export const site: SiteInfo = {
  name: 'Poco Loco Market',
  shortName: 'Poco Loco',
  description:
    'Sample homepage for Poco Loco Market — a starting point for the menu, events, photo gallery, and zine.',
  tagline: 'A little market. A lot of loco.',
  about: [
    'This paragraph is standing in for the real story. Say who is behind the counter, what people can pick up, and what a busy day here feels like.',
    'No finished description has been written yet. These sentences are sample copy, waiting to be replaced.',
  ],
  address: ['Sample street address', 'Sample city'],
  email: 'hello@example.com',
  hours: [
    { days: 'Monday – Friday', time: 'Sample hours' },
    { days: 'Saturday', time: 'Sample hours' },
    { days: 'Sunday', time: 'Sample hours' },
  ],
  indexable: false,
};

/** Shown in the header and footer. Add a new page, then add a link here. */
export const nav = [
  { href: '/menu', label: 'Menu' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/zine', label: 'Zine' },
] as const;

/** Keep menu categories in this list. The menu schema only allows these names. */
export const menuCategories = ['Food', 'Drinks', 'Market'] as const;
export type MenuCategory = (typeof menuCategories)[number];

/** Colorways for sample image frames. Real photos cover these patterns. */
export const frameTones = ['chili', 'mango', 'cactus', 'grape', 'sky'] as const;
export type FrameTone = (typeof frameTones)[number];

/** Add { label, href } entries when the market has real social profiles. */
export const socials: SocialLink[] = [];
