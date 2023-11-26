import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/actions/users";
import prisma from "@/lib/prismaClient";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req: Request) => {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser.email) return new NextResponse("Uauthorized Request", { status: 401 });

        if (isGroup && (!members || members.length < 2 || !name)) return new NextResponse("Missing Data", { status: 400 });


        if (isGroup) {
            const newChat = await prisma.chat.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({ id: member.value })),
                            { id: currentUser.id }
                        ]
                    }
                },
                include: { users: true }
            });

            newChat.users.forEach((user: User) => {
                if (user.email) {
                    pusherServer.trigger(user.email, "chat:new", newChat);
                }
            });

            return NextResponse.json(newChat, { status: 200 });
        }

        //** find existing chats between the logged in user and another user (one on one chat)
        //** Find Unique does not work properly with this query so instead use findMany & extract the first item in the array
        const existingChats = await prisma.chat.findMany({
            where: {
                OR: [
                    { userIds: { equals: [currentUser.id, userId] } },
                    { userIds: { equals: [userId, currentUser.id] } }
                ]
            }
        });

        if (existingChats[0]) return NextResponse.json(existingChats[0], { status: 200 });

        const newChat = await prisma.chat.create({
            data: {
                users: {
                    connect: [
                        { id: currentUser.id },
                        { id: userId }
                    ]
                }
            },
            include: { users: true }
        });

        newChat.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, "chat:new", newChat);
            }
        });

        return NextResponse.json(newChat, { status: 200 });
    } catch {
        return new NextResponse("Server Error", { status: 500 });
    }
};