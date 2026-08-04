import { expectedRiddles } from "../constants/expectedRiddles";
import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import {
  getPlayerProgressRepo,
  resetProgressRepo,
} from "../repositories/progress-repositories";
import { compareProgress } from "../utils/compareProgress";
import { receiveNotFoundResponse } from "../utils/receiveNotFoundResponse";

export default async function resetProgressService(
  playerId: string,
): Promise<responseModel<string>> {
  const foundPlayer = await getPlayerProgressRepo(playerId);

  if (!foundPlayer) return receiveNotFoundResponse("player");

  const resolvedRiddles = foundPlayer.progress.resolvedRiddles;

  const isCompleted = compareProgress(resolvedRiddles, expectedRiddles);

  if (!isCompleted) {
    return {
      statusCode: StatusCode.NO_CONTENT,
      body: "",
    };
  }

  await resetProgressRepo(playerId);

  return {
    statusCode: StatusCode.OK,
    body: "The progress was reseted successfully!",
  };
}
