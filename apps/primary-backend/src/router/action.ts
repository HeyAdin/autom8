import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ActionCreateSchema, AutomCreateSchema } from "../types/automSchem.js";
import { prisma } from "@repo/db";
import { AuthRequest } from "../utils/requestType.js";

const router = Router();

router.get('/available', authMiddleware,async(req:Request,res:Response)=>{
    const availableActions = await prisma.availableActions.findMany();
    if(availableActions.length===0 || availableActions === undefined || availableActions === null){
        res.status(401).json({success:false,msg:"no actions found"})
    }
    res.status(200).json({success:true,msg:"actions fetched successfully",action:availableActions})
});

router.post('/create', authMiddleware,async(req:Request,res:Response)=>{
    const createActionBody = ActionCreateSchema.safeParse(req.body);
    if(!createActionBody.success){
        res.status(401).json({success:false,msg:createActionBody.error.issues[0]?.message});
        return;
    }
    const createAction = await prisma.availableActions.create({
        data:createActionBody.data
    });
    if(createAction === null || createAction === undefined){
         res.status(401).json({success:false,msg:"something went wrong please try again"});
        return;
    }
    res.status(200).json({success:true,msg:"actions created successfully"})
})

export const actionRouter = router;