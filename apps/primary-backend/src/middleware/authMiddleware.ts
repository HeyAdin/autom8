import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AuthRequest } from "../utils/requestType.js";

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ') || [''];
    const validToken = token[0]?.startsWith('Bearer');
    if (!validToken) {
        res.status(400).json({
            sucess: false,
            msg: 'invalid token'
        });
        return;
    }
    try {
        const payload = jwt.verify(token[1] || '', process.env.JWT_SECRET || '');
        req.auth = { ...(req.auth ?? {}), id: payload as string };
        next()
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: "JWT error"
        });
    }
}