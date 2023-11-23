"use client";

import ChatItem from "./ChatItem";
import { MessageSquarePlus } from "lucide-react";
import { PopulatedChatType } from "@/types/messages";
import { cn } from "@/lib/utils";
import useChat from "@/hooks/useChat";
import { useState } from "react";

interface props {
    chatList: PopulatedChatType[];
}

const Chats: React.FC<props> = ({ chatList }) => {
    const [chats] = useState(chatList);
    const { chatId, isOpen } = useChat();

    return (
        <aside
            className={cn(
                `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r-[1px]`,
                isOpen ? "hidden" : "block w-full left-0 bg-red"
            )}
        >
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold">
                        Chats
                    </div>

                    <div className="rounded-full p-2  cursor-pointer hover:opacity-75 transition">
                        <MessageSquarePlus />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {chats.map((item) => (
                        <ChatItem
                            key={item.id}
                            chat={item}
                            isSelected={chatId === item.id}
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Chats;