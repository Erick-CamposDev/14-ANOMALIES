import z from "zod";

export const answerRequest = z.object({
  answer: z.string(),
});

export type AnswerRequest = z.infer<typeof answerRequest>;
