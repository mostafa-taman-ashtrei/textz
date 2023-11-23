import Chats from "./components/Chats";
import DashboardNav from "@/components/navigation/DashboardNav";
import type { Metadata } from "next";
import { getChatList } from "@/actions/chat";

export const metadata: Metadata = {
    title: "TextZ | Chat",
    description: "The best chat app on the internet.",
};

interface props {
    children: React.ReactNode;
}

const ChatLayout: React.FC<props> = async ({ children }) => {
    const chatList = await getChatList();

    return (
        <DashboardNav>
            <div className="h-full">
                <Chats chatList={chatList} />
                {children}
            </div>
        </DashboardNav>
    );
};

export default ChatLayout;