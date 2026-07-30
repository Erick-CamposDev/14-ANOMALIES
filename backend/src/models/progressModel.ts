export interface Progress {
  resolvedRiddles: string[];
  createdAt: string;
  updatedAt: string | null;
}

export interface BaseProgress {
  playerId: string;
  progress: Progress;
}
