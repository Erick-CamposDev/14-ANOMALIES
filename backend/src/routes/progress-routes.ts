import Router from "express";
import {
  getPlayerProgress,
  resetProgress,
  startProgressGame,
  updatePlayerProgress,
} from "../controllers/progress-controllers";

export const progressRoute = Router();

progressRoute.post("/start/:id", startProgressGame);
progressRoute.get("/progress/:id", getPlayerProgress);
progressRoute.patch("/progress/:id", updatePlayerProgress);
progressRoute.post("/reset/:playerId", resetProgress);
