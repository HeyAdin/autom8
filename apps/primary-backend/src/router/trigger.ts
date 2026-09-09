import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { AutomCreateSchema, TriggerCreateSchema } from "../types/automSchem.js";
import { prisma } from "@repo/db";
import { AuthRequest } from "../utils/requestType.js";

const router = Router();

router.get('/available', authMiddleware,async(req:Request,res:Response)=>{
    const availableTriggers = await prisma.availableTrigger.findMany();
    if(availableTriggers.length===0 || availableTriggers === undefined || availableTriggers === null){
        res.status(401).json({success:false,msg:"no trigger found"})
    }
    res.status(200).json({success:true,msg:"triggers fetched successfully",trigger:availableTriggers})
});

router.post('/create', authMiddleware,async(req:Request,res:Response)=>{
    const createTriggerBody = TriggerCreateSchema.safeParse(req.body);
    if(!createTriggerBody.success){
        res.status(401).json({success:false,msg:createTriggerBody.error.issues[0]?.message});
        return;
    }
    const createTrigger = await prisma.availableTrigger.create({
        data:createTriggerBody.data
    });
    if(createTrigger === null || createTrigger === undefined){
    res.status(401).json({success:false,msg:"something went wrong please try again"});
        return;
    }
    res.status(200).json({success:true,msg:"trigger created successfully"})
})


export const triggerRouter = router;