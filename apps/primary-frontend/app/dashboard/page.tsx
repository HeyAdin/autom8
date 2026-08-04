"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
        {session && <div>
            {JSON.stringify(session)}
            <button
                onClick={() => {
                    signOut()
                }}
            >sign out</button>
        </div>}
    </div>
}