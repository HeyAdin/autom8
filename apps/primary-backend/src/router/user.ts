import { Router, Request, Response } from "express";
import { signUpSchema } from "../types/userSchema";
import { prisma } from "@repo/db";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    const body = req.body;

    // validate inputs
    const response = signUpSchema.safeParse(body);
    if (!response.success) {
        res.status(401).json(
            {
                success: false,
                msg: response.error.issues[0]?.message
            }
        )
        return;
    }

    // Check user already exists?
    const userExist = await prisma.user.findFirst({
        where: {
            email: response.data.email
        }
    });
    if (userExist) {
        res.status(400).json(
            {
                success: false,
                msg: "user already exist please sign in"
            }
        );
        return;
    };

    // hash password and create user
    const hashedPassword = await bcrypt.hash(response.data.password, 12);
    const user = await prisma.user.create({
        data: {
            email: response.data.email,
            name: response.data.name,
            password: hashedPassword
        }
    });
    const token = jwt.sign(user.id, process.env.JWT_SECRET || '');
    res.status(200).json(
        {
            success: true,
            msg: "user signup successful",
            token
        }
    );
})

export const userRouter = router;