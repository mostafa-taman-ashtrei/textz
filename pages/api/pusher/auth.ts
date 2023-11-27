import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/lib/pusher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) return res.status(401);

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const data = { user_id: session.user.email };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return res.send(authResponse);
};

export default handler;