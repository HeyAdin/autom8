export const AutomCells = ({name,index}:{name?:string,index:number})=>{
    return <div className="border border-neutral-500 min-w-40 px-8 py-3 flex gap-2 items-center justify-center my-2">
        <span>{index}.</span> <span>{name}</span>
    </div>
}