import fs from "fs";
import path from "path";
import { BaseProgress } from "../models/progressModel";

const PROGRESS_PATH = path.join(__dirname, "../data/progress.json");

type ProgressData = {
  playersProgress: BaseProgress[];
};

export const getAllProgress = async (): Promise<BaseProgress[]> => {
  const content = await fs.promises.readFile(PROGRESS_PATH, "utf-8");
  const data = JSON.parse(content) as ProgressData;
  return data.playersProgress;
};

export const createProgress = async (id: string, createdAt: string) => {
  const progress = await getAllProgress();
  const newProgressInfo: BaseProgress = {
    playerId: id,
    progress: {
      createdAt: createdAt,
      updatedAt: null,
      resolvedRiddles: [],
    },
  };

  progress.push(newProgressInfo);

  const fileContent: ProgressData = { playersProgress: progress };

  await fs.promises.writeFile(
    PROGRESS_PATH,
    JSON.stringify(fileContent, null, 2),
    "utf-8",
  );
};

export const getPlayerProgressRepo = async (id: string) => {
  const progress = await getAllProgress();
  const foundPlayer = progress.find((p: BaseProgress) => id === p.playerId);

  if (!foundPlayer) {
    return false;
  }

  return foundPlayer;
};
