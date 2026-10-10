"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AutomsItem } from "../../components/automsItem";
import { Heading } from "../../components/heading";
import { Subheading } from "../../components/subheading";
import { Button } from "../../components/button";
import { useAutoms } from "../../hooks/zapHooks";
import { VerifyEmailModal } from "../../components/verifyEmailModal";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const automs = useAutoms();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/signin');
        }
    }, [status, router]);

    if (status === "loading" || automs === "loading") {
        return <div className="flex items-center justify-center min-h-[60vh] text-neutral-400">Loading...</div>;
    }

    if (!session) {
        return null;
    }

    if (automs.error) {
        return <VerifyEmailModal onSuccess={() => automs.refetch()} />;
    }

    return <div>
        <div className="border-b border-neutral-800 pb-2 my-7 mx-5 flex justify-between items-end">
            <div>
                <Heading className="lg:text-3xl">Your Automs</Heading>
                <Subheading>Manage and monitor your automations</Subheading>
            </div>
            <Button className="px-4 py-1 text-lg" variants='secondary' handleClick={()=>{router.push('autom/create')}} >Create <b>+</b></Button>
        </div>
        <AutomsItem automs={automs} />
    </div>
}