import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/users";
import prisma from "@/lib/prismaClient";

export const POST = async (req: Request) => {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { name, image } = body;

        if (!currentUser?.id) return new NextResponse("Unauthorized Request", { status: 401 });

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { image: image, name: name }
        });

        return NextResponse.json(updatedUser);
    } catch {
        return new NextResponse("Server Error", { status: 500 });
    }
};