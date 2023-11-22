import { User } from "@prisma/client";
import UserListItem from "./UserListItem";

interface props {
    users: User[] | null;
}

const UserList: React.FC<props> = ({ users }) => {
    return (
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto  block w-full left-0">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold  py-4">
                        Fellow Texterz
                    </div>
                </div>

                {users !== null && users.map((user) => (
                    <UserListItem
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </aside>
    );
};

export default UserList;