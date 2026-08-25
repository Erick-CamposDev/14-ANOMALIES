import express, { json } from "express";
import cors from "cors";
import { riddleRoute } from "./routes/riddle-routes";
import { progressRoute } from "./routes/progress-routes";

export default function createApp() {
  const app = express();

  app.use(json());
  app.use(cors());
  app.use("/14anomalies/", riddleRoute);
  app.use("/14anomalies/", progressRoute);

  return app;
}
