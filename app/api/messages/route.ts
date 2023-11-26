import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/users";
import prisma from "@/lib/prismaClient";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req: Request) => {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { message, image, chatId } = body;

        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized Request", { status: 401 });

        const newMessage = await prisma.message.create({
            include: { seen: true, sender: true },
            data: {
                body: message,
                image: image,
                chat: { connect: { id: chatId } },
                sender: { connect: { id: currentUser.id } },
                seen: { connect: { id: currentUser.id } }
            }
        });

        const updatedChat = await prisma.chat.update({
            where: { id: chatId },
            data: {
                lastMessageAt: new Date(),
                messages: { connect: { id: newMessage.id } }
            },
            include: {
                users: true,
                messages: {
                    include: { seen: true }
                }
            }
        });

        await pusherServer.trigger(chatId, "messages:new", newMessage);
        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];

        updatedChat.users.map((user) => {
            pusherServer.trigger(user.email!, "chat:update", {
                id: chatId,
                messages: [lastMessage]
            });
        });

        return NextResponse.json(newMessage, { status: 200 });
    } catch {
        return new NextResponse("Server Error", { status: 500 });
    }
};