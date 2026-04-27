import { prisma } from "@repo/db";
interface UserData {
    id?: string,
    email?: string,
    name?: string
    success: boolean
}
export async function userExists(email: string): Promise<UserData> {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    console.log(user);
    if (!user?.email) {
        console.log("i am inside the check")
        return { success: false }
    }
    return { id: user.id, success: true, email: user.email };
}