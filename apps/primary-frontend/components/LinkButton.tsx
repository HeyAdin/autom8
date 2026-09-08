import { useRouter } from "next/navigation"

export function LinkButton({ url,btnText }: { url: string,btnText:string|React.ReactElement }): React.ReactElement {
    const router = useRouter();
    return <button
        onClick={() => {
            router.push(url)
        }}
        className="font-bold text-2xl text-gray-300 cursor-pointer hover:text-gray-400 p-4 tracking-tighter">{btnText}
    </button>
}