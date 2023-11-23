import { getChatById, getChatMessages } from "@/actions/chat";

import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import EmptyBox from "@/components/dashboard/EmptyBox";

interface props {
    params: { chatId: string; }
}

const ChatIdPage: React.FC<props> = async ({ params }) => {
    const chat = await getChatById(params.chatId);
    const messages = await getChatMessages(params.chatId);

    if (!chat) return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyBox />
            </div>
        </div>
    );

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <ChatHeader chat={chat} />
                <ChatMessages AllChatMessages={messages} />
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatIdPage;