import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { AutomCreateSchema } from "../types/automSchem.js";
import { prisma } from "@repo/db";
import { AuthRequest } from "../utils/requestType.js";

const router = Router();

router.get('/available', authMiddleware,async(req:Request,res:Response)=>{
    const availableTriggers = await prisma.availableTrigger.findMany();
    if(availableTriggers.length===0 || availableTriggers === undefined || availableTriggers === null){
        res.status(401).json({success:false,msg:"no trigger found"})
    }
    res.status(200).json({success:true,msg:"triggers fetched successfully",trigger:availableTriggers})
})

export const triggerRouter = router;