import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/users";
import prisma from "@/lib/prismaClient";

interface paramsType {
    chatId?: string;
}

export const POST = async (req: Request, { params }: { params: paramsType }) => {
    try {
        const currentUser = await getCurrentUser();
        const { chatId } = params;


        if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthorized Request", { status: 401 });

        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: {
                messages: {
                    include: { seen: true }
                },
                users: true,
            },
        });

        if (!chat) return new NextResponse("Invalid Chat ID", { status: 400 });

        const lastMessage = chat.messages[chat.messages.length - 1];
        if (!lastMessage) return NextResponse.json(chat);

        await prisma.message.update({
            where: { id: lastMessage.id },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: { connect: { id: currentUser.id } }
            }
        });

        // ** If user has already seen the message, no need to go further
        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) return NextResponse.json(chat);

        return new NextResponse("Request Completed Successfully", { status: 200 });
    } catch {
        return new NextResponse("Failed to updated seen status", { status: 500 });
    }
};