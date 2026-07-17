import { z } from "zod"

// Create Poll Schema
export const pollFormSchema = z.object({
    question: z.string()
        .min(5, { message: "Question must be at least 5 characters long." })
        .max(500, { message: "Question cannot exceed 500 characters." }),
    options: z
        .array(
            z.object({
                value: z.string().min(1, { message: "Option choice cannot be empty." }),
            })
        )
        .min(2, { message: "You must provide at least 2 options." })
        .max(6, { message: "You can add a maximum of 6 options." }),
    expiresAt: z.date().optional(),
})

export type PollFormValues = z.infer<typeof pollFormSchema>