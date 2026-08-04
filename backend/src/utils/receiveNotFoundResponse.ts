import { StatusCode } from "../enums/status-codes";
import { responseModel } from "../models/responseModel";

export const receiveNotFoundResponse = async (
  element: string,
): Promise<responseModel<string>> => {
  return {
    statusCode: StatusCode.NOT_FOUND,
    body: `The ${element} was not found!`,
  };
};
