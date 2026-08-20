export default function generateId() {
  const hasId = localStorage.getItem("playerId");

  if (hasId) {
    return null;
  }

  const newId = crypto.randomUUID();

  localStorage.setItem("playerId", newId);

  return newId;
}
