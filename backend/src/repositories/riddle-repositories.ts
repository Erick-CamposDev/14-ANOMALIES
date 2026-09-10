import fs from "fs";
import path from "path";
import { Riddle } from "../models/riddleModel";
import { RewardPageModel } from "../models/rewardPageModel";
import { rewardPageInfo } from "../data/reward";

const PATH_FILE = [
  path.join(__dirname, "../data/riddles.json"),
  path.join(__dirname, "data/riddles.json"),
].find((filePath) => fs.existsSync(filePath));

type RiddleFile = {
  riddleData: Riddle[];
};

export async function getAllRiddles(): Promise<Riddle[]> {
  if (!PATH_FILE) throw new Error("Riddle data file was not found");

  const content = await fs.promises.readFile(PATH_FILE, "utf-8");
  const data = JSON.parse(content) as RiddleFile;
  return data.riddleData;
}

export const getPublicRiddleRepo = async (id: string) => {
  const riddles = getAllRiddles();

  const foundRiddle = (await riddles).find(
    (riddle: Riddle) => Number(id) === riddle.id,
  );

  if (!foundRiddle) return false;

  return foundRiddle;
};

export const getRewardURL = async (): Promise<RewardPageModel> => {
  return rewardPageInfo;
};
