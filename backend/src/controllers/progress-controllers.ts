import { Request, Response } from "express";
import startProgressGameService from "../services/startGameProgress";
import getPlayerProgressService from "../services/getPlayerProgress";

export async function startProgressGame(req: Request, res: Response) {
  const playerId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = await startProgressGameService(playerId, createdAt);

  res.status(data.statusCode).json(data.body);
}

export async function getPlayerProgress(req: Request, res: Response) {
  const id = String(req.params.id);

  const data = await getPlayerProgressService(id);

  res.status(data.statusCode).json(data.body);
}
