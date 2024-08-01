import { NextResponse } from "next/server";


export async function GET(request) {
    const res = await fetch('https://api.postmarkapp.com/messages/outbound/opens?recipient=nicholas.brooks@aya.yale.edu&count=50&offset=0', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN || '',
        }
    });
    const data = await res.json();
    return NextResponse.json(data);
}