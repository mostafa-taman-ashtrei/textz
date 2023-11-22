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


export const getUserList = async () => {
    const session = await getUserSession();
    if (!session?.user?.email) return null;

    try {
        const allUsers = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            where: { NOT: { email: session.user.email } }
        });

        return allUsers;
    } catch {
        return [];
    }
};