import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { AutomCreateSchema } from "../types/automSchem";
import { prisma } from "@repo/db";
import { AuthRequest } from "../utils/requestType";

const router = Router();

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    const body = req.body;
    const parsedData = AutomCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            success: false,
            msg: parsedData.error.issues[0]?.message
        });
    }

    await prisma.$transaction(async (tx) => {
        const autom = await tx.autom.create({
            data: {
                triggerId: '',
                userId: req.auth?.id || "",
                actions: {
                    create: parsedData.data.actions.map((actions, idx) => ({
                        actionId: actions.availableActionId,
                        sortingOrders: idx
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                automId: autom.id,
                availableTriggerId: parsedData.data.availableTriggerId
            }
        });

        await tx.autom.update({
            where: {
                id: autom.id
            },
            data: {
                triggerId: trigger.id
            }
        })
    })
})

router.get('/automs', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.auth?.id || "";
    const autom = await prisma.autom.findMany({
        where: {
            userId
        },
        include:{
            actions:{
                include:{
                    availableActions:true
                }
            }
        }
    })
    console.log("all the automs",autom);
    return res.status(200).json({
        success:true,
        autom
    })
})