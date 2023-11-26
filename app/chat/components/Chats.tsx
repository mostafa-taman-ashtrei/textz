"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import ChatItem from "./ChatItem";
import GroupChatForm from "./GroupChatForm";
import { PopulatedChatType } from "@/types/messages";
import { User } from "@prisma/client";
import { UserPlus2 } from "lucide-react";
import { cn } from "@/lib/utils";
import useChat from "@/hooks/useChat";
import { useState } from "react";

interface props {
    chatList: PopulatedChatType[];
    userList: User[] | null;
}

const Chats: React.FC<props> = ({ chatList, userList }) => {
    const [chats] = useState(chatList);
    const { chatId, isOpen } = useChat();

    return (
        <>
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

                        <Dialog>
                            <DialogTrigger>
                                <div className="rounded-md p-1 bg-gray-200 dark:bg-gray-800 cursor-pointer hover:opacity-75 transition">
                                    <UserPlus2 />
                                </div>
                            </DialogTrigger>

                            <DialogContent className="items-center justify-center w-full">
                                <GroupChatForm userList={userList === null ? [] : userList} />
                            </DialogContent>
                        </Dialog>
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
        </>
    );
};

export default Chats;