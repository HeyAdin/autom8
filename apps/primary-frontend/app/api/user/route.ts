import { prisma } from '@repo/db'
import { NextRequest, NextResponse } from 'next/server'
import { signUpSchema } from '@repo/types/userSchema'
import { userExists } from '../../../lib/server-utils';
import { getServerSession } from 'next-auth';


// route to get user details
export async function GET(req: NextRequest) {
    const session = await getServerSession();
    const id = req.body;//here the session will come
    const user = await prisma.user.findFirst({
        where: {
            id: "1"
        },
        select: {
            email: true,
            name: true,
            id: true,
            password: false
        }
    })
    return NextResponse.json({
        email: user?.email,
        name: user?.name,
    })
}
