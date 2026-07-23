import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"Email",placeholder:"user@example.com", type:"text"},
                password:{label:"Password",placeholder:"User@123",type:"password"}
            },
            async authorize(credentials:any){
                console.log(credentials,"Hey i am the next auth authorize function check me running here")
                return {id:credentials.username}
            }
        })
    ],
    pages:{
        signIn:"/signin"
    }
}) 

export const GET = handler;
export const POST = handler;