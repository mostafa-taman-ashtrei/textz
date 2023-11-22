import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import { getCurrentUser } from "@/actions/users";

interface props {
    children: React.ReactNode;
}


const DashboardNav: React.FC<props> = async ({ children }) => {
    const currentUser = await getCurrentUser();

    return (
        <div className="h-full">
            <Sidebar currentUser={currentUser} />
            <MobileNav />

            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    );
};

export default DashboardNav;