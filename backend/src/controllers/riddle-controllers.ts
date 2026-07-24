import { Request, Response } from "express";
import getPublicRiddleService from "../services/getPublicRiddle";
import { AnswerRequest } from "../schemas/answer";
import sendAnswerService from "../services/sendAnswer";

export async function getPublicRiddle(req: Request, res: Response) {
  const id = String(req.params.id);
  const data = await getPublicRiddleService(id);

  res.status(data.statusCode).json(data.body);
}

export async function sendAnswer(req: Request, res: Response) {
  const id = String(req.params.id);
  const body: AnswerRequest = req.body;
  const data = await sendAnswerService(id, body);

  res.status(data.statusCode).json(data.body);
}
