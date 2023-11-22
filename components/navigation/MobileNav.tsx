"use client";

import NavItem from "./NavItem";
import useRoutes from "@/hooks/useRoutes";

const MobileNav: React.FC = () => {
    const routes = useRoutes();

    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center lg:bg-white lg:dark:bg-black border-t-[1px] lg:hidden">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                    name={undefined}
                    isMobile
                />
            ))}
        </div>
    );
};

export default MobileNav;