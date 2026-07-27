import fs from "fs";
import path from "path";
import { Riddle } from "../models/riddleModel";

const PATH_FILE = path.join(__dirname, "../data/riddles.json");

type RiddleFile = {
  riddleData: Riddle[];
};

export async function getAll(): Promise<Riddle[]> {
  const content = await fs.promises.readFile(PATH_FILE, "utf-8");
  const data = JSON.parse(content) as RiddleFile;
  return data.riddleData;
}

export const getPublicRiddleRepo = async (id: string) => {
  const riddles = getAll();

  const foundRiddle = (await riddles).find(
    (riddle: Riddle) => Number(id) === riddle.id,
  );

  if (!foundRiddle) return false;

  return foundRiddle;
};

export const getPreviousRiddle = async (id: string) => {
  const riddles = getAll();

  const foundRiddle = (await riddles).find(
    (riddle: Riddle) => Number(id) - 1 === riddle.id,
  );

  if (!foundRiddle) return false;

  return foundRiddle;
};

export const updatePassedRiddle = async (
  id: string,
  hasPassed: { hasPassed: true },
) => {
  const riddles = await getAll();
  const foundRiddle = riddles.find(
    (riddle: Riddle) => Number(id) === riddle.id,
  );

  if (!foundRiddle) return null;

  Object.assign(foundRiddle, hasPassed);

  const fileContent: RiddleFile = { riddleData: riddles };
  (await fs.promises.writeFile(PATH_FILE, JSON.stringify(fileContent, null, 2)),
    "utf-8");
  return foundRiddle;
};
