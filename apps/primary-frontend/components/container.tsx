import React from "react"

export const Container = ({children}:{children:React.ReactNode})=>{
    return <div className="max-w-7xl mx-auto py-2 min-h-screen">
        {children}
    </div>
}