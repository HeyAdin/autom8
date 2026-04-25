import { Router, Request, Response, response } from "express";
import { signInSchema, signUpSchema } from "../types/userSchema";
import { prisma } from "@repo/db";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { userExists } from "../utils/userExits";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthRequest } from "../utils/requestType";
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
    const userDetail = await userExists(response.data.email);

    if (userDetail.success) {
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
});

router.post('/signin', async (req: Request, res: Response) => {
    const body = req.body;
    const response = signInSchema.safeParse(body);
    if (!response.success) {
        res.status(400).json({
            success: false,
            msg: response.error.issues[0]?.message
        });
        return;
    }
    const userDetail = await userExists(response.data.email);
    if (!userDetail.success) {
        res.status(400).json({
            success: false,
            msg: "user doesn't exist, Please sign up"
        });
        return;
    }
    const token = jwt.sign(userDetail.id || '', process.env.JWT_SECRET || '');

    res.status(200).json({
        success: true,
        msg: 'user sign in successful',
        token
    })
})

router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
    const id = req.auth?.id;
    const user = prisma.user.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })
    res.status(200).json({
        success: true,
        user
    })
})
export const userRouter = router;