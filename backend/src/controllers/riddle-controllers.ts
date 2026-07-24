import { Request, Response } from "express";
import getPublicRiddleService from "../services/getPublicRiddle";

export async function getPublicRiddle(req: Request, res: Response) {
  const id = String(req.params.id);
  const data = await getPublicRiddleService(id);

  res.status(data.statusCode).json(data.body);
}
