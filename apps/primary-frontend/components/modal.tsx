import { useAvailableActionAndTrigger } from "../hooks/availableActionAndTriggerHooks"

export default function Modal({ index, onSelect }: { index: number, onSelect: (props: null | { name: string, id: string }) => void }) {
    const availableTrigger = useAvailableActionAndTrigger();
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
                            Select {index === 1 ? "Trigger" : "Action"}
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
                        {availableTrigger.map(a => <div>{a.name}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}