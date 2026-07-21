import express from "express";
import json from "express";
import cors from "cors";

export default function createApp() {
  const app = express();

  app.use(json());
  app.use(cors());

  return app;
}
