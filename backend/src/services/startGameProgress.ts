import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";
import { createProgress } from "../repositories/progress-repositories";

export default async function startProgressGameService(
  id: string,
  createdAt: string,
): Promise<responseModel<string>> {
  await createProgress(id, createdAt);

  return {
    statusCode: StatusCode.OK,
    body: "Player added succesfully!",
  };
}
