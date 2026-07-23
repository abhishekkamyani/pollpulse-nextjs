"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const CopyUrlButton = ({ label }: { label: string }) => {
    const [copied, setCopied] = useState(false)
    const handleShareCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Unable to copy route address location:", err)
        }
    }
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleShareCopy}
            disabled={copied}
            className={cn("w-full sm:w-auto text-xs gap-2 transition-all cursor-pointer", copied && "border-emerald-500 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/5 cursor-auto")}
        >
            {copied ? (
                <>
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    Copied share URL!
                </>
            ) : (
                <>
                    <Share2 className="h-3.5 w-3.5" />
                    {label}
                </>
            )}
        </Button>
    )
}
