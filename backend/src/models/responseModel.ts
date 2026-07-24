import { StatusCode } from "../enums/status-codes";

export interface responseModel<T> {
  statusCode: StatusCode;
  body: T;
}
