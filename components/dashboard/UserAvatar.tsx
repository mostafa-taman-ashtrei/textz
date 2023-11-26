import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { User } from "@prisma/client";
import useActiveUsers from "@/hooks/useActiveUsers";

interface props {
    user: User | null;
}

const UserAvatar: React.FC<props> = ({ user }) => {
    const { members } = useActiveUsers();
    const isActive = members.indexOf(user?.email!) !== -1;

    const profileImage = {
        src: user === null || user.image === null ? "" : user.image,
        fallback: user === null || user.name === null ? "NU" : user.name.toUpperCase().match(/\b(\w)/g)
    };

    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Avatar>
                    <AvatarImage src={profileImage.src} />
                    <AvatarFallback>{profileImage.fallback}</AvatarFallback>
                </Avatar>
            </div>

            {isActive && <span className="absolute block rounded-full bg-green-500  top-0 right-0 h-2 w-2 md:h-3 md:w-3" />}
        </div>
    );
};

export default UserAvatar;