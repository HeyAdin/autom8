"use client"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export interface Actions{
    id: string,
    actionId : string,
    automId:string,
    sortingOrder: number,
    availableActions:{
        id: string,
        type: string
    },

}
export interface Triggers{
    id: string,
    automId:string,
    availableTriggerId:string,
    availableTriggers:{
        id: string,
        name: string
    },
}
export interface Automs {
    id: string,
    userId: string,
    actions: Actions[]
    trigger:Triggers
}

export function useAutoms() {
    const {data:session,status} = useSession()
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [automs, setAutoms] = useState<Automs[]>([]);
    useEffect(()=>{
        if (status !== "authenticated") {
            return;
        }
        const fetchAutoms = async()=>{
            setIsLoading(true);
            const response:any = await axios.get('http://localhost:3004/api/v1/autom',{
                headers:{
                    "Authorization" : `Bearer ${session?.user.accessToken}`
                }
            })
            if(response.status === 200){
                setAutoms(response.data.autom)
                setIsLoading(false);
            }
        }
        fetchAutoms();
    },[status,session])
    if (status === "loading" || isLoading) {
        return "loading";
    }
    return automs;
}