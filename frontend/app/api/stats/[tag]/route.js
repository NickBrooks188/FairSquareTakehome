import { NextResponse } from "next/server";


export async function GET(request) {
    const tag = await request.nextUrl.searchParams.get('tag');
    if (tag === "All") {
        console.log("Here")
        const res = await fetch('https://api.postmarkapp.com/stats/outbound', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN,
            }
        });
        const data = await res.json();
        return NextResponse.json(data);
    } else {
        const res = await fetch(`https://api.postmarkapp.com/stats/outbound?tag=${tag}`, {
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