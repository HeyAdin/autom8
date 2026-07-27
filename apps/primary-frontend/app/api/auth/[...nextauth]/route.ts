import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userExists } from "../../../../lib/utils";
import { prisma } from '@repo/db'
import bcrypt from 'bcrypt'
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", placeholder: "user@example.com", type: "text" },
                password: { label: "Password", placeholder: "User@123", type: "password" }
            },

            async authorize(credentials: Record<"username" | "password", string> | undefined) {
                const user = await userExists(credentials?.username || "");
                if (user.success === false) {
                    throw new Error("User not found please sign up")
                    return null;
                }

                const validPassword = await bcrypt.compare(credentials?.password || "",user.password||"")

                if(!validPassword){
                    throw new Error("Incorrect Password")
                    return null;
                }
                return {
                    id: user.id || "",
                    email:user.email || "",
                    name: user.name || ""
                };
            }
        })
    ],
    pages: {
        signIn: "/signin"
    },
    callbacks:{
        
    }
})

export const GET = handler;
export const POST = handler;