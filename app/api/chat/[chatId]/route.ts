import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/users";
import prisma from "@/lib/prismaClient";
import { pusherServer } from "@/lib/pusher";

interface ParamType {
    chatId?: string;
}


export const DELETE = async (req: Request, { params }: { params: ParamType }) => {
    try {
        const { chatId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) return NextResponse.json(null);

        const existingChat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { users: true }
        });

        if (!existingChat) return new NextResponse("Invalid Chat ID", { status: 400 });

        const deletedChat = await prisma.chat.deleteMany({
            where: {
                id: chatId,
                userIds: { hasSome: [currentUser.id] }
            },
        });

        existingChat.users.forEach((user) => {
            if (user.email) pusherServer.trigger(user.email, "chat:remove", existingChat);
        });

        return NextResponse.json(deletedChat);
    } catch (error) {
        return NextResponse.json(null);
    }
};