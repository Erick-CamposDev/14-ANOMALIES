import { NextFunction, Request, Response } from "express";
import { answerRequest } from "../schemas/answer";
import { StatusCode } from "../enums/status-codes";
import z from "zod";

export default async function validateAnswer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validateAnswerSchema = answerRequest.safeParse(req.body);

  if (!validateAnswerSchema.success) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Error: Invalid answer",
      error: z.flattenError(validateAnswerSchema.error).fieldErrors,
    });
  }

  next();
}
