"use client";

import { Cog, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

import NavItem from "./NavItem";
import ThemeTogglerButton from "./ThemeTogglerButton";
import { User } from "@prisma/client";
import UserAvatar from "../dashboard/UserAvatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRoutes from "@/hooks/useRoutes";

interface props {
    currentUser: User | null;
}

const Sidebar: React.FC<props> = ({ currentUser }) => {
    const routes = useRoutes();
    const router = useRouter();

    const handleUserMenuclick = (item: "settings" | "logout") => {
        if (item === "settings") router.push("/dashboard/settings");
        if (item === "logout") signOut();
    };

    return (
        <div
            className="
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:w-20
            xl:px-6
            lg:overflow-y-auto
            lg:bg-white
            lg:dark:bg-black
            lg:border-r-[1px]
            lg:pb-4
            lg:flex
            lg:flex-col
            justify-between
          "
        >
            <nav className="mt-4 flex flex-col justify-between">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {routes.map((item) => (
                        <NavItem
                            key={item.name}
                            href={item.href}
                            name={item.name}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                            isMobile={false}
                        />
                    ))}
                </ul>
            </nav>
            <nav className="mt-4 flex flex-col gap-2 justify-between items-center">
                <ThemeTogglerButton />

                <div className="cursor-pointer hover:opacity-75 transition">
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <UserAvatar user={currentUser} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => handleUserMenuclick("settings")} className="flex flex-row gap-1">
                                <Cog />
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => handleUserMenuclick("logout")} className="flex flex-row gap-1">
                                <LogOut />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;