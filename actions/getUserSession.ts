import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const getUserSession = async () => {
    return await getServerSession(authOptions);
};

export default getUserSession;