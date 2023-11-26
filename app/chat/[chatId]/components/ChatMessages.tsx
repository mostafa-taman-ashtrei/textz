"use client";

import { useEffect, useRef, useState } from "react";

import ChatMessage from "./ChatMessage";
import { PopulatedMessageType } from "@/types/messages";
import axios from "axios";
import useChat from "@/hooks/useChat";

interface props {
    AllChatMessages: PopulatedMessageType[];
}

const ChatMessages: React.FC<props> = ({ AllChatMessages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages] = useState(AllChatMessages);
    const { chatId } = useChat();

    useEffect(() => { axios.post(`/api/chat/${chatId}/seen`); }, [chatId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <ChatMessage
                    isLast={i === messages.length - 1}
                    key={message.id}
                    message={message}
                />
            ))}

            <div className="pt-24" ref={bottomRef} />
        </div>
    );
};

export default ChatMessages;