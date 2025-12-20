import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5; // 5 requests per minute

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (record.count >= maxRequests) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: Request) {
    try {
        // Get IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Rate limiting check
        if (!rateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const { email, honeypot } = await request.json();

        // Honeypot check - if filled, it's a bot
        if (honeypot) {
            // Silently reject spam
            return NextResponse.json({ success: true });
        }

        // Email validation
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Additional email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const API_KEY = process.env.MAILERLITE_API_TOKEN;
        const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

        if (!API_KEY || !GROUP_ID) {
            console.error('Missing MailerLite configuration');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                email: email.trim().toLowerCase(),
                groups: [GROUP_ID],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('MailerLite API Error:', errorData);
            return NextResponse.json(
                { error: 'Failed to subscribe' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
