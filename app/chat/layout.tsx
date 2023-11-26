import Chats from "./components/Chats";
import DashboardNav from "@/components/navigation/DashboardNav";
import type { Metadata } from "next";
import { getChatList } from "@/actions/chat";
import { getUserList } from "@/actions/users";

export const metadata: Metadata = {
    title: "TextZ | Chat",
    description: "The best chat app on the internet.",
};

interface props {
    children: React.ReactNode;
}

const ChatLayout: React.FC<props> = async ({ children }) => {
    const chatList = await getChatList();
    const userList = await getUserList();

    return (
        <DashboardNav>
            <div className="h-full">
                <Chats
                    chatList={chatList}
                    userList={userList}
                />
                {children}
            </div>
        </DashboardNav>
    );
};

export default ChatLayout;