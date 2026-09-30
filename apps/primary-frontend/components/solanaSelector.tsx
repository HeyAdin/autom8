"use client"
import { useState } from "react";
import { FormInput } from "./Input";
import { Button } from "./button";

export default function SolanaSelector({setMetadata}:{
    setMetadata: (params:any) => void
}) {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    return <div className="flex flex-col gap-4">
        <FormInput input={address} placeholder="Adress" label="To" setInputValue={setAddress} />
        <FormInput input={amount} placeholder="Enter in SOL" label="Amout" setInputValue={setAmount} />
        <Button variants="secondary" className="bg-[#ff4f00] mx-auto hover:bg-[ff4f00]/80 px-4 py-1" handleClick={()=>{
            setMetadata({
                address,
                amount
            })
        }}>Submit</Button>
    </div>
}