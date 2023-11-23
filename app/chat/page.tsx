"use client";

import EmptyBox from "@/components/dashboard/EmptyBox";
import { cn } from "@/lib/utils";
import useChat from "@/hooks/useChat";

const ChatPage = () => {
    const { isOpen } = useChat();

    return (
        <div className={cn(
            "lg:pl-80 h-full lg:block",
            isOpen ? "block" : "hidden"
        )}>
            <EmptyBox />
        </div>
    );
};

export default ChatPage;