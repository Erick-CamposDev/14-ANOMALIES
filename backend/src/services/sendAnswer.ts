import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";
import {
  getPlayerProgressRepo,
  updatePlayerProgressRepo,
} from "../repositories/progress-repositories";
import { getPublicRiddleRepo } from "../repositories/riddle-repositories";
import { AnswerRequest } from "../schemas/answer";
import generateHash from "../utils/hashAnswers";
import { receiveNotFoundResponse } from "../utils/receiveNotFoundResponse";

export default async function sendAnswerService(
  id: string,
  playerId: string,
  body: AnswerRequest,
): Promise<responseModel<CommonMessage>> {
  const hashAnswer = generateHash(body.answer);
  const currentRiddle = await getPublicRiddleRepo(id);
  const foundPlayer = await getPlayerProgressRepo(playerId);

  if (!currentRiddle) return receiveNotFoundResponse("riddle");

  if (!foundPlayer) return receiveNotFoundResponse("player");

  if (hashAnswer !== currentRiddle.riddleAnswer) {
    return {
      statusCode: StatusCode.OK,
      body: { message: "Wrong Answer! Try Again", type: "wrong" },
    };
  }

  const resolvedRiddles = foundPlayer.progress.resolvedRiddles;

  if (!resolvedRiddles.includes(`anomaly-${Number(id) - 1}`)) {
    return {
      statusCode: StatusCode.FORBIDDEN,
      body: {
        message: "Don't even try to answer more sooner, this isn't allowed.",
      },
    };
  }

  const updatedAt = new Date().toISOString();

  await updatePlayerProgressRepo(playerId, updatedAt, `anomaly-${id}`);

  return {
    statusCode: StatusCode.OK,
    body: { message: "You have passed!", type: "success" },
  };
}
