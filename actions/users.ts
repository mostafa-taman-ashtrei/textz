import getUserSession from "./getUserSession";
import prisma from "@/lib/prismaClient";

export const getCurrentUser = async () => {
    try {
        const session = await getUserSession();
        if (!session?.user?.email) return null;


        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string }
        });

        if (!currentUser) return null;

        return currentUser;
    } catch {
        return null;
    }
};