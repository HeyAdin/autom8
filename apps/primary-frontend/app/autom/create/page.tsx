"use client"
import { useState } from "react";
import { AutomCells } from "../../../components/automCells";
import { Container } from "../../../components/container";
import { NavBar } from "../../../components/navbar";
import { Button, Buttons } from "../../../components/button";
import Modal from "../../../components/modal";

export default function Home() {
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string,
        name: string
    }>();

    const [selectedAction, setSelectedAction] = useState<{
        index: number,
        availableActionId: string,
        availableActionName: string
    }[]>([]);

    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null)

    return <Container >
        <NavBar unProtected={false} className="font-inter"></NavBar>
        <div className="flex-1 min-h-[91vh] bg-neutral-800/10 flex flex-col items-center justify-center">
            <AutomCells name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} handleClick={() => {
                setSelectedModalIndex(1)
            }} />
            <div className="flex flex-col items-center justify-center">
                {selectedAction.map((action) => <AutomCells name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} handleClick={() => {
                    setSelectedModalIndex(action.index)
                }} />)}
            </div>
            <Button className="text-xl px-3" handleClick={() => {
                setSelectedAction((a) => {
                    return [...a, {
                        index: a.length + 2,
                        availableActionId: "",
                        availableActionName: ""
                    }]
                })
            }}>+</Button>
        </div>
        {selectedModalIndex && <Modal onSelect={(props: null | { name: string, id: string }) => {
            if (props === null) {
                setSelectedModalIndex(null);
                return;
            }
            if (selectedModalIndex === 1) {
                setSelectedTrigger({
                    id: props.id,
                    name: props.name
                })
            } else {
                setSelectedAction(a => {
                    let newAction = [...a];
                    newAction[selectedModalIndex - 2] = {
                        index: selectedModalIndex,
                        availableActionId: props.id,
                        availableActionName: props.name
                    }
                    return newAction
                })
            }

        }} index={selectedModalIndex}></Modal>}
    </Container>
}

