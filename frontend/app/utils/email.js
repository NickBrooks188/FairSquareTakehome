var postmark = require("postmark");
const serverClient = new postmark.ServerClient(process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN);

export { serverClient }