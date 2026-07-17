"use client"

import { useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2, Plus, X } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "@/components/ui/field"

import { pollFormSchema, PollFormValues } from "@/lib/schemas"
import { createPoll } from "@/actions/poll.action"

export default function CreatePollPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PollFormValues>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      question: "Who will win todays match",
      options: [{ value: "Sri Lanka" }, { value: "Bangladesh" }],
      expiresAt: undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  })

  const handlePublishPoll = async (data: PollFormValues) => {
    setIsSubmitting(true)
    try {
      const result = await createPoll(data);

      if (result.error) {
        console.log(result.error);
      }

      // reset()

    } catch (error) {
      console.log(error);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <form onSubmit={handleSubmit(handlePublishPoll)}>
        <Card className="shadow-md border border-border/60">
          <CardHeader className="space-y-1.5">
            <CardTitle className="text-2xl font-bold tracking-tight">Create a Poll</CardTitle>
            <CardDescription>
              Get real-time feedback from your community instantly.
            </CardDescription>
          </CardHeader>

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

            {/* Expiry Date Picker */}
            <Controller
              control={control}
              name="expiresAt"
              render={({ field }) => (
                <Field data-invalid={!!errors.expiresAt}>
                  <FieldLabel>Expiration Date (Optional)</FieldLabel>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background/50",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>No expiration</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldDescription>
                    When the timer runs out, users will no longer be able to submit votes.
                  </FieldDescription>
                  <FieldError>{errors.expiresAt?.message}</FieldError>
                </Field>
              )}
            />
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
                  Publishing...
                </>
              ) : (
                "Publish Poll"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}