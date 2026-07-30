import Router from "express";
import {
  getPlayerProgress,
  startProgressGame,
} from "../controllers/progress-controllers";

export const progressRoute = Router();

progressRoute.post("/progress/start", startProgressGame);
progressRoute.get("/progress/:id", getPlayerProgress);
