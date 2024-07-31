import { serverClient } from "@/app/utils/email";

export async function POST(request) {
    const res = await request.json();
    const { subject, body, to } = res;

    serverClient.sendEmail({
        "From": 'nicholas.brooks@aya.yale.edu',
        "To": to,
        "Subject": subject,
        "TextBody": body
    })

    return Response.json({ res })
}