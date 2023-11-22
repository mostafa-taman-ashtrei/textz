import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface props {
    name: string | undefined;
    icon: LucideIcon;
    href: string;
    onClick?: () => void;
    active?: boolean;
    isMobile: boolean;
}

const NavItem: React.FC<props> = ({ name, icon: Icon, href, onClick, active, isMobile }) => {
    const handleClick = () => {
        if (onClick) return onClick();
    };


    if (isMobile) return (
        <Link
            onClick={handleClick}
            href={href}
            className={cn(
                `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
                active && "dark:bg-gray-800  bg-gray-500 text-white",
            )}>
            <Icon className="h-6 w-6" />
        </Link>
    );

    return (
        <li onClick={handleClick} key={name}>
            <Link
                href={href}
                className={cn(
                    `group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
                    active && "dark:bg-gray-800  bg-gray-500 text-white"
                )}
            >
                <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">{name}</span>
            </Link>
        </li>
    );
};

export default NavItem;