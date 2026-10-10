import { Router, Request, Response, response } from "express";
import { signInSchema, signUpSchema } from "../types/userSchema.js";
import { prisma } from "@repo/db";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { userExists } from "../utils/userExits.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { AuthRequest } from "../utils/requestType.js";
import { sendEmail } from "../utils/mail.js";
dotenv.config()
const router = Router();

export let OTP = {
    id: "",
    otp: ""
}

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

router.post('/sent-otp', authMiddleware, async (req: AuthRequest, res: Response) => {
    const otp = String(Math.floor(Math.random() * 10000))
    const email = await prisma.user.findFirst({
        where: {
            id: req.auth?.id
        },
        select: {
            email: true
        }
    });
    const body = `Profile verification otp is ${otp} please donot share this with anyone`;
    const subject = `Otp Verification`
    OTP = {
        id:req.auth?.id || "",
        otp
    }
    console.log(otp, email);
    await sendEmail(email, body, subject, "otp");
    res.status(200).json({ success: true, msg: "otp sent successfully" })
})

router.post('/verify-email', authMiddleware, async (req: AuthRequest, res: Response) => {
    const body = req.body;
    if(!body){
        res.status(400).json({success:false,msg:"please enter the otp"})
        return;
    }
    console.log(body);
    if(+OTP.otp !== +body.otp || OTP.id !== req.auth?.id){
        res.status(400).json({success:false,msg:"Please enter valid otp"});
        return;
    }
    const updateStatus = await prisma.user.update({
        where:{
            id:req.auth?.id
        },
        data:{
            status:true
        }
    });
    res.status(200).json({success:true,msg:"email verification successful"})
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