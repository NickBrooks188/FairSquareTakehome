import { serverClient } from "@/app/utils/email";

export async function POST(request) {
    const res = await request.json();
    const { subject, body, to, tag } = res;

    const emails = [];

    for (let recipient of to) {
        emails.push({
            "From": 'nicholas.brooks@aya.yale.edu',
            "To": recipient,
            "Subject": subject,
            "HTMLBody": body,
            "TrackOpens": true,
            "Tag": tag
        });
    }

    serverClient.sendEmailBatch(emails)

    return Response.json({ res })
}