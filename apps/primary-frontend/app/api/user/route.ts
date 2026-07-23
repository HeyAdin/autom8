import { prisma } from '@repo/db'
import { NextRequest, NextResponse } from 'next/server'
import {signUpSchema} from '@repo/types/userSchema'
export async function GET(req:NextRequest){
    const id = req.body;//here the session will come
    const user = await prisma.user.findFirst({
        where:{
            id:"1"
        },
        select:{
            email:true,
            name:true,
            id:true,
            password:false
        }
    })
    return NextResponse.json({
        email:user?.email,
        name:user?.name,
    })
}
interface signUpBody{
    name:string,
    email:string,
    password:string
}
export async function POST(req:NextRequest){
    const body : signUpBody= await req.json();
    const validate = signUpSchema.safeParse(body);
    if(!validate.success){
        return NextResponse.json({
            success:false,
            error:validate.error.issues[0]?.message
        })
    }
    const user = await prisma.user.create({
        data:{
            ...body
        }
    })
    if(!user){
        return NextResponse.json({success:false,msg:"user not created"});
    }
    return NextResponse.json({
        success:true,
        msg:"user created successful"
    })
}