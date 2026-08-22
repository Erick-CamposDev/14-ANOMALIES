import { StatusCode } from "../enums/status-codes";

export type CommonMessage = {
  message: string;
  type?: "success" | "wrong";
};

export interface responseModel<T> {
  statusCode: StatusCode;
  body: T | CommonMessage;
}
