import { Home, MessageCircle } from "lucide-react";

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
        }
    ], [pathname]);

    return routes;
};

export default useRoutes;