import { Router, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { AutomCreateSchema } from "../types/automSchem.js";
import { prisma } from "@repo/db";
import { AuthRequest } from "../utils/requestType.js";
import { isUserVerified } from "../middleware/isUserVerified.js";

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

    const autom = await prisma.$transaction(async (tx:any) => {
        const autom = await tx.autom.create({
            data: {
                userId: req.auth?.id || "",
                actions: {
                    create: parsedData.data.actions.map((actions, idx) => ({
                        actionId: actions.availableActionId,
                        sortingOrders: idx,
                        metadata:actions.actionMetadata
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                automId: autom.id,
                availableTriggerId: parsedData.data.availableTriggerId,
                metadata:parsedData.data.triggerMetadata
            }
        });

        return autom;
    })

    return res.status(200).json({
        success: true,
        msg: "autom created succesful",
        autom
    })
})

router.get('/', authMiddleware, isUserVerified, async (req: AuthRequest, res: Response) => {
    const userId = req.auth?.id || "";
    const autom = await prisma.autom.findMany({
        where: {
            userId:userId
        },
        include: {
            actions: {
                include: {
                    availableActions: true
                }
            },
            trigger: {
                include: {
                    availableTriggers: true
                }
            }
        }
    })
    return res.status(200).json({
        success: true,
        autom
    })
})

export const automRouter = router;