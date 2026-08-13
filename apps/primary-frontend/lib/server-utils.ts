import { prisma } from "@repo/db";

interface UserData {
    id?: string;
    email?: string;
    name?: string;
    success: boolean;
    password?: string;
}

export async function userExists(email: string): Promise<UserData> {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user?.email) {
        return { success: false };
    }
    return { id: user.id, success: true, email: user.email, password: user.password , name:user.name};
}
