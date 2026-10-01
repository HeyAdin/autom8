import * as zod from "zod";


export const AutomCreateSchema = zod.object({
    availableTriggerId: zod.string(),
    triggerMetadata: zod.any().optional(),
    actions : zod.array(zod.object({
        availableActionId : zod.string(),
        actionMetadata: zod.any()
    }))
});

export const ActionCreateSchema = zod.object({
    type:zod.string(),
    image:zod.string()
})

export const TriggerCreateSchema = zod.object({
    name:zod.string(),
    image:zod.string()
})