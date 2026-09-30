"use client"
import { useState } from "react";
import EmailSelector from "./emailSelector";
import SolanaSelector from "./solanaSelector";

export default function Modal({ availableItem, index, onSelect }: {
    availableItem: {
        id: string,
        name?: string,
        type?: string,
        image: string
    }[],
    index: number,
    onSelect: (props: null | { type?: string, name?: string, id: string, metadata?: any }) => void
}) {

    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string,
        type: string | undefined
    }>();
    const isTrigger = index == 1;

    return (
        <div
            onClick={() => onSelect(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl"
            >
                <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-4 md:p-6 text-neutral-200">
                    <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 md:pb-5">
                        <span className="text-base font-medium text-neutral-300">
                            {selectedAction?.type ? selectedAction?.type : `Select ${index === 1 ? "Trigger" : "Action"}`}
                        </span>
                        <button
                            onClick={() => { onSelect(null) }}
                            className="text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center cursor-pointer transition-colors"
                            data-modal-hide="default-modal"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div>
                        {(step == 1 && selectedAction?.type === 'Send Email' && <EmailSelector setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />)}
                        {(step == 1 && selectedAction?.type === 'Send Solana' && <SolanaSelector setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />)}

                        {step === 0 && <div>
                            {availableItem.map(({ id, name, image, type }: { id: string, name?: string, type?: string, image: string }) => {
                                console.log(id, name, type);
                                return <div key={id}
                                    onClick={() => {
                                        if (isTrigger) {
                                            onSelect({
                                                id,
                                                name,
                                                type
                                            })
                                        }
                                        else {
                                            setStep(s => s + 1)
                                            setSelectedAction({
                                                id,
                                                type
                                            })
                                            console.log("step is ===== ", step, " selected action is === ", selectedAction?.type)
                                        }

                                    }}
                                    className="flex items-center gap-2 py-1 rounded-sm hover:bg-neutral-800 px-2 cursor-pointer my-2">
                                    <img src={image} width={20} height={20} alt="" />
                                    {name || type}
                                </div>
                            })}
                        </div>}
                    </div>

                </div>
            </div>
        </div>
    )
}