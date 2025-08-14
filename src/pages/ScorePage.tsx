import{ useState, useEffect } from "react";
import axios from "axios";
import "../styles/ScorePage.css";

type ScoreItem = {
  _id?: string;
  username: string;
  score: number;
  createdAt: string;
};

export default function ScorePage() {
  const [scores, setScores] = useState<ScoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/score", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setScores(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/score/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScores(scores.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete score.");
    }
  };

  return (
    <div className="score-page">
      <h2>Score Board</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item, idx) => (
              <tr key={item._id || idx}>
                <td>{idx + 1}</td>
                <td>{item.score}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="score-delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}