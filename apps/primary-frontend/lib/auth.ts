import CredentialsProvider from "next-auth/providers/credentials";
import { userExists } from "./server-utils";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthOptions } from "next-auth";

export const NEXT_AUTH: AuthOptions = {
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
                    throw new Error("User not found please sign up");
                }
                const validPassword = await bcrypt.compare(credentials?.password || "", user.password || "")

                if (!validPassword) {
                    throw new Error("Incorrect Password")
                }

                const token = jwt.sign({ id: user.id, email: user.email }, process.env.BACKEND_JWT_SECRET || "");

                return {
                    id: user.id || "",
                    email: user.email || "",
                    name: user.name || "",
                    accessToken: token
                };
            }
        })
    ],
    pages: {
        signIn: "/signin",
        signOut: "/signin"
    },
    session: {
        strategy: "jwt"
    }
    ,
    callbacks: {
        jwt: ({ token, user }: any) => {
            if (user) {
                token.userId = token.sub,
                    token.accessToken = user.accessToken
            }
            return token
        },
        session: ({ session, token }: any) => {
            session.user.id = token.userId as string;
            session.user.accessToken = token.accessToken as string;
            return session;
        }
    }
}