import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import { publicRiddle } from "../models/riddleModel";
import {
  getPreviousRiddle,
  getPublicRiddleRepo,
} from "../repositories/riddle-repositories";

export default async function getPublicRiddleService(
  id: string,
): Promise<responseModel<string | publicRiddle>> {
  const foundRiddle = await getPublicRiddleRepo(id);

  if (!foundRiddle) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: "The riddle was not found!",
    };
  }

  if (foundRiddle.id !== 1) {
    const previousRiddle = await getPreviousRiddle(id);
    if (!previousRiddle || !previousRiddle.hasPassed) {
      return {
        statusCode: StatusCode.FORBIDDEN,
        body: "ERROR: Oops! I didn't agree to cheat, did i? Pass the previous riddles, cheater.",
      };
    }
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
