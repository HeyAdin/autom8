"use client"
import { useState } from "react";
import { AutomCells } from "../../../components/automCells";
import { Container } from "../../../components/container";
import { NavBar } from "../../../components/navbar";
import { Button, Buttons } from "../../../components/button";

export default function Home() {
    const [selectedTrigger, setSelectedTrigger] = useState('');
    const [selectedAction, setSelectedAction] = useState<{
        availableActionId: string,
        availableActionName: string
    }[]>([]);

    return <Container >
        <NavBar unProtected={false} className="font-inter"></NavBar>
        <div className="flex-1 min-h-[91vh] bg-neutral-800/10 flex flex-col items-center justify-center">
            <AutomCells name={selectedTrigger ? selectedTrigger : "Trigger"} index={1} />
            <div className="flex flex-col items-center justify-center">
                {selectedAction.map((action, index) => <AutomCells name={action.availableActionName ? action.availableActionName : "Action"} index={index + 2} />)}
            </div>
            <Button className="text-xl px-3" handleClick={() => {setSelectedAction((a)=>{
                return [...a,{availableActionId:"",availableActionName:""}]
            })}}>+</Button>
        </div>
        
    </Container>
}