"use client"
import { useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface VerifyEmailModalProps {
    onSuccess: () => void;
}

export function VerifyEmailModal({ onSuccess }: VerifyEmailModalProps) {
    const { data: session } = useSession();
    const [step, setStep] = useState<"initial" | "otp">("initial");
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSendOtp = async () => {
        setLoading(true);
        setError(null);
        try {
            const res: any = await axios.post(
                "http://localhost:3004/api/v1/user/sent-otp",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.accessToken}`
                    }
                }
            );
            if (res.status === 200 || res.data?.success) {
                setOtp(["", "", "", ""]);
                setStep("otp");
                setMessage("Verification code sent to your email.");
            } else {
                setError(res.data?.msg || "Failed to send verification code.");
            }
        } catch (err: any) {
            setError(err?.response?.data?.msg || "Failed to send verification code.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (value: string, index: number) => {
        const char = value.slice(-1);
        if (char && !/^\d$/.test(char)) return;

        const newOtp = [...otp];
        newOtp[index] = char;
        setOtp(newOtp);

        if (char && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
        if (!pastedData) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, idx) => {
            if (idx < 4) newOtp[idx] = char;
        });
        setOtp(newOtp);

        const targetIndex = Math.min(pastedData.length, 3);
        inputRefs.current[targetIndex]?.focus();
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (otpCode.length < 4) {
            setError("Please enter the complete 4-digit verification code.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res: any = await axios.post(
                "http://localhost:3004/api/v1/user/verify-email",
                { otp: otpCode },
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.accessToken}`
                    }
                }
            );
            if (res.status === 200 || res.data?.success) {
                onSuccess();
            } else {
                setError(res.data?.msg || "Verification failed. Please check the code.");
            }
        } catch (err: any) {
            setError(err?.response?.data?.msg || "Verification failed. Please check the code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-x-0 bottom-0 top-14.25 z-40 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl text-neutral-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#ff4f00]/10 flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-[#ff4f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white">Please verify your email</h2>
                    <p className="text-sm text-neutral-400 mt-1">
                        {step === "initial"
                            ? "You must verify your email address to access your automations."
                            : "Enter the 4-digit verification code sent to your email address."}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                {message && !error && (
                    <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                        {message}
                    </div>
                )}

                {step === "initial" ? (
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#ff4f00] hover:bg-[#ff4f00]/90 text-white font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending code..." : "Send verification code"}
                    </button>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                        <div className="flex justify-center gap-3 py-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    autoFocus={index === 0}
                                    className="w-12 h-14 text-center text-2xl font-bold bg-[#1A1A1A] border border-[#282828] text-white rounded-lg focus:outline-none focus:border-[#ff4f00] transition-colors"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-lg bg-[#ff4f00] hover:bg-[#ff4f00]/90 text-white font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Verifying..." : "Submit verification code"}
                        </button>

                        <div className="text-center pt-1">
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={loading}
                                className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer underline underline-offset-4 disabled:opacity-50"
                            >
                                Resend verification code
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
