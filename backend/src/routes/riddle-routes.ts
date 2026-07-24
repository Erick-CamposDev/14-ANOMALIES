import Route from "express";
import { getPublicRiddle, sendAnswer } from "../controllers/riddle-controllers";
import validateAnswer from "../middlewares/validateAnswerBody";

export const riddleRoute = Route();

riddleRoute.get("/anomaly/:id", getPublicRiddle);
riddleRoute.post("/anomaly/:id", validateAnswer, sendAnswer);
