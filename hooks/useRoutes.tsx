import { Home, LogOut, MessageCircle } from "lucide-react";

import { signOut } from "next-auth/react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const useRoutes = () => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: Home,
            active: pathname === "/dashboard"
        },
        {
            name: "Chat",
            href: "/chat",
            icon: MessageCircle,
            active: pathname === "/chat"
        },
        {
            name: "Logout",
            onClick: () => signOut(),
            href: "#",
            icon: LogOut,
        }
    ], [pathname]);

    return routes;
};

export default useRoutes;