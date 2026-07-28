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

  riddles.forEach((riddle: Riddle) => {
    if (!riddle.hasPassed) {
      return {
        statusCode: StatusCode.FORBIDDEN,
        body: "I'm watching you trying to get the reward more soon, this isn't ALLOWED. I will keep an eye on you.",
      };
    }
  });

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
