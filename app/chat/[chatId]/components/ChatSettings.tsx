import { Chat, User } from "@prisma/client";
import { MoreHorizontal, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import ChatAvatar from "@/components/dashboard/ChatAvatar";
import UserAvatar from "@/components/dashboard/UserAvatar";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import useActiveUsers from "@/hooks/useActiveUsers";
import useChat from "@/hooks/useChat";
import useChatPartner from "@/hooks/useChatPartner";
import { useRouter } from "next/navigation";

interface props {
    chat: Chat & {
        users: User[]
    }
}
const ChatSettings: React.FC<props> = ({ chat }) => {
    const chatPartner = useChatPartner(chat);
    const { chatId } = useChat();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const title = useMemo(() => {
        return chat.name || chatPartner.name;
    }, [chat.name, chatPartner.name]);

    const { members } = useActiveUsers();
    const isActive = members.indexOf(chatPartner?.email!) !== -1;

    const statusText = useMemo(() => {
        if (chat.isGroup) return `${chat.users.length} members`;

        return isActive ? "Online" : "Offline";
    }, [chat, isActive]);


    const joinedDate = useMemo(() => {
        return format(new Date(chatPartner.createdAt), "PP");
    }, [chatPartner.createdAt]);

    const createdOn = useMemo(() => {
        return format(new Date(chat.createdAt), "PP");
    }, [chat.createdAt]);


    const handleDelete = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/chat/${chatId}`);
            router.push("/chat");
        } catch {
            toast({ title: "Something went wrong ... try again later", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }, [router, chatId]);

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col items-center gap-2">
                <div className="mb-2">
                    {chat.isGroup ? <ChatAvatar users={chat.users} /> : <UserAvatar user={chatPartner} />}
                </div>

                <h3>
                    {title}
                </h3>

                <div className="text-sm text-gray-500">
                    {statusText}
                </div>

                <div className="w-full">
                    <dl className="space-y-6">
                        {
                            chat.isGroup && <div>
                                <span className="text-sm font-medium sm:w-40 sm:flex-shrink-0">
                                    Members
                                </span>

                                <p className="text-sm sm:col-span-2 text-gray-500">
                                    {chat.users.map((user) => user.name).join(", ")}
                                </p>
                            </div>
                        }

                        {!chat.isGroup && (
                            <div>
                                <dt className="text-sm font-medium sm:w-40 sm:flex-shrink-0">
                                    User Email
                                </dt>
                                <p className="mt-1 text-sm sm:col-span-2 text-gray-500">
                                    {chatPartner.email}
                                </p>
                            </div>
                        )}

                        <hr />

                        <div>
                            <dt className="text-sm font-medium sm:w-40 sm:flex-shrink-0">
                                {chat.isGroup ? "Created On" : "Joined On"}
                            </dt>

                            <p className="mt-1 text-sm sm:col-span-2 text-gray-500">
                                <time dateTime={chat.isGroup ? createdOn : joinedDate}>
                                    {chat.isGroup ? createdOn : joinedDate}
                                </time>
                            </p>
                        </div>
                    </dl>
                </div>
            </div>

            <Button
                className="w-full flex flex-row justify-center gap-1"
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
            >
                {
                    isLoading
                        ? <MoreHorizontal className="animate-bounce" />

                        : <>
                            <Trash className="w-4 h-4" />
                            Delete Chat
                        </>
                }
            </Button>
        </div>
    );
};

export default ChatSettings;