import { NextResponse } from "next/server";


export async function GET(request) {
    const tag = await request.nextUrl.searchParams.get('tag');

    if (tag === "All") {
        const res = await fetch('https://api.postmarkapp.com/messages/outbound/opens?count=50&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN,
            }
        });
        const data = await res.json();
        return NextResponse.json(data);
    } else {
        const res = await fetch(`https://api.postmarkapp.com/messages/outbound/opens?count=50&offset=0&tag=${tag}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN,
            }
        });
        const data = await res.json();
        return NextResponse.json(data);
    }
}