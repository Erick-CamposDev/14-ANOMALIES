import { Hash } from "node:crypto";
import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import {
  getPublicRiddleRepo,
  updatePassedRiddle,
} from "../repositories/riddle-repositories";
import { AnswerRequest } from "../schemas/answer";
import generateHash from "../utils/hashAnswers";

export default async function sendAnswerService(
  id: string,
  body: AnswerRequest,
): Promise<responseModel<string>> {
  const hashAnswer = generateHash(body.answer);
  const currentRiddle = await getPublicRiddleRepo(id);

  if (!currentRiddle) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: "The riddle was not found!",
    };
  }

  if (hashAnswer !== currentRiddle.riddleAnswer) {
    return {
      statusCode: StatusCode.OK,
      body: "Wrong Answer! Try Again",
    };
  }

  await updatePassedRiddle(id, { hasPassed: true });

  return {
    statusCode: StatusCode.OK,
    body: "You have passed!",
  };
}
