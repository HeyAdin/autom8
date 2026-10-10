"use client"
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface VerifyEmailModalProps {
    onSuccess: () => void;
}

export function VerifyEmailModal({ onSuccess }: VerifyEmailModalProps) {
    const { data: session } = useSession();
    const [step, setStep] = useState<"initial" | "otp">("initial");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSendOtp = async () => {
        setLoading(true);
        setError(null);
        try {
            const res:any = await axios.post(
                "http://localhost:3004/api/v1/user/send-otp",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.accessToken}`
                    }
                }
            );
            if (res.status === 200 || res.data?.success) {
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

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp.trim()) {
            setError("Please enter the verification code.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res:any = await axios.post(
                "http://localhost:3004/api/v1/user/verify-email",
                { otp: otp.trim() },
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
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
                            : "Enter the verification code sent to your email address."}
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
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter verification code"
                                autoFocus
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#282828] text-white text-center tracking-widest text-lg placeholder:text-neutral-500 placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-lg bg-[#ff4f00] hover:bg-[#ff4f00]/90 text-white font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Verifying..." : "Submit verification code"}
                        </button>

                        <div className="text-center pt-2">
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
