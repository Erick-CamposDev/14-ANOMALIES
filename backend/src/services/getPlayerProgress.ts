import { StatusCode } from "../enums/status-codes";
import { PlayerWithProgressModel } from "../models/progressModel";
import { CommonMessage, responseModel } from "../models/responseModel";
import { getPlayerProgressRepo } from "../repositories/progress-repositories";

export default async function getPlayerProgressService(
  id: string,
): Promise<responseModel<CommonMessage | PlayerWithProgressModel>> {
  const foundPlayer = await getPlayerProgressRepo(id);

  if (!foundPlayer) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: { message: "Player was not found" },
    };
  }

  return {
    statusCode: StatusCode.OK,
    body: foundPlayer,
  };
}
