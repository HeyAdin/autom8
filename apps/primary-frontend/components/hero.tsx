import Link from "next/link"
import { Button, Buttons } from "./button"
import { Container } from "./container"
import { Heading } from "./heading"
import { Subheading } from "./subheading"

export const Hero =()=>{
    return <div className="pt-10 md:pt-20 lg:pt-32">
        <Container>
            <Heading as="h1">
                Turn Every GitHub Contribution <br /> Into Instant Solana Rewards
            </Heading>
            <Subheading className="py-8">
                Create automated bounty workflows that send Solana directly to contributors’ wallets when issues are closed, PRs are merged, or tasks are completed.
            </Subheading>
            <div className="flex items-center gap-6">
                <Button className="shadow-brand cursor-pointer">
                    Automate Your Bounty
                </Button>
                <Buttons asChild variant='outline'>
                    <Link href='#'>Read Our Docs</Link>
                </Buttons>
            </div>
        </Container>
    </div>
}