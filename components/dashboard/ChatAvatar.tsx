import Image from "next/image";
import { User } from "@prisma/client";

interface props {
    users: User[];
}

const ChatAvatar: React.FC<props> = ({ users }) => {
    const slicedUsers = users.slice(0, 3);

    const positionMap = {
        0: "top-0 left-[12px]",
        1: "bottom-0",
        2: "bottom-0 right-0"
    };

    return (
        <div className="relative h-11 w-11">
            {slicedUsers.map((user, index) => (
                <div
                    key={user.id}
                    className={`absolute inline-block rounded-full overflow-hidden h-[20px] w-[20px] ${positionMap[index as keyof typeof positionMap]}`}
                >
                    <Image
                        fill
                        src={user?.image || "/images/avatar.png"}
                        alt="Avatar"
                    />
                </div>
            ))}
        </div>
    );
};

export default ChatAvatar;