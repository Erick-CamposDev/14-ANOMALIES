import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";
import { createProgress } from "../repositories/progress-repositories";

export default async function startProgressGameService(
  id: string,
): Promise<responseModel<CommonMessage>> {
  await createProgress(id);

  return {
    statusCode: StatusCode.OK,
    body: { message: "Player added succesfully!" },
  };
}
