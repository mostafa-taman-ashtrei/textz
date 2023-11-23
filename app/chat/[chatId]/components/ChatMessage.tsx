import { PopulatedMessageType } from "@/types/messages";
import UserAvatar from "@/components/dashboard/UserAvatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface props {
    message: PopulatedMessageType;
    isLast: boolean;
}
const ChatMessage: React.FC<props> = ({ message, isLast }) => {
    const session = useSession();

    const isMyMessage = session.data?.user?.email === message?.sender?.email;

    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name)
        .join(", ");

    return (
        <div className={cn("flex gap-3 p-4", isMyMessage && "justify-end")}>
            <div className={cn(isMyMessage && "order-2")}>
                <UserAvatar user={message.sender} />
            </div>

            <div className={cn("flex flex-col gap-2", isMyMessage && "items-end")}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {message.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(message.createdAt), "p")}
                    </div>
                </div>

                <div
                    className={
                        cn(
                            "text-sm w-fit overflow-hidden",
                            isMyMessage ? "bg-sky-500 text-white" : "bg-gray-100",
                            message.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
                        )
                    }
                >
                    <div>{message.body}</div>
                </div>

                {isLast && isMyMessage && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;