import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Teams.css";

function TeamPlayers({ teamName, onBack }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamPlayers();
  }, [teamName]);

  const fetchTeamPlayers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/players/team/${teamName.toUpperCase()}`
      );

      setPlayers(res.data);
    } catch (err) {
      console.error("Failed to load players", err);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Overseas check
  const isOverseas = (country) => {
    if (!country) return false;
    return country.trim().toLowerCase() !== "india";
  };

  return (
    <div className="team-players-wrapper">
      <button className="back-btn" onClick={onBack}>
        ⬅ Back
      </button>

      <h2>{teamName.toUpperCase()} Players</h2>

      {loading && <p>Loading players...</p>}

      {!loading && players.length === 0 && (
        <p>No players found for this team</p>
      )}

      <div className="players-grid">
        {players.map((player) => (
          <div key={player._id} className="player-card">

            {/* ✅ PLAYER IMAGE (FIXED) */}
            {player.imageUrl && (
              <img
                src={player.imageUrl}
                alt={player.name}
                className="player-image"
              />
            )}

            <h3>{player.name}</h3>
            <p>{player.role}</p>
            <p>
              🌍 {player.country}
              {isOverseas(player.country) && " ✈️"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamPlayers;