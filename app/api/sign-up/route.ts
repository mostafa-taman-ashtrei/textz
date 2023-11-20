import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismaClient";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        if (!email || !name || !password) return NextResponse.json("Bad request ... missing data", { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(newUser, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
};