import { signUpSchema } from "@repo/types/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { userExists } from "../../../lib/server-utils";
import bcrypt from 'bcrypt';
import { prisma } from "@repo/db";

interface signUpBody {
    name: string,
    email: string,
    password: string
}

export async function POST(req: NextRequest) {
    const body: signUpBody = await req.json();
    const validate = signUpSchema.safeParse(body);
    if (!validate.success) {
        return NextResponse.json({
            success: false,
            error: validate.error.issues[0]?.message
        })
    }
    if ((await userExists(body.email)).success === true) {
        return NextResponse.json({
            success: false,
            error: "User already exists Please signin"
        });
    };
    const hashedPassword = await bcrypt.hash(body.password,12);
    const user = await prisma.user.create({
        data: {
            ...body,
            password:hashedPassword
        }
    })
    if (!user) {
        return NextResponse.json({ success: false, msg: "user not created" });
    }
    return NextResponse.json({
        success: true,
        msg: "user created successful"
    })
}