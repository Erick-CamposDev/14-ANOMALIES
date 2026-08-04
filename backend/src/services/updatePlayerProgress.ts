import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";
import { updatePlayerProgressRepo } from "../repositories/progress-repositories";

export default async function updatePlayerProgressService(
  id: string,
  updatedAt: string,
): Promise<responseModel<CommonMessage>> {
  const foundPlayer = await updatePlayerProgressRepo(id, updatedAt);

  if (!foundPlayer) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: { message: "The player was not found!" },
    };
  }

  return {
    statusCode: StatusCode.OK,
    body: { message: "Updated player progress succesfully" },
  };
}
