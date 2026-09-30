"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface AvailableTrigger {
    id: string;
    name: string,
    image: string
}
export function useAvailableActionAndTrigger() {
    const { data: session, status } = useSession()
    const [availableAction, setAvailableAction] = useState([]);
    const [availableTrigger, setAvailableTrigger] = useState<AvailableTrigger[]>([]);
    useEffect(() => {
        if (!(status === 'loading')) {
            axios.get('http://localhost:3004/api/v1/trigger/available', {
                headers: {
                    "Authorization": `Bearer ${session?.user.accessToken}`
                }
            })
                .then((response) => {
                    setAvailableTrigger(response.data.trigger)
                })

            axios.get('http://localhost:3004/api/v1/action/available', {
                headers: {
                    "Authorization": `Bearer ${session?.user.accessToken}`
                }
            })
                .then((response) => {
                    setAvailableAction(response.data.action)
                })
        }

    }, [status]);
    return { availableTrigger, availableAction };
}