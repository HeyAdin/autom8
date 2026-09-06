"use client"
import Image from "next/image"
import demoImage from '../assets/WorkflowImage.png'
import { easeOut, motion } from 'motion/react'
import { cn } from "../lib/utils"

export const LandingImages = () => {
    return <div className="relative min-h-140 w-full pt-20 z-10">
        <div className="relative min-h-140 w-full perspective-distant translate-y-10 flex justify-center">
            <div className="relative min-h-140" style={{ width: "1020px", maxWidth: "100%" }}>
                <motion.div
                    className="perspective-[4000px]"
                    initial={{
                        opacity: 0,
                        y: -100
                    }}
                    animate={{
                        opacity: 1,
                        y:0
                    }}
                    transition={{
                        duration:0.5,
                        ease:easeOut
                    }}
                >
                    <Image
                        height="800"
                        width="1020"
                        src={demoImage}
                        loading="eager"
                        alt="image 2 for workflow"
                        className={cn("absolute inset-0 rounded-lg mask-t-from-90% mask-r-from-30% mask-b-from-9% shadow-2xl border border-[#FF4F00]")}
                        style={{
                            transform: "rotateX(30deg) rotateY(20deg) rotateZ(-30deg)"
                        }}
                    >
                    </Image>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y:-200
                    }}
                    animate={{
                        opacity: 1,
                        y:0
                    }}
                    transition={{
                        duration:0.5,
                        ease:easeOut,
                        delay:0.1 
                    }}
                    className="perspective-[4000px] -translate-y-30"
                    style={{ position: "relative", left: "5rem" }}
                >
                    <Image
                        height="800"
                        width="1020"
                        src={demoImage}
                        alt="image 2 for workflow"
                        className={cn("absolute inset-0 rounded-lg  mask-r-from-60% mask-b-from-65% shadow-2xl border border-[#FF4F00]")}
                        style={{
                            transform: "rotateX(30deg) rotateY(20deg) rotateZ(-30deg)"
                        }}
                    >
                    </Image>
                </motion.div>
            </div>
        </div>
    </div>
}