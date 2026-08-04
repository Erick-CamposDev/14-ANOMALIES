export const compareProgress = async (
  progress: string[],
  expected: typeof expectedRiddles,
) => {
  if (progress.length !== expected.length) return false;
  return progress.every((p: string, i: number) => p === expected[i]);
};
