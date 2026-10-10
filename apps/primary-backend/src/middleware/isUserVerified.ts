import { NextFunction, Response } from "express";
import { AuthRequest } from "../utils/requestType";
import { prisma } from "@repo/db";

export async function isUserVerified(req: AuthRequest, res: Response, next: NextFunction) {
    const id = req.auth?.id;
    try {
        const verificationStatus = await prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                status: true
            }
        });
        if (!verificationStatus || !verificationStatus.status) {
            res.status(401).json({
                success: false,
                msg: "Please verify Your email"
            })
            return;
        }
        next();
    }
    catch (e: any) {
        console.log("logging the isVerified error ====> ", e)
        res.status(400).json({ success: false, msg: "something went wrong" })
    }
}