import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import { updatePlayerProgressRepo } from "../repositories/progress-repositories";

export default async function updatePlayerProgressService(
  id: string,
  updatedAt: string,
): Promise<responseModel<string>> {
  const foundPlayer = await updatePlayerProgressRepo(id, updatedAt);

  if (!foundPlayer) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: "The player was not found!",
    };
  }

  return {
    statusCode: StatusCode.OK,
    body: "Updated player progress succesfully",
  };
}
