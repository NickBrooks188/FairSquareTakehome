import { serverClient } from "@/app/utils/email";

export async function POST(request) {
    const res = await request.json();
    const { subject, body, to, tag } = res;

    serverClient.sendEmail({
        "From": 'nicholas.brooks@aya.yale.edu',
        "To": to,
        "Subject": subject,
        "HTMLBody": body,
        "TrackOpens": true,
        "Tag": tag
    })

    return Response.json({ res })
}