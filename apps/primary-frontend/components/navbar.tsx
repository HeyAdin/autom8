"use client"
import React from "react"
import { cn } from "../lib/utils"
import { Logo } from "@repo/ui/logo"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
export const navLinks = [
    {
        href: '/products',
        title: "Products"
    },
    {
        href: '/resources',
        title: "Resources"
    },
    {
        href: '/pricing',
        title: "Pricing"
    }
]
export const NavBar = ({ className }: {
    className: string,
}) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    return <div className={cn('py-2 flex justify-between items-center px-4 border-b border-neutral-800 rounded-sm text-neutral-200 ')}>
        <div className="flex items-baseline font-display font-bold gap-1 text-neutral-600">
            <Logo classname="" />
            <div className="flex items-baseline text-xl text-neutral-200">
                Autom<span className="text-[#ff4f00] text-xl ">8</span>
            </div>
        </div>
        <div className="flex items-center gap-20">
                {navLinks.map((links, index) => {
                    return <Link
                        key={index}
                        href={links.href}
                        className="text-sm text-neutral-600 dark:text-neutral-200 font-medium font-display"
                    >{links.title}</Link>
                })}
            </div>
        <div>
            {session ? <button onClick={() => {
                signOut()
            }}> Sign out</button> : <button onClick={() => { router.push('/signin') }}> sign in </button>}
        </div>
    </div>
}