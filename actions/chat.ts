import { getCurrentUser } from "./users";
import prisma from "@/lib/prismaClient";

export const getChatList = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) return [];


        const chats = await prisma.chat.findMany({
            orderBy: { lastMessageAt: "desc" },
            where: { userIds: { has: currentUser.id } },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true, seen: true
                    }
                },
            }
        });

        return chats;
    } catch {
        return [];
    }
};


export const getChatById = async (chatId: string) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.email) return null;


        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: { users: true }
        });

        return chat;
    } catch {
        return null;
    }
};

export const getChatMessages = async (chatId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: { chatId },
            include: { sender: true, seen: true },
            orderBy: { createdAt: "asc" }
        });

        return messages;
    } catch {
        return [];
    }
};