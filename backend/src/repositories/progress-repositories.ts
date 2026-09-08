import { prisma } from "../lib/prisma";
import { PlayerWithProgressModel } from "../models/progressModel";

export const createProgress = async (
  id: string,
): Promise<PlayerWithProgressModel> => {
  const newProgress = await prisma.player.create({
    data: {
      id: id,
      progress: {
        create: {
          currentState: 0,
        },
      },
    },
    include: {
      progress: true,
    },
  });

  return newProgress;
};

export const getPlayerProgressRepo = async (
  id: string,
): Promise<PlayerWithProgressModel | false> => {
  const playerProgress = await prisma.player.findUnique({
    where: { id: id },
    include: { progress: true },
  });

  return playerProgress ? playerProgress : false;
};

export const updatePlayerProgressRepo = async (
  id: string,
  passedRiddle?: string,
): Promise<PlayerWithProgressModel | false> => {
  const playerProgress = await getPlayerProgressRepo(id);

  if (!playerProgress || !playerProgress.progress) {
    return false;
  }

  if (passedRiddle && playerProgress.progress.currentState < 14) {
    const nextState = playerProgress.progress.currentState + 1;
    const updatedProgress = prisma.player.update({
      where: { id: id },
      data: {
        updatedAt: new Date(),
        progress: {
          update: {
            currentState: nextState,
            hasFinished: nextState === 14,
          },
        },
      },
      include: { progress: true },
    });

    return updatedProgress;
  }

  return prisma.player.update({
    where: { id: id },
    data: {
      updatedAt: new Date(),
    },
    include: { progress: true },
  });
};

export const resetProgressRepo = async (
  playerId: string,
): Promise<PlayerWithProgressModel | false> => {
  const progress = await getPlayerProgressRepo(playerId);

  if (!progress) {
    return false;
  }

  return prisma.player.update({
    where: { id: playerId },
    data: {
      progress: {
        update: {
          hasFinished: false,
          currentState: 0,
        },
      },
    },
    include: { progress: true },
  });
};
