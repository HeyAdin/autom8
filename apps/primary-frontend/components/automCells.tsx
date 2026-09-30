export const AutomCells = (
    { name, index, handleClick }: {
        name?: string,
        index: number,
        handleClick: () => void
    }) => {
    return <div
        key={index}
        onClick={handleClick}
        className="border border-neutral-500 min-w-40 px-8 py-3 flex gap-2 items-center justify-center my-2 ">
        <span>{index}.</span> <span>{name}</span>
    </div>
}