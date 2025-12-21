import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PersonStructuredData, WebsiteStructuredData } from "@/components/StructuredData";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://dannystuart.com'),
    title: {
        default: 'Danny Stuart | Product Designer',
        template: '%s | Danny Stuart',
    },
    description: 'Product Designer crafting beautiful interfaces and AI-powered experiences. Creator of Materials, AI x Design newsletter, and Theta.',
    keywords: ['Product Designer', 'Product Design', 'AI Design', 'UI/UX', 'Danny Stuart', 'Design Engineer', 'Materials', 'Theta'],
    authors: [{ name: 'Danny Stuart' }],
    creator: 'Danny Stuart',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://dannystuart.com',
        siteName: 'Danny Stuart',
        title: 'Danny Stuart | Product Designer',
        description: 'Product Designer crafting beautiful interfaces and AI-powered experiences.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Danny Stuart - Product Designer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Danny Stuart | Product Designer',
        description: 'Product Designer crafting beautiful interfaces and AI-powered experiences.',
        creator: '@dannystuart',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/icon.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${playfair.variable} antialiased bg-gray-50 text-slate-900`}
            >
                <PersonStructuredData />
                <WebsiteStructuredData />
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
