const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function getHighScores() {
  const res = await fetch(`${API_BASE}/scores`);
  if (!res.ok) throw new Error("Failed to fetch scores");
  return res.json();
}

export async function postScore(score: number) {
  const res = await fetch(`${API_BASE}/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score })
  });
  if (!res.ok) throw new Error("Failed to post score");
  return res.json();
}
