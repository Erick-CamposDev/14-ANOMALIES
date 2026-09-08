import { Progress } from "../generated/prisma/client";

export interface PlayerWithProgressModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  progress: Progress | null;
}
