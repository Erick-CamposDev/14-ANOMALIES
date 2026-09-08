import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";
import { publicRiddle } from "../models/riddleModel";
import { getPlayerProgressRepo } from "../repositories/progress-repositories";
import { getPublicRiddleRepo } from "../repositories/riddle-repositories";
import { receiveNotFoundResponse } from "../utils/receiveNotFoundResponse";

export default async function getPublicRiddleService(
  id: string,
  playerId: string,
): Promise<responseModel<CommonMessage | publicRiddle>> {
  const foundRiddle = await getPublicRiddleRepo(id);
  const foundPlayer = await getPlayerProgressRepo(playerId);

  if (!foundRiddle) return receiveNotFoundResponse("riddle");
  if (!foundPlayer) return receiveNotFoundResponse("player");

  if (
    foundPlayer.progress?.currentState === null ||
    foundPlayer.progress?.currentState === undefined
  )
    return receiveNotFoundResponse("progress");

  const currentState = foundPlayer.progress?.currentState;

  if (foundRiddle.id !== 1 && currentState < foundRiddle.requiredLevel) {
    return {
      statusCode: StatusCode.FORBIDDEN,
      body: {
        message:
          "You're not allowed to get the access for the future riddles, CHEATER.",
      },
    };
  }

  const {
    riddleAnswer,
    ...publicRiddle
  }: { riddleAnswer: string } & publicRiddle = foundRiddle;

  return {
    statusCode: StatusCode.OK,
    body: publicRiddle,
  };
}
