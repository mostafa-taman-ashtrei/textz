"use client";

import { useCallback, useState } from "react";

import { MoreHorizontal } from "lucide-react";
import { User } from "@prisma/client";
import UserAvatar from "@/components/dashboard/UserAvatar";
import axios from "axios";
import { useRouter } from "next/navigation";

interface props {
    user: User;
}

const UserListItem: React.FC<props> = ({ user }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await axios.post("/api/chats", { userId: user.id });
            if (response.status === 200) router.push(`/chat/${response.data.id}`);
        } catch {
            throw new Error("Failed to  fetch chat");
        } finally {
            setIsLoading(false);
        }
    }, [user, router]);

    return (
        <div
            className="w-full relative flex items-center space-x-3  text-white p-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
            onClick={handleClick}
        >
            <UserAvatar user={user} />

            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </p>
                    </div>
                </div>
            </div>

            {isLoading && <MoreHorizontal className="animate-bounce" />}
        </div>
    );
};

export default UserListItem;