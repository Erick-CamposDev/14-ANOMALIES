import Route from "express";
import {
  getPublicRiddle,
  getRiddleReward,
  sendAnswer,
} from "../controllers/riddle-controllers";
import validateAnswer from "../middlewares/validateAnswerBody";

export const riddleRoute = Route();

riddleRoute.get("/anomaly/:id/:playerId", getPublicRiddle);
riddleRoute.post("/anomaly/:id/:playerId", validateAnswer, sendAnswer);

riddleRoute.get("/reward/:playerId", getRiddleReward);
