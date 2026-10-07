import { Actions, Automs, useAutoms } from "../hooks/zapHooks"
import { LinkButton } from "./LinkButton";

export const AutomsItem = () => {
    const automs = useAutoms();
    return <div className=" pb-2 my-7 mx-5">
        <div className="w-full">
            <div className="flex justify-between items-center px-10 border-b border-neutral-800 py-2">
                <div className="flex-1 ">Name</div>
                <div className="flex-1">Id</div>
                <div className="flex-1">Webhook Url</div>
            </div>
            <div>
                {automs === "loading" ? <div className="w-full flex justify-center items-center">Loading Your Automs </div> : <div className="w-full text-neutral-400 text-md ">
                    {automs.map((autom: Automs) => {
                        return <div key={autom.id} className="border-b border-neutral-800 p-2 flex items-center hover:bg-neutral-900">
                            <div className="flex-1 flex gap-2">
                                <div>{autom.trigger.availableTriggers.name}</div>
                                <div className="flex gap-2">{autom.actions.map((action: Actions) => { return <div key={action.id}>{action.availableActions.type}</div> })}</div>
                            </div>
                            <div className="flex-1">
                                {autom.id}
                            </div>
                            <div className="flex-1">
                                {`http://localhost:3001/hooks/catch/${autom.userId}/${autom.id}`}
                            </div>
                            <LinkButton url={`autom/${autom.id}`} btnText=">"></LinkButton>
                        </div>
                    })}
                </div>}

            </div>
        </div>
    </div>
}