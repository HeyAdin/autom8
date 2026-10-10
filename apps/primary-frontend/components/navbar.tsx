"use client"
import React, { useState, useRef, useEffect } from "react"
import { cn } from "../lib/utils"
import { Logo } from "@repo/ui/logo"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./button"

export const NavBar = ({ className, unProtected }: {
    className: string,
    unProtected: boolean
}) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return <div className={cn('py-2 flex justify-between items-center px-4 border-b border-neutral-800 rounded-sm text-neutral-200 relative z-50 bg-[#0a0a0a]', className)}>
        <div className="flex items-baseline font-display font-bold gap-1 text-neutral-600">
            <Logo classname="" />
            <div 
            onClick={()=>{
                router.push('/')
            }}
            className="flex items-baseline text-xl text-neutral-200 cursor-pointer">
                Autom<span className="text-[#ff4f00] text-xl ">8</span>
            </div>
        </div>
        {
            unProtected ? <div className="flex gap-4 items-center text-sm text-neutral-600 dark:text-neutral-800">
                <Button
                    handleClick={() => {
                        if (session) {
                            router.push('/dashboard')
                        } else {
                            router.push('/signin')
                        }
                    }}
                    className="py-1 px-2 font-display cursor-pointer font-semibold ">
                    Create your workflow
                </Button>
                <Link
                    href='contact'
                    className="font-display px-2 py-1 text-white rounded-sm"
                >Contact us
                </Link>
            </div> : <div className="flex gap-4 items-center justify-center">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="cursor-pointer bg-neutral-800 w-8 h-8 rounded-full border border-neutral-600 hover:border-[#ff4f00] flex items-center justify-center text-sm font-semibold text-neutral-200 transition-all duration-200 hover:shadow-[0_0_8px_rgba(255,79,0,0.3)]"
                    >
                        {session?.user?.name?.charAt(0)}
                    </button>

                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-52 rounded-lg border border-neutral-800 bg-neutral-900/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                            style={{
                                animation: "dropdownFadeIn 0.15s ease-out"
                            }}
                        >
                            {/* User info header */}
                            <div className="px-4 py-3 border-b border-neutral-800">
                                <p className="text-sm font-medium text-neutral-200 font-display truncate">
                                    {session?.user?.name || "User"}
                                </p>
                                <p className="text-xs text-neutral-500 font-inter truncate mt-0.5">
                                    {session?.user?.email || ""}
                                </p>
                            </div>

                            {/* Menu items */}
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        router.push('/dashboard/profile');
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-[#ff4f00] transition-colors duration-150 flex items-center gap-3 font-display cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        signOut({ callbackUrl: '/' });
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-red-400 transition-colors duration-150 flex items-center gap-3 font-display cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        }
    </div>
}