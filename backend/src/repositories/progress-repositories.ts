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
      resolvedRiddles: ["anomaly-0"],
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
  const progresses = await getAllProgress();
  const foundPlayer = progresses.find((p: BaseProgress) => id === p.playerId);

  if (!foundPlayer) {
    return false;
  }

  return foundPlayer;
};

export const updatePlayerProgressRepo = async (
  id: string,
  updatedAt: string,
  passedRiddle?: string,
) => {
  const progresses = await getAllProgress();
  const foundPlayer = progresses.find((p: BaseProgress) => id === p.playerId);

  if (!foundPlayer) return false;

  if (passedRiddle) {
    const playerProgress = foundPlayer.progress.resolvedRiddles;
    playerProgress.push(passedRiddle);
  }

  foundPlayer.progress.updatedAt = updatedAt;

  const fileContent: ProgressData = { playersProgress: progresses };

  await fs.promises.writeFile(
    PROGRESS_PATH,
    JSON.stringify(fileContent, null, 2),
    "utf-8",
  );

  return true;
};

export const resetProgressRepo = async (playerId: string) => {
  const progresses = await getAllProgress();

  const foundPlayer = progresses.find(
    (p: BaseProgress) => playerId === p.playerId,
  );

  if (!foundPlayer) return false;

  foundPlayer.progress.resolvedRiddles = [];

  const fileContent: ProgressData = { playersProgress: progresses };

  await fs.promises.writeFile(
    PROGRESS_PATH,
    JSON.stringify(fileContent, null, 2),
    "utf-8",
  );
};
