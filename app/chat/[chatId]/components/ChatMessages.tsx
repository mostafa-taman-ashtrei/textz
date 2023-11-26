"use client";

import { useEffect, useRef, useState } from "react";

import ChatMessage from "./ChatMessage";
import { PopulatedMessageType } from "@/types/messages";
import axios from "axios";
import { find } from "lodash";
import { pusherClient } from "@/lib/pusher";
import useChat from "@/hooks/useChat";

interface props {
    AllChatMessages: PopulatedMessageType[];
}

const ChatMessages: React.FC<props> = ({ AllChatMessages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(AllChatMessages);
    const { chatId } = useChat();

    useEffect(() => { axios.post(`/api/chat/${chatId}/seen`); }, [chatId]);

    useEffect(() => {
        pusherClient.subscribe(chatId);
        bottomRef?.current?.scrollIntoView(); // ** scroll to the bottom on every new message

        // ** Add new message to the state
        const newMessageHandler = (message: PopulatedMessageType) => {
            axios.post(`/api/chat/${chatId}/seen`);

            setMessages((prev) => {
                if (find(prev, { id: message.id })) return prev;
                return [...prev, message];
            });

            bottomRef?.current?.scrollIntoView();
        };

        // ** Updated the seen status for new messages
        const updateMessageHandler = (newMessage: PopulatedMessageType) => {
            setMessages((prev) => prev.map((prevMessage) => {
                if (prevMessage.id === newMessage.id) return newMessage;
                return prevMessage;
            }));
        };

        pusherClient.bind("messages:new", newMessageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(chatId);
            pusherClient.unbind("messages:new", newMessageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        };
    }, [chatId]);


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