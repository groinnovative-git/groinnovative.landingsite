/**
 * JSON-LD Schema Definitions for Groinnovative
 *
 * All structured data schemas used across the site.
 * Schemas reference seoConfig for consistency.
 */

import {
    BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE,
    GEO, NAP, SOCIAL_PROFILES, SERVICE_AREAS,
} from './seoConfig'

// ─── Organization ───────────────────────────────────────────────
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Gro Innovative',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.png`,
    image: DEFAULT_OG_IMAGE,
    description:
        'Groinnovative is a software development and digital services company based in Coimbatore, Tamil Nadu, serving businesses across Tamil Nadu and India with website creation, custom software, SEO, digital marketing, maintenance, and branding solutions.',
    foundingDate: '2024',
    founder: {
        '@type': 'Person',
        name: 'Groinnovative Team',
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.postalCode,
        addressCountry: NAP.country,
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: NAP.phone1,
            contactType: 'customer service',
            email: NAP.email,
            areaServed: [
                { '@type': 'State', name: 'Tamil Nadu' },
                { '@type': 'Country', name: 'India' },
            ],
            availableLanguage: ['English', 'Tamil'],
        },
    ],
    sameAs: SOCIAL_PROFILES,
}

// ─── LocalBusiness (SoftwareCompany) ────────────────────────────
export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    alternateName: 'Gro Innovative',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.png`,
    image: DEFAULT_OG_IMAGE,
    description:
        'Software development and digital services company in Coimbatore, Tamil Nadu, offering website creation, custom software development, SEO optimization, digital marketing, website maintenance, and branding for businesses across Tamil Nadu and India.',
    telephone: NAP.phone1,
    email: NAP.email,
    priceRange: '₹₹',
    address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.streetAddress,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.postalCode,
        addressCountry: NAP.country,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: GEO.lat,
        longitude: GEO.lng,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
    },
    areaServed: [
        ...SERVICE_AREAS.filter(a => a !== 'Tamil Nadu' && a !== 'India').map(city => ({
            '@type': 'City',
            name: city,
        })),
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
    ],
    sameAs: SOCIAL_PROFILES,
}

// ─── WebSite (no SearchAction — site has no search feature) ─────
export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    logo: `${BASE_URL}/og-default.png`,
    description: 'Groinnovative is a software development and digital services company helping businesses worldwide build websites, custom software, SEO systems, digital marketing campaigns, maintenance workflows, and brand visuals.',
    address: { '@id': BASE_URL },
}

// ─── BreadcrumbList (per-page) ──────────────────────────────────
export function breadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${BASE_URL}${item.path}`,
        })),
    }
}

// ─── Service Schemas ────────────────────────────────────────────
export const serviceSchemas = [
    {
        name: 'Website Creation',
        description: 'High-performance business websites, landing pages, and ecommerce platforms built with modern UI, SEO-ready structure, and responsive design for businesses worldwide.',
    },
    {
        name: 'Software Development',
        description: 'Custom web applications, admin dashboards, CRM systems, and scalable software solutions with clean architecture and production-ready delivery globally.',
    },
    {
        name: 'SEO Optimization',
        description: 'Technical SEO, on-page optimization, keyword strategy, and Google visibility improvements for businesses worldwide.',
    },
    {
        name: 'Digital Marketing',
        description: 'Lead generation campaigns, Google Ads, Meta Ads, social media marketing, and conversion-focused digital marketing for brands globally.',
    },
    {
        name: 'Website Maintenance',
        description: 'Ongoing website maintenance including security updates, performance optimization, bug fixes, backups, and uptime monitoring worldwide.',
    },
    {
        name: 'Logo & Poster Creation',
        description: 'Professional logo design, brand identity, poster design, and social media creatives for businesses globally.',
    },
].map(svc => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: svc.name,
    name: `${svc.name} — ${SITE_NAME}`,
    description: svc.description,
    provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
    },
    areaServed: [
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Coimbatore' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Trichy' },
        { '@type': 'City', name: 'Salem' },
        { '@type': 'City', name: 'Erode' },
        { '@type': 'City', name: 'Tiruppur' },
        { '@type': 'City', name: 'Hosur' },
        { '@type': 'City', name: 'Bengaluru' },
    ],
}))

// ─── Home FAQ Schema ─────────────────────────────────────────────
export const faqData = [
    {
        q: 'What services does Groinnovative provide?',
        a: 'Groinnovative provides website creation, custom software development, SEO optimization, digital marketing, website maintenance, logo design, and poster creation for businesses worldwide.',
    },
    {
        q: 'Does Groinnovative build custom software?',
        a: 'Yes. Groinnovative builds custom software such as admin panels, dashboards, business portals, CRM systems, ERP systems, booking systems, and automation tools based on client requirements.',
    },
    {
        q: 'Does Groinnovative provide SEO services?',
        a: 'Yes. Groinnovative provides technical SEO, on-page SEO, keyword planning, indexing support, sitemap setup, and search-friendly website structure to improve Google visibility.',
    },
    {
        q: 'Does Groinnovative provide website maintenance?',
        a: 'Yes. Groinnovative supports website updates, bug fixes, backups, speed optimization, security checks, hosting support, and monthly maintenance to keep your site running smoothly.',
    },
    {
        q: 'Where does Groinnovative provide services?',
        a: 'Groinnovative is a global digital services company supporting clients worldwide with web development, software, and marketing solutions.',
    },
    {
        q: 'How much does website development cost?',
        a: 'Website development cost depends on the number of pages, design complexity, features, domain, hosting, content, forms, payment gateway, and support requirements. Contact Groinnovative for a project-specific estimate.',
    },
    {
        q: 'How long does it take to build a website?',
        a: 'The timeline depends on the project scope. A simple business website can be completed in a few weeks, while ecommerce websites, custom software, or feature-rich platforms may take more time depending on complexity.',
    },
    {
        q: 'Can Groinnovative build both website and SEO setup?',
        a: 'Yes. Groinnovative can build a responsive business website with SEO-ready structure, technical setup, sitemap, indexing support, and search-friendly page content — all in one project.',
    },
]

export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
}

// ─── Services FAQ Schema ──────────────────────────────────────────
export const servicesFaqData = [
    {
        q: 'What is included in custom software development?',
        a: 'Groinnovative custom software development includes admin panels, dashboards, CRM systems, ERP systems, booking systems, billing systems, customer portals, and business automation software built for your specific needs.',
    },
    {
        q: 'How much does a business website cost?',
        a: 'Website development cost depends on the number of pages, design complexity, features, domain, hosting, and support requirements. Contact Groinnovative for an exact quotation tailored to your business.',
    },
    {
        q: 'Can I get website maintenance after launch?',
        a: 'Yes. Groinnovative provides ongoing website maintenance after launch. This includes website updates, bug fixing, backups, speed optimization, security checks, and hosting support to keep your site reliable.',
    },
    {
        q: 'Why is SEO important for business websites?',
        a: 'SEO is important because it improves your Google ranking and website visibility. Groinnovative provides technical SEO, on-page SEO, local SEO, keyword planning, sitemap setup, and indexing support to generate organic leads.',
    },
    {
        q: 'Do you create logos and branding materials?',
        a: 'Groinnovative provides professional logo design, business posters, social media creatives, banners, flyers, and brochures to establish a strong brand identity for businesses globally.',
    },
]

export const servicesFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: servicesFaqData.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
}

// ─── About/GEO FAQ Schema ──────────────────────────────────────────
export const aboutFaqData = [
    {
        q: 'What is Groinnovative?',
        a: 'Groinnovative is a software development and digital services company serving businesses worldwide. The company provides website creation, custom software development, SEO, digital marketing, maintenance, logo design, and poster creation.',
    },
    {
        q: 'What services does Groinnovative provide?',
        a: 'Groinnovative provides website creation, software development, SEO optimization, digital marketing, site maintenance, logo design, and poster creation for businesses that need digital growth and online presence.',
    },
    {
        q: 'Does Groinnovative provide custom software development?',
        a: 'Yes. Groinnovative develops custom software such as admin panels, dashboards, portals, CRM systems, ERP systems, booking systems, billing systems, and business automation tools.',
    },
    {
        q: 'Where does Groinnovative provide services?',
        a: 'Groinnovative is a global digital services company supporting clients worldwide. We are not limited by geography and provide software and marketing solutions internationally.',
    },
    {
        q: 'Can Groinnovative handle both website and SEO?',
        a: 'Yes. Groinnovative can build responsive websites with SEO-ready structure, technical SEO setup, sitemap support, indexing guidance, and search-friendly content.',
    },
    {
        q: 'Can Groinnovative support after website launch?',
        a: 'Yes. Groinnovative provides site maintenance services such as updates, bug fixes, backup, security checks, speed optimization, hosting support, and monthly maintenance.',
    },
]

export const aboutFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: aboutFaqData.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
}
