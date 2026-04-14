import { Router, Request, Response } from "express";
import { signUpSchema } from "../types/userSchema";

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    const body = req.body;
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
    
    res.status(200).json(
        {
            success: true,
            msg: "user signup successful", data: {}
        }
    );
})

export const userRouter = router;