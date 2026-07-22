"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { DeleteButtonProps } from "@/lib/types";
import { useRouter } from "next/navigation";


export function DeleteButton({ id, deleteAction }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    setErrorMessage(null); // Clear previous errors

    startTransition(async () => {
      const result = await deleteAction(id);

      if (!result.success) {
        // Safe message parsed successfully without Next.js intercepting it
        console.log(result.error)
        setErrorMessage(result.error || "An unexpected error occurred.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full items-end">
      <Button
        variant="destructive"
        disabled={isPending}
        onClick={handleDelete}
        className="gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            <Trash2 className="h-4 w-4" />
          </>
        )}
      </Button>

      {errorMessage && (
        <p className="text-xs font-medium text-destructive mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}