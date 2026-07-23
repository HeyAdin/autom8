import React from "react"
import { cn } from "../lib/utils"
import { Logo} from "@repo/ui/logo"

export const navBarLists = [
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
    return <div className={cn('py-2 flex justify-between items-center px-4 border-b border-neutral-700 rounded-sm text-neutral-200 ')}>
        <div className="flex items-baseline font-display font-bold gap-1 text-neutral-600">
            <Logo classname="" />
            <div className="flex items-baseline text-xl text-neutral-200">
                Autom<span className="text-[#ff4f00] text-2xl">8</span>
            </div>
        </div>
    </div>
}