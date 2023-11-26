import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { PopulatedMessageType } from "@/types/messages";
import { Skeleton } from "@/components/ui/skeleton";
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

    if (session.status === "loading") return <Skeleton className=" mx-2 my-1 h-[40px] rounded-md" />;

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
                <div
                    className={
                        cn(
                            "text-sm w-fit overflow-hidden text-white",
                            isMyMessage ? "bg-sky-500" : "bg-green-500 ",
                            message.image ? "rounded-md p-0 bg-transparent" : "rounded-full py-2 px-3"
                        )
                    }
                >
                    {
                        message.image
                            ? <Dialog>
                                <DialogTrigger>
                                    <Image
                                        alt="Image"
                                        height="288"
                                        width="288"
                                        src={message.image}
                                        className="object-cover cursor-pointer hover:scale-110 transition translate"
                                    />
                                </DialogTrigger>

                                <DialogContent className="h-5/6 w-5/6 items-center justify-center">
                                    <Image
                                        alt="Image"
                                        height="500"
                                        width="500"
                                        src={message.image}
                                    />
                                </DialogContent>
                            </Dialog>

                            : <div>{message.body}</div>
                    }
                </div>

                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {message.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(message.createdAt), "p")}
                    </div>
                </div>

                {isLast && isMyMessage && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500 flex flex-row gap-2 items-center justify-center">
                        <CheckCheck className="w-4 h-4" />
                        {seenList}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;