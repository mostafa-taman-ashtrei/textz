import PageHeading from "@/components/general/PageHeading";
import { SettingsIcon } from "lucide-react";
import UserSettings from "@/components/navigation/UserSettings";
import { getCurrentUser } from "@/actions/users";

interface props {

}

const Settings: React.FC<props> = async ({ }) => {
    const currentUser = await getCurrentUser();

    return (
        <div className="px-4 mx-8 lg:px-8 space-y-4 content-center">
            <PageHeading
                title="Settings"
                description=""
                icon={SettingsIcon}
                iconColor="text-sky-700"
                bgColor="bg-sky-700/10"

            />

            <UserSettings user={currentUser} />
        </div>
    );
};

export default Settings;