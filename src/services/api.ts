const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function getHighScores() {
  const res = await fetch(`${API_BASE}/score`);
  if (!res.ok) throw new Error("Failed to fetch scores");
  return res.json();
}

export async function postScore(score: number, bestScore?: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(bestScore !== undefined ? { score, bestScore } : { score })
  });
  if (!res.ok) throw new Error("Failed to post score");
  return res.json();
}

export async function getUserBestScore() {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/score/best`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch best score");
  return res.json();
}