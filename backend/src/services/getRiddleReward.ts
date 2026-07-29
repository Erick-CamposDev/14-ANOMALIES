import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import { RewardPageModel } from "../models/rewardPageModel";
import { Riddle } from "../models/riddleModel";
import {
  getAllRiddles,
  getRewardURL,
} from "../repositories/riddle-repositories";

export default async function getRiddleRewardService(): Promise<
  responseModel<string | RewardPageModel>
> {
  const riddles = await getAllRiddles();

  const isNotCompleted = riddles.some((riddle: Riddle) => !riddle.hasPassed);

  if (isNotCompleted) {
    return {
      statusCode: StatusCode.FORBIDDEN,
      body: "I see you're trying to get your reward more sooner... DON'T. I'll keep my eye on you",
    };
  }

  const reward = await getRewardURL();

  if (!reward) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: "The reward was not found!",
    };
  }

  return {
    statusCode: StatusCode.OK,
    body: reward,
  };
}
