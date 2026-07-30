import { StatusCode } from "../enums/status-codes";
import { BaseProgress } from "../models/progressModel";
import { responseModel } from "../models/responseModel";
import { getPlayerProgressRepo } from "../repositories/progress-repositories";

export default async function getPlayerProgressService(
  id: string,
): Promise<responseModel<string | BaseProgress>> {
  const foundPlayer = await getPlayerProgressRepo(id);

  if (!foundPlayer) {
    return {
      statusCode: StatusCode.NOT_FOUND,
      body: "Player was not found",
    };
  }

  return {
    statusCode: StatusCode.OK,
    body: foundPlayer,
  };
}
