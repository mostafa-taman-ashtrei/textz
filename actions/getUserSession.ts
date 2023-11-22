import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const getUserSession = async () => {
    return await getServerSession(authOptions);
};

export default getUserSession;