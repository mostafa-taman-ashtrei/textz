"use client";

import { ArrowLeftCircle, MoreHorizontal } from "lucide-react";
import { Chat, User } from "@prisma/client";

import Link from "next/link";
import UserAvatar from "@/components/dashboard/UserAvatar";
import useChatPartner from "@/hooks/useChatPartner";

interface props {
    chat: Chat & {
        users: User[];
    }
}

const ChatHeader: React.FC<props> = ({ chat }) => {
    const chatPartner = useChatPartner(chat);

    return (
        <div
            className=" w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm"
        >
            <div className="flex gap-3 items-center">
                <Link
                    href="/chat"
                    className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
                >
                    <ArrowLeftCircle />
                </Link>

                <UserAvatar user={chatPartner} />

                <div className="flex flex-col">
                    <div>{chat.name || chatPartner.name}</div>
                </div>
            </div>

            <MoreHorizontal
                className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
            />
        </div>
    );
};

export default ChatHeader;