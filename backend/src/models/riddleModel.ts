type riddleContent = "text" | "audio" | "urlVideo" | "image";

export interface RiddleModel {
  id: number;
  requiredLevel: number;
  riddleText: string;
  riddleType: riddleContent;
  riddleHint: string;
  riddleAnswer: string;
}

export interface TextRiddle extends RiddleModel {
  riddleType: "text";
  riddleContent: string;
  riddleSubContent?: string;
}

export interface VideoRiddle extends RiddleModel {
  riddleType: "urlVideo";
  riddleContent: string;
}

export interface ImageRiddle extends RiddleModel {
  riddleType: "image";
  riddleContent: string;
  alternativeText: string;
}

export interface AudioRiddle extends RiddleModel {
  riddleType: "audio";
  riddleContent: string;
  alternativeText: string;
}

export type Riddle = TextRiddle | VideoRiddle | ImageRiddle | AudioRiddle;
export type publicRiddle = Omit<Riddle, "riddleAnswer">;
