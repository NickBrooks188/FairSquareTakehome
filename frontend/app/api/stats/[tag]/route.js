import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const tag = params.tag;
    const res = await fetch(`https://api.postmarkapp.com/stats/outbound?tag=${tag}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN,
        }
    });
    const data = await res.json();
    return NextResponse.json(data);
}