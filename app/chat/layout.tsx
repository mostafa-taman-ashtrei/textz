import DashboardNav from "@/components/navigation/DashboardNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TextZ",
    description: "The best chat app on the internet.",
};

interface props {
    children: React.ReactNode;
}

const ChatLayout: React.FC<props> = ({ children }) => {

    return (
        <DashboardNav>
            <div className="h-full">
                {children}
            </div>
        </DashboardNav>
    );
};

export default ChatLayout;