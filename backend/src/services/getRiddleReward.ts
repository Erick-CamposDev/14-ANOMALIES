import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";
import { RewardPageModel } from "../models/rewardPageModel";
import { getPlayerProgressRepo } from "../repositories/progress-repositories";
import { getRewardURL } from "../repositories/riddle-repositories";
import { receiveNotFoundResponse } from "../utils/receiveNotFoundResponse";

export default async function getRiddleRewardService(
  playerId: string,
): Promise<responseModel<CommonMessage | RewardPageModel>> {
  const foundPlayer = await getPlayerProgressRepo(playerId);

  if (!foundPlayer) return receiveNotFoundResponse("player");

  if (!foundPlayer.progress?.currentState)
    return receiveNotFoundResponse("progress");

  if (!foundPlayer.progress.hasFinished) {
    return {
      statusCode: StatusCode.FORBIDDEN,
      body: {
        message:
          "I see you're trying to get your reward more sooner... DON'T. I'll keep my eye on you",
      },
    };
  }

  const reward = await getRewardURL();

  if (!reward) await receiveNotFoundResponse("reward");

  return {
    statusCode: StatusCode.OK,
    body: reward,
  };
}
