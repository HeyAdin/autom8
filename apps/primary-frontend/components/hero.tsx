"use client"
import Link from "next/link"
import { Button, Buttons } from "./button"
import { Heading } from "./heading"
import { Subheading } from "./subheading"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const Hero = () => {
    const {data:session,status} = useSession();
    const router = useRouter();
    return <div className="pt-10 md:pt-20 lg:pt-32 z-0">
        <Heading as="h1">
            Turn Every GitHub Contribution <br /> Into Instant Solana Rewards
        </Heading>
        <Subheading className="py-8">
            Create automated bounty workflows that send Solana directly to contributors’ wallets when issues are closed, PRs are merged, or tasks are completed.
        </Subheading>
        <div className="flex items-center gap-6">
            <Button 
            handleClick={()=>{
                    if(session){
                        router.push('/dashboard')
                    }else{
                        router.push('/signin')
                    }
                }}
            className="shadow-brand cursor-pointer">
                Automate Your Bounty
            </Button>
            <Buttons asChild variant='outline'>
                <Link href='#'>Read Our Docs</Link>
            </Buttons>
        </div>
    </div>
}