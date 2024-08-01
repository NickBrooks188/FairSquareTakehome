import { NextResponse } from "next/server";


export async function POST(request) {
    const req = await request.json();
    const tag = req.tag;

    if (tag === "All") {
        const res = await fetch('https://api.postmarkapp.com/messages/outbound/opens?count=50&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN,
            }
        });
        const data = await res.json();
        console.log(data)
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