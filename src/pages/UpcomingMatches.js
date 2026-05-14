import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UpcomingMatches.css";
import PageHeader from "../components/PageHeader";

function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchUpcoming();
  }, []);

  /* ================= FETCH UPCOMING ================= */
  const fetchUpcoming = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/matches/upcoming"
      );
      setMatches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= START MATCH ================= */
  const startMatch = async (id) => {
    if (!window.confirm("Start this match now?")) return;

    try {
      setLoadingId(id);
      await axios.post(
        `http://localhost:5000/matches/start/${id}`
      );

      alert("✅ Match started successfully");
      fetchUpcoming();

    } catch (err) {
      alert(
        err.response?.data?.message || "❌ Failed to start match"
      );
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= DELETE MATCH ================= */
  const deleteMatch = async (id) => {
    if (!window.confirm("Delete this upcoming match?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/matches/delete/${id}`
      );

      // ✅ SUCCESS POPUP
      alert(res.data.message || "✅ Upcoming Match deleted successfully");

      // ✅ Refresh upcoming list
      fetchUpcoming();

    } catch (err) {
      // ❌ ERROR POPUP
      alert(
        err.response?.data?.message || "❌ Delete failed"
      );
    }
  };

  return (
    <div className="upcoming-container">
      <PageHeader title="Upcoming Matches" />

      {matches.length === 0 && (
        <p>No upcoming matches scheduled</p>
      )}

      {matches.map((match) => (
        <div key={match._id} className="upcoming-card">

          <h3>
            {match.team1?.shortName} 🆚 {match.team2?.shortName}
          </h3>

          <p>🏟 {match.venue}</p>
          <p>🕒 {match.scheduledTimeString}</p>

          <div className="btn-row">
            <button
              disabled={loadingId === match._id}
              onClick={() => startMatch(match._id)}
            >
              {loadingId === match._id
                ? "Starting..."
                : "Start"}
            </button>

            <button onClick={() => deleteMatch(match._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingMatches;