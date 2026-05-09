import React from "react"
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
export const Navbar = ({ className, children }: { className: string, children: React.ReactNode }) => {
    return <div className={className}>
        {children}
    </div>
}