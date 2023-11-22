import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { User } from "@prisma/client";

interface props {
    user: User | null;
}

const UserAvatar: React.FC<props> = ({ user }) => {
    const profileImage = {
        src: user === null || user.image === null ? "" : user.image,
        fallback: user === null || user.name === null ? "NU" : user.name.toUpperCase().match(/\b(\w)/g)
    };

    return (
        <Avatar>
            <AvatarImage src={profileImage.src} />
            <AvatarFallback>{profileImage.fallback}</AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;