import { Request, Response } from "express";
import startProgressGameService from "../services/startGameProgress";
import getPlayerProgressService from "../services/getPlayerProgress";
import updatePlayerProgressService from "../services/updatePlayerProgress";
import resetProgressService from "../services/resetRiddles";

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

export async function updatePlayerProgress(req: Request, res: Response) {
  const id = String(req.params.id);
  const updatedAt = new Date().toISOString();
  const data = await updatePlayerProgressService(id, updatedAt);

  res.status(data.statusCode).json(data.body);
}

export async function resetProgress(req: Request, res: Response) {
  const playerId = String(req.params.playerId);
  const data = await resetProgressService(playerId);

  res.status(data.statusCode).json(data.body);
}
