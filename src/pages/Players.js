import React, { useEffect, useState } from "react";
import axios from "axios";

function Players({ teamName }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, [teamName]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/players/team/${teamName}`
      );
      setPlayers(res.data);
    } catch (err) {
      console.error(err);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading players...</p>;

  return (
    <div>
      <h2>{teamName} Players</h2>

      {players.length === 0 && <p>No players found</p>}

      {players.map(player => (
        <div key={player._id}>
          <h3>{player.name}</h3>
          <p>{player.role}</p>
          <p>{player.country}</p>
        </div>
      ))}
    </div>
  );
}

export default Players;