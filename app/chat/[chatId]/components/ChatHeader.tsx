"use client";

import { ArrowLeftCircle, MoreHorizontal } from "lucide-react";
import { Chat, User } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import ChatAvatar from "@/components/dashboard/ChatAvatar";
import ChatSettings from "./ChatSettings";
import Link from "next/link";
import UserAvatar from "@/components/dashboard/UserAvatar";
import useActiveUsers from "@/hooks/useActiveUsers";
import useChatPartner from "@/hooks/useChatPartner";
import { useMemo } from "react";

interface props {
    chat: Chat & {
        users: User[];
    }
}

const ChatHeader: React.FC<props> = ({ chat }) => {
    const chatPartner = useChatPartner(chat);
    const { members } = useActiveUsers();

    const isActive = members.indexOf(chatPartner?.email!) !== -1;

    const statusText = useMemo(() => {
        if (chat.isGroup) return `${chat.users.length} members`;
        return isActive ? "Online" : "Offline";
    }, [chat, isActive]);

    return (
        <div className=" w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
                <Link
                    href="/chat"
                    className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
                >
                    <ArrowLeftCircle />
                </Link>

                {chat.isGroup ? <ChatAvatar users={chat.users} /> : <UserAvatar user={chatPartner} />}

                <div className="flex flex-col">
                    <div>{chat.name || chatPartner.name}</div>

                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>

            <Sheet>
                <SheetTrigger>
                    <MoreHorizontal className="text-sky-500 cursor-pointer hover:text-sky-600 transition" />
                </SheetTrigger>

                <SheetContent>
                    <ChatSettings chat={chat} />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ChatHeader;