"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AutomsItem } from "../../components/automsItem";
import { Heading } from "../../components/heading";
import { Subheading } from "../../components/subheading";
import { Button } from "../../components/button";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/signin');
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!session) {
        return null;
    }

    return <div>
        <div className="border-b border-neutral-800 pb-2 my-7 mx-5 flex justify-between items-end">
            <div>
                <Heading className="lg:text-3xl">Your Automs</Heading>
                <Subheading>Manage and monitor your automations</Subheading>
            </div>
            <Button className="px-4 py-1 text-lg" variants='secondary' handleClick={()=>{router.push('autom/create')}} >Create <b>+</b></Button>
        </div>
        <AutomsItem />
    </div>
}