'use client';

export function PersonStructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Danny Stuart',
        jobTitle: 'Product Designer',
        url: 'https://dannystuart.com',
        sameAs: [
            'https://www.threads.net/@dannystuart',
        ],
        description: 'Product Designer crafting beautiful interfaces and AI-powered experiences. Creator of Materials, AI x Design newsletter, and Theta.',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

export function WebsiteStructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Danny Stuart',
        url: 'https://dannystuart.com',
        description: 'Product Designer portfolio showcasing AI-powered design experiments and innovative products.',
        author: {
            '@type': 'Person',
            name: 'Danny Stuart',
            jobTitle: 'Product Designer',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
