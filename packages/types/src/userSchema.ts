import * as zod from 'zod'

export const signUpSchema = zod.object({
    name : zod.string().max(25),
    email : zod.email(),
    password:zod.string().min(6)
});

export const signInSchema = zod.object({
    email:zod.email(),
    password: zod.string().min(6)
});