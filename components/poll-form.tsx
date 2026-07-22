"use client";

import { useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

import { pollFormSchema } from "@/lib/schemas"
import { formatDateTimeValue } from "@/lib/dataHelper";
import { PollFormProps, PollFormValues } from "@/lib/types";
import { useRouter } from "next/navigation";

export const PollForm = ({ action, initialData }: PollFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const router = useRouter();

    const isEditMode = !!initialData;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PollFormValues>({
        resolver: zodResolver(pollFormSchema),
        defaultValues: initialData || {
            question: "",
            options: [{ value: "" }, { value: "" }],
            expiresAt: "",
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: "options",
        control,
    })

    const handlePublishPoll = async (data: PollFormValues) => {
        setIsSubmitting(true)
        setServerError(null)
        try {
            // normalize datetime-local (client-local) into an ISO string before sending
            const payload: PollFormValues = {
                ...data,
                expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
            }

            const result = await action(payload);

            if (result && !result.success) {
                setServerError(result.error || "Something went wrong.");
                return;
            }
            if (result?.id?.toString()) {
                router.push(`/polls/${result?.id.toString()}`)
            }
        } catch (error) {
            console.log(error);
            setServerError("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(handlePublishPoll)}>
            <CardContent className="space-y-6">
                {/* Poll Question */}
                <Field data-invalid={!!errors.question}>
                    <FieldLabel htmlFor="question">Poll Question</FieldLabel>
                    <Textarea
                        id="question"
                        placeholder="What would you like to ask your audience?"
                        className="min-h-24 resize-none bg-background/50"
                        aria-invalid={!!errors.question}
                        disabled={isSubmitting}
                        {...register("question")}
                    />
                    <FieldError>{errors.question?.message}</FieldError>
                </Field>

                {/* Choices Group */}
                <div className="space-y-3.5">
                    <div>
                        <span className="text-sm font-medium leading-none">Poll Options</span>
                        <p className="text-xs text-muted-foreground mt-1">
                            Provide between 2 and 6 choices for your participants.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {fields.map((fieldItem, index) => {
                            const optionError = errors.options?.[index]?.value
                            return (
                                <Field key={fieldItem.id} data-invalid={!!optionError}>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id={`option-${index}`}
                                            placeholder={`Choice #${index + 1}`}
                                            className="bg-background/50"
                                            aria-invalid={!!optionError}
                                            disabled={isSubmitting}
                                            {...register(`options.${index}.value` as const)}
                                        />

                                        {fields.length > 2 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                disabled={isSubmitting}
                                                onClick={() => remove(index)}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Remove choice</span>
                                            </Button>
                                        )}
                                    </div>
                                    <FieldError>{optionError?.message}</FieldError>
                                </Field>
                            )
                        })}
                    </div>

                    {fields.length < 6 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-1 border-dashed hover:border-solid"
                            disabled={isSubmitting}
                            onClick={() => append({ value: "" })}
                        >
                            <Plus className="mr-2 h-3 w-3" /> Add Option
                        </Button>
                    )}
                </div>

                {/* Expiry Date & Time Picker */}
                <Controller
                    control={control}
                    name="expiresAt"
                    render={({ field }) => (
                        <Field data-invalid={!!errors.expiresAt}>
                            <FieldLabel>Expiration Date & Time (Optional)</FieldLabel>
                            <Input
                                type="datetime-local"
                                value={formatDateTimeValue(field.value)}
                                onChange={(event) => field.onChange(event.target.value)}
                                disabled={isSubmitting}
                                min={formatDateTimeValue(new Date())}
                            />
                            <FieldDescription>
                                Choose the exact date and time when voting should close.
                            </FieldDescription>
                            <FieldError>{errors.expiresAt?.message}</FieldError>
                        </Field>
                    )}
                />

                {serverError && (
                    <p className="text-sm font-medium text-destructive mt-2">{serverError}</p>
                )}
            </CardContent>

            <CardFooter className="border-t bg-muted/30 px-6 py-4 flex items-center justify-end">
                <Button
                    type="submit"
                    className="w-full sm:w-auto px-5"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEditMode ? "Updating..." : "Publishing..."}
                        </>
                    ) : (
                        isEditMode ? "Save Changes" : "Publish Poll"
                    )}
                </Button>
            </CardFooter>
        </form>
    )
}