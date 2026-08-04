import { StatusCode } from "../enums/status-codes";
import { CommonMessage, responseModel } from "../models/responseModel";

export const receiveNotFoundResponse = async (
  element: string,
): Promise<responseModel<CommonMessage>> => {
  return {
    statusCode: StatusCode.NOT_FOUND,
    body: { message: `The ${element} was not found!` },
  };
};
