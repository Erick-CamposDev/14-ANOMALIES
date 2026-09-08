import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";
import {
  getPlayerProgressRepo,
  resetProgressRepo,
} from "../repositories/progress-repositories";
import { receiveNotFoundResponse } from "../utils/receiveNotFoundResponse";

export default async function resetProgressService(
  playerId: string,
): Promise<responseModel<CommonMessage>> {
  const foundPlayer = await getPlayerProgressRepo(playerId);

  if (!foundPlayer) return receiveNotFoundResponse("player");

  if (
    foundPlayer.progress?.currentState === null ||
    foundPlayer.progress?.hasFinished === null
  )
    return receiveNotFoundResponse("progress");

  const hasFinished = foundPlayer.progress?.hasFinished;

  if (!hasFinished) {
    return {
      statusCode: StatusCode.NO_CONTENT,
      body: { message: "" },
    };
  }

  await resetProgressRepo(playerId);

  return {
    statusCode: StatusCode.OK,
    body: { message: "The progress was reseted successfully!" },
  };
}
