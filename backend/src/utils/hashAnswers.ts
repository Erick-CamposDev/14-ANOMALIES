import crypto from "crypto";

export default function generateHash(text: string): string {
  const normalizedText = text.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalizedText).digest("hex");
}
