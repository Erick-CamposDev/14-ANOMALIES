import Route from "express";
import { getPublicRiddle } from "../controllers/riddle-controllers";

export const riddleRoute = Route();

riddleRoute.get("/anomaly/:id", getPublicRiddle);
