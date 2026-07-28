import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import { Riddle } from "../models/riddleModel";
import {
  getAllRiddles,
  resetRiddlesRepo,
} from "../repositories/riddle-repositories";

export default async function resetRiddlesService(): Promise<
  responseModel<string>
> {
  const riddles = await getAllRiddles();
  const isCompleted = riddles.some((riddle: Riddle) => riddle.hasPassed);

  if (!isCompleted) {
    return {
      statusCode: StatusCode.NO_CONTENT,
      body: "",
    };
  }

  await resetRiddlesRepo();

  return {
    statusCode: StatusCode.OK,
    body: "The riddles were reseted successfully!",
  };
}
