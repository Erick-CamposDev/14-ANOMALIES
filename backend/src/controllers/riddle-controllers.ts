import { Request, Response } from "express";
import getPublicRiddleService from "../services/getPublicRiddle";
import { AnswerRequest } from "../schemas/answer";
import sendAnswerService from "../services/sendAnswer";
import getRiddleRewardService from "../services/getRiddleReward";
import resetRiddlesService from "../services/resetRiddles";

export async function getPublicRiddle(req: Request, res: Response) {
  const id = String(req.params.id);
  const playerId = String(req.params.playerId);
  const data = await getPublicRiddleService(id, playerId);

  res.status(data.statusCode).json(data.body);
}

export async function sendAnswer(req: Request, res: Response) {
  const id = String(req.params.id);
  const playerId = String(req.params.playerId);
  const body: AnswerRequest = req.body;
  const data = await sendAnswerService(id, playerId, body);

  res.status(data.statusCode).json(data.body);
}

export async function getRiddleReward(req: Request, res: Response) {
  const playerId = String(req.params.playerId);
  const data = await getRiddleRewardService(playerId);

  res.status(data.statusCode).json(data.body);
}
