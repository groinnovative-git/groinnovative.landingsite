/**
 * Centralized SEO Configuration — Single Source of Truth
 *
 * All SEO URLs derive from VITE_SITE_URL.
 * Set VITE_SEO_ENV=testing on Vercel preview builds to add noindex.
 * Set VITE_SEO_ENV=production when the final .com domain is live.
 */

// ─── Domain ─────────────────────────────────────────────────────
export const BASE_URL =
    (import.meta.env.VITE_SITE_URL || 'https://groinnovative.com').replace(/\/+$/, '')

// ─── Environment Flag ───────────────────────────────────────────
// When true, all pages get noindex,nofollow — prevents Google from
// treating Vercel preview URLs as the real site.
export const IS_TESTING = import.meta.env.VITE_SEO_ENV === 'testing'

// ─── Brand ──────────────────────────────────────────────────────
export const SITE_NAME = 'Groinnovative'
export const BRAND_TAGLINE = 'Groinnovative | Software Development & Digital Solutions'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png`

// ─── Geo (Coimbatore HQ) ───────────────────────────────────────
export const GEO = {
    region: 'IN-TN',
    placename: 'Coimbatore',
    position: '11.0168;76.9558',
    icbm: '11.0168, 76.9558',
    lat: 11.0168,
    lng: 76.9558,
}

// ─── Contact / NAP ──────────────────────────────────────────────
export const NAP = {
    name: 'Groinnovative',
    streetAddress: 'Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    postalCode: '641001',
    country: 'IN',
    phone1: '+919345306018',
    phone2: '+919003343806',
    email: 'groinnovative@gmail.com',
}

// ─── Social Profiles ────────────────────────────────────────────
export const SOCIAL_PROFILES = [
    'https://www.linkedin.com/company/groinnovative',
    'https://www.instagram.com/groinnovative',
    'https://github.com/groinnovative',
    'https://x.com/groinnovative',
]

// ─── Service Areas ──────────────────────────────────────────────
export const SERVICE_AREAS = [
    'Coimbatore', 'Chennai', 'Madurai', 'Tiruchirappalli',
    'Salem', 'Erode', 'Tiruppur', 'Hosur', 'Bengaluru',
    'Tamil Nadu', 'India',
]

// ─── Per-Page SEO Config ────────────────────────────────────────

export const PAGE_SEO = {
    home: {
        title: 'Groinnovative | Digital Solutions & Software Development Company',
        description:
            'Groinnovative builds high-performance websites, custom software, SEO systems, digital marketing campaigns, maintenance workflows, and brand visuals for businesses worldwide.',
        keywords:
            'software development company in Tamil Nadu, software development company in India, website development company in Tamil Nadu, custom software development India, digital marketing company Tamil Nadu, SEO services India',
        path: '/',
    },

    about: {
        title: 'About Groinnovative | Global Digital Solutions Company',
        description:
            'Learn about Groinnovative. We are a digital solutions company helping startups, founders, and enterprises globally to build scalable software, websites, and marketing systems.',
        keywords:
            'about Groinnovative, global software company, worldwide digital solutions, digital growth partner, international software development',
        path: '/about',
    },

    services: {
        title: 'Services | Website, Software, SEO & Digital Marketing Company in India',
        description:
            'Explore Groinnovative services including website creation, custom software development, SEO optimization, digital marketing, site maintenance, logo design, and poster creation for businesses worldwide.',
        keywords:
            'website creation services, software development services, SEO optimization services, digital marketing services, website maintenance, logo design, poster design, global IT services',
        path: '/services',
    },

    contact: {
        title: 'Contact Groinnovative | Website & Software Development Enquiry',
        description:
            'Contact Groinnovative for website creation, software development, SEO optimization, digital marketing, site maintenance, logo design, and poster creation services globally.',
        keywords:
            'contact Groinnovative, global software company contact, website development enquiry, Groinnovative phone number, Groinnovative email',
        path: '/contact',
    },

    notFound: {
        title: 'Page Not Found | Groinnovative',
        description: 'The page you are looking for does not exist or has been moved.',
        keywords: '',
        path: '/404',
        noindex: true,
    },
}
