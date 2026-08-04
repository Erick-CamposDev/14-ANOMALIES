import { StatusCode } from "../enums/status-codes";

export type CommonMessage = {
  message: string;
};

export interface responseModel<T> {
  statusCode: StatusCode;
  body: T | CommonMessage;
}
