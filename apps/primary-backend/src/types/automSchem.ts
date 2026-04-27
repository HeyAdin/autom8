import * as zod from "zod";


export const AutomCreateSchema = zod.object({
    availableTriggerId: zod.string(),
    triggerMetadata: zod.any().optional(),
    actions : zod.array(zod.object({
        availableActionId : zod.string(),
        actionMetada: zod.any().optional()
    }))
})