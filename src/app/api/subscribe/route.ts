import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
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
                email: email,
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
