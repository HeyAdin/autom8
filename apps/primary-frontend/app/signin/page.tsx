"use client"

import { useState } from "react";
import { FormInput } from "../../components/Input";
import MeshBackground from "../../components/mesh";
import { signIn } from "next-auth/react";

export default function () {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return <div className="mt-4 flex flex-col items-center justify-center">
        <MeshBackground />
        <div className="text-center pt-10 md:pt-10">
            <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl">Welcome back</h1>
            <p className="font-inter text-base md:text-lg text-neutral-500 mt-2 tracking-tight">Sign in to your account to continue</p>
        </div>
        <div className="flex flex-col gap-3 w-[80%] md:w-full max-w-sm font-inter mx-auto md:max-w-sm mt-5">
            <button
                type="button"
                className="flex items-center justify-center gap-3 py-2.5 rounded-lg  bg-[#ff4f00] hover:bg-[#FF641F] active:bg-[#E04600] text-white font-medium text-sm hover:bg-gray-[#1bf12f] active:bg-gray-[#af4a90] transition-colors shadow-sm cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-brand-google size-5"><path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"></path></svg>
                Continue with Google
            </button>

            {/* GitHub Button */}
            <button
                type="button"
                className="flex items-center justify-center gap-3 w-full px-4 py-2.5 rounded-lg bg-[#181717] text-white font-medium text-sm hover:bg-[#2a2a2a] active:bg-[#0f0f0f] transition-colors shadow-sm cursor-pointer"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
            </button>
        </div>
        <div className="flex items-center  w-[80%] md:w-full max-w-sm mx-auto my-4 font-inter font-light tracking-tight">
            <div className="grow border-t border-neutral-500" />
            <span className="mx-3 text-sm text-neutral-500 whitespace-nowrap">
                Or continue with email
            </span>
            <div className="grow border-t border-neutral-500" />
        </div>
        <div className="flex flex-col gap-4 w-[80%] md:w-full max-w-sm font-inter">
            <FormInput 
            input={email}
            label="Email address" 
            type="email" 
            placeholder="you@example.com" 
            setInputValue={setEmail}
            />
            <FormInput 
            input={password}
            label="Password" 
            type="password" 
            placeholder="Create a password" 
            setInputValue={setPassword}
            />

            <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-lg bg-[#FF4F00] hover:bg-[#FF641F] active:bg-[#E04600] text-white font-medium text-sm transition-colors cursor-pointer"
                onClick={()=>{
                    signIn("credentials",{username:email,password:password})
                    console.log(email,password)
                }}
            >
                Sign In
            </button>
        </div>
        <div className='font-display text-neutral-500 font-light pt-3 flex gap-2 text-sm md:text-md'>
            Don't have an account? <a href="/signup" className='text-white'>Sign up</a>
        </div>
    </div>
}