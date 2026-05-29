// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for site identity, nav, and social links.
// Fork this template, then edit THIS FILE first — almost everything the
// visitor sees flows from here. Search the repo for "Your Name" to find
// the remaining inline copy to replace.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Your Name',
  parent: 'Your Studio',
  domain: 'example.com',
  url: 'https://example.com',
  contactEmail: 'hello@example.com',
  discordInvite: '',
  tagline: 'One-line positioning statement — what you do and who for.',
  description:
    'Portfolio of Your Name — short paragraph describing your work, your craft, and the kind of projects you take on. This text is used for SEO meta + OG cards.',
  ogImage: '/assets/brand/og-image.png',
  twitter: '',
  linkedin: '',
  locale: 'en-US',
} as const;

export const nav = [
  { href: '/#proof', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#systems', label: 'Approach' },
  { href: '/#contact', label: 'Contact' },
] as const;

export const legalNav = [
  { href: '/#contact', label: 'Contact' },
] as const;

// Social links — delete the ones you don't use, the Footer + SocialIcons
// components render whatever's here. Icons live in /public/icons/social/.
export const socialLinks = [
  { name: 'GitHub',   handle: 'your-handle',  href: 'https://github.com/your-handle',          icon: '/icons/social/github.svg' },
  { name: 'LinkedIn', handle: 'your-handle',  href: 'https://www.linkedin.com/in/your-handle', icon: '/icons/social/linkedin.svg' },
  { name: 'X',        handle: '@your-handle', href: 'https://x.com/your-handle',               icon: '/icons/social/x.svg' },
] as const;

// Optional announcement bar across the top. Set enabled: true to show.
export const announcementBar = {
  enabled: false,
  message: '',
  ctaLabel: '',
  ctaHref: '/',
  promoCode: null as string | null,
} as const;

// Legal entity block — used by any /legal pages and the footer fine print.
// Fill with your real details OR leave as placeholders if you don't ship
// legal pages. Nothing here is required for the template to build.
export const legalEntity = {
  name: 'Your Legal Name or Company',
  type: 'Sole proprietorship',
  owner: 'Your Name',
  address: 'City, Region, Country',
  phone: '',
  email: 'hello@example.com',
  jurisdiction: 'Your jurisdiction',
  arbitrationSeat: 'Your city',
  arbitrationRules: '',
  dataStorageRegion: '',
  paymentProcessor: 'N/A',
  currency: 'USD',
  taxIdLabel: '',
  taxId: '',
} as const;

export type NavItem = (typeof nav)[number];
export type SocialLink = (typeof socialLinks)[number];
