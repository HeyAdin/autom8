"use client"
import { useState } from "react";
import { FormInput } from "./Input";
import { Button } from "./button";

export default function EmailSelector({ setMetadata }: {
    setMetadata: (params: any) => void
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return <div className="flex flex-col gap-4">
        <FormInput input={email} placeholder="Email" label="To" setInputValue={setEmail} />
        <FormInput input={body} placeholder="Write the message" label="Body" setInputValue={setBody} />
        <Button variants="secondary" className="bg-[#ff4f00] mx-auto hover:bg-[ff4f00]/80 px-4 py-1" handleClick={() => {
            setMetadata({
                email,
                body
            })
        }}>Submit</Button>
    </div>
}