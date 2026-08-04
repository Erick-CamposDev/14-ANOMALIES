import { expectedRiddles } from "../constants/expectedRiddles";
import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import { RewardPageModel } from "../models/rewardPageModel";
import { getPlayerProgressRepo } from "../repositories/progress-repositories";
import { getRewardURL } from "../repositories/riddle-repositories";
import { compareProgress } from "../utils/compareProgress";
import { receiveNotFoundResponse } from "../utils/receiveNotFoundResponse";

export default async function getRiddleRewardService(
  playerId: string,
): Promise<responseModel<string | RewardPageModel>> {
  const foundPlayer = await getPlayerProgressRepo(playerId);

  if (!foundPlayer) return receiveNotFoundResponse("player");

  const resolvedRiddles = foundPlayer.progress.resolvedRiddles;

  const isCompleted = await compareProgress(resolvedRiddles, expectedRiddles);

  if (!isCompleted) {
    return {
      statusCode: StatusCode.FORBIDDEN,
      body: "I see you're trying to get your reward more sooner... DON'T. I'll keep my eye on you",
    };
  }

  const reward = await getRewardURL();

  if (!reward) await receiveNotFoundResponse("reward");

  return {
    statusCode: StatusCode.OK,
    body: reward,
  };
}
