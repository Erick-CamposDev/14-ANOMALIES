import express, { json } from "express";

import cors from "cors";
import { riddleRoute } from "./routes/riddle-routes";

export default function createApp() {
  const app = express();

  app.use(json());
  app.use(cors());
  app.use("/14anomalies/", riddleRoute);

  return app;
}
