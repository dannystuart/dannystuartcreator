import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <div className="text-center p-8">
                <h1 className="font-serif italic text-6xl md:text-8xl mb-4 text-white">404</h1>
                <p className="text-slate-400 text-xl mb-8">Page not found</p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-slate-100 transition-colors"
                >
                    Return Home
                </a>
            </div>
        </div>
    );
}
