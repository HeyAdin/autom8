"use client"
import React, { SetStateAction, useEffect, useState } from "react";

export function FormInput({ label, type = "text", placeholder ,setInputValue,input}:{
    label:string,
    type?:string;
    placeholder:string,
    setInputValue:React.Dispatch<SetStateAction<string>>,
    input : string
}) {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(()=>{
    console.log("I am running the use Effect")
    const timer = setTimeout(()=>{
      console.log("I am getting changed")
      setDebouncedValue(input)
    },600);
    return ()=>clearTimeout(timer)
  },[input]);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-200">{label}</label>
      <input
      onChange={(e)=>{
        setInputValue(e.target.value);
      }}
        type={type}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#282828] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
      />
    </div>
  );
}