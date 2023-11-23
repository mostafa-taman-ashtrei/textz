import { CheckCheck } from "lucide-react";
import { PopulatedChatType } from "@/types/messages";
import UserAvatar from "@/components/dashboard/UserAvatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import useChatPartner from "@/hooks/useChatPartner";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

interface props {
  chat: PopulatedChatType;
  isSelected: boolean;
}

const ChatItem: React.FC<props> = ({ chat, isSelected }) => {
  const chatPartner = useChatPartner(chat);
  const session = useSession();

  const lastMessage = useMemo(() => {
    const messages = chat.messages || [];
    return messages[messages.length - 1];
  }, [chat.messages]);

  const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);


  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage?.body;

    return "Chat Started";
  }, [lastMessage]);


  return (
    <div
      className={cn(
        `w-full relative flex items-center space-x-3 p-3 rounded-xl transition cursor-pointer`,
        isSelected ? "bg-sky-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
      )}
    >
      <UserAvatar user={chatPartner} />

      <div className="min-w-0 flex-1 ">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium">
              {chat.name || chatPartner.name}
            </p>

            {
              lastMessage?.createdAt && <p className="text-xs font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            }
          </div>

          <p className="flex flex-row gap-1 items-center truncate text-sm">
            {hasSeen && <CheckCheck className="h-4 w-4" />}
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;