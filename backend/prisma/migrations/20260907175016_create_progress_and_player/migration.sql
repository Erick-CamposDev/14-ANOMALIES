-- CreateTable
CREATE TABLE "Player" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" UUID NOT NULL,
    "currentState" INTEGER NOT NULL,
    "hasFinished" BOOLEAN NOT NULL DEFAULT false,
    "playerId" UUID NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Progress_playerId_key" ON "Progress"("playerId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
