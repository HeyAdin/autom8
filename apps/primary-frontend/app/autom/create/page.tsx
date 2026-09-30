"use client"
import { useState } from "react";
import { AutomCells } from "../../../components/automCells";
import { Container } from "../../../components/container";
import { NavBar } from "../../../components/navbar";
import { Button, Buttons } from "../../../components/button";
import Modal from "../../../components/modal";
import { useAvailableActionAndTrigger } from "../../../hooks/availableActionAndTriggerHooks";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const {data:session,status} = useSession();
    const router = useRouter();
    const { availableTrigger, availableAction } = useAvailableActionAndTrigger();

    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string,
        name: string
    }>();

    const [selectedAction, setSelectedAction] = useState<{
        index: number,
        availableActionId: string,
        availableActionName: string,
        metadata:any
    }[]>([]);

    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null)

    return <Container >
        <NavBar unProtected={false} className="font-inter"></NavBar>
        <div className="flex justify-end  bg-neutral-800/10">
            <Button
                handleClick={async () => {
                    if(!availableTrigger){
                        return null;
                    }
                    const response = await axios.post('http://localhost:3004/api/v1/autom', {
                        availableTriggerId:selectedTrigger?.id,
                        triggerMetadata:{},
                        actions:selectedAction.map(a=>{
                            return {availableActionId:a.availableActionId,actionMetadata:a.metadata}
                        })
                    
                    },{
                        headers: {
                            "Authorization": `Bearer ${session?.user.accessToken}`
                        },
                    })
                    if(response.data.success === true){
                        router.push('/dashboard');
                    }
                }}
                className="mr-10 mt-10 px-2" >Publish
            </Button>
        </div>
        <div className="flex-1 min-h-[83vh] bg-neutral-800/10 flex flex-col items-center justify-center">
            <AutomCells name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} handleClick={() => {
                setSelectedModalIndex(1)
            }} />
            <div className="flex flex-col items-center justify-center">
                {selectedAction.map((action,index) => <AutomCells key={index} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} handleClick={() => {
                    setSelectedModalIndex(action.index)
                }} />)}
            </div>
            <Button className="text-xl px-3" handleClick={() => {
                setSelectedAction((a) => {
                    return [...a, {
                        index: a.length + 2,
                        availableActionId: "",
                        availableActionName: "",
                        metadata : {}
                    }]
                })
            }}>+</Button>
        </div>
        {selectedModalIndex &&
            <Modal
                availableItem={selectedModalIndex === 1 ? availableTrigger : availableAction}
                onSelect={(props: null | { type?: string, name?: string, id: string,metadata?:any }) => {
                    if (props === null) {
                        setSelectedModalIndex(null);
                        return;
                    }
                    if (selectedModalIndex === 1) {
                        setSelectedTrigger({
                            id: props.id,
                            name: props.name || ""
                        })
                    } else {
                        setSelectedAction(a => {
                            let newAction = [...a];
                            newAction[selectedModalIndex - 2] = {
                                index: selectedModalIndex,
                                availableActionId: props.id,
                                availableActionName: props.type || "",
                                metadata:props.metadata
                            }
                            return newAction
                        })
                    }
                    setSelectedModalIndex(null);

                }}
                index={selectedModalIndex}
            ></Modal>}
    </Container>
}

