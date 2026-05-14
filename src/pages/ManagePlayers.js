
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin.css";

function ManagePlayers() {

  const [teams, setTeams] = useState([]);   // 🔥 dynamic teams
  const [mode, setMode] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const [player, setPlayer] = useState({
    name: "",
    role: "",
    battingStyle: "",
    bowlingStyle: "",
    team: "",
    imageUrl: "",
    country: ""
  });

  /* ============================
     LOAD TEAMS FROM DB
  ============================ */
  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/teams");
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ============================
     LOAD PLAYERS BY TEAM
  ============================ */
  const loadTeamPlayers = async (team) => {
    try {
      const res = await axios.get(`http://localhost:5000/players/team/${team}`);
      setPlayers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ============================
     ADD PLAYER
  ============================ */
  const handleAddPlayer = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/players/add", player);
      setMessage(res.data.message || "Player Added!");

      setPlayer({
        name: "",
        role: "",
        battingStyle: "",
        bowlingStyle: "",
        team: "",
        imageUrl: "",
        country: ""
      });

    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Failed to add player"));
    }
  };

  /* ============================
     EDIT PLAYER
  ============================ */
  const handleEditPlayer = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/players/update/${editId}`,
        player
      );

      setMessage("✅ Player updated successfully");

      setEditId(null);

      setPlayer({
        name: "",
        role: "",
        battingStyle: "",
        bowlingStyle: "",
        team: "",
        imageUrl: "",
        country: ""
      });

      loadTeamPlayers(selectedTeam);

    } catch (err) {
      console.log(err.response?.data);
      setMessage("❌ " + (err.response?.data?.error || "Failed to update player"));
    }
  };

  /* ============================
     DELETE PLAYER
  ============================ */
  const deletePlayer = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/players/delete/${id}`);
      setMessage(res.data.message);
      loadTeamPlayers(selectedTeam);
    } catch (err) {
      setMessage("❌ Failed to delete player");
    }
  };

  return (
    <div className="admin-container">
      <div className="manage-card">

        <h2>Players Management</h2>

        {message && <p className="admin-message">{message}</p>}

        {/* TOP MENU */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <button onClick={() => setMode("ADD")}>Add Player</button>
          <button onClick={() => setMode("DELETE")}>Remove Player</button>
          <button onClick={() => setMode("EDIT")}>Edit Player</button>
        </div>

        {/* ================= ADD ================= */}
        {mode === "ADD" && (
          <form className="admin-form" onSubmit={handleAddPlayer}>

            <input
              type="text"
              placeholder="Player Name"
              value={player.name}
              onChange={(e) => setPlayer({ ...player, name: e.target.value })}
              required
            />

            <select
              value={player.role}
              onChange={(e) => setPlayer({ ...player, role: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="BATSMAN">BATSMAN</option>
              <option value="BOWLER">BOWLER</option>
              <option value="ALL-ROUNDER">ALL-ROUNDER</option>
              <option value="WICKET-KEEPER">WICKET-KEEPER</option>
            </select>

            <input
              type="text"
              placeholder="Batting Style"
              value={player.battingStyle}
              onChange={(e) => setPlayer({ ...player, battingStyle: e.target.value })}
            />

            <input
              type="text"
              placeholder="Bowling Style"
              value={player.bowlingStyle}
              onChange={(e) => setPlayer({ ...player, bowlingStyle: e.target.value })}
            />

            {/* TEAM DROPDOWN (DB) */}
            <select
              value={player.team}
              onChange={(e) => setPlayer({ ...player, team: e.target.value })}
              required
            >
              <option value="">Select Team</option>
              {teams.map(t => (
                <option key={t._id} value={t._id}>
                  {t.fullName} ({t.shortName})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Image URL"
              value={player.imageUrl}
              onChange={(e) => setPlayer({ ...player, imageUrl: e.target.value })}
            />

            {/* COUNTRY */}
            <select
              value={player.country}
              onChange={(e) => setPlayer({ ...player, country: e.target.value })}
              required
            >
              <option value="">Select Country</option>
              <option value="India">India 🇮🇳</option>
              <option value="Australia">Australia 🇦🇺</option>
              <option value="England">England 🏴</option>
              <option value="South Africa">South Africa 🇿🇦</option>
              <option value="New Zealand">New Zealand 🇳🇿</option>
              <option value="West Indies">West Indies 🏝️</option>
              <option value="Afghanistan">Afghanistan 🇦🇫</option>
              <option value="Sri Lanka">Sri Lanka 🇱🇰</option>
              <option value="Bangladesh">Bangladesh 🇧🇩</option>
            </select>

            <button type="submit">Add Player</button>
          </form>
        )}

        {/* ================= DELETE ================= */}
        {mode === "DELETE" && (
          <>
            <select
              value={selectedTeam}
              onChange={(e) => {
                const t = e.target.value;
                setSelectedTeam(t);
                if (t) loadTeamPlayers(t);
              }}
            >
              <option value="">Select Team</option>
              {teams.map(t => (
                <option key={t._id} value={t._id}>
                  {t.shortName}
                </option>
              ))}
            </select>

            {players.map((p) => (
              <div key={p._id} className="history-card">
               <h4>
                {p.name} ({teams.find(t => t._id === p.team)?.shortName || p.team}) {p.country !== "India" && "✈️"}
                </h4>               
                <button onClick={() => deletePlayer(p._id)}>Delete</button>
              </div>
            ))}
          </>
        )}

        {/* ================= EDIT ================= */}
        {mode === "EDIT" && (
          <>
            <select
              value={selectedTeam}
              onChange={(e) => {
                const t = e.target.value;
                setSelectedTeam(t);
                setEditId(null);
                if (t) loadTeamPlayers(t);
              }}
            >
              <option value="">Select Team</option>
              {teams.map(t => (
                <option key={t._id} value={t._id}>
                  {t.shortName}
                </option>
              ))}
            </select>

            {players.map((p) => (
              <div key={p._id} className="history-card">
                <h4>
                  {p.name} ({p.team}) {p.country !== "India" && "✈️"}
                </h4>

                <button
                  onClick={() => {
                    setEditId(p._id);
                    setPlayer({
                      name: p.name,
                      role: p.role,
                      battingStyle: p.battingStyle,
                      bowlingStyle: p.bowlingStyle,
                      team: p.team,
                      imageUrl: p.imageUrl,
                      country: p.country || "India"
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            ))}

            {editId && (
              <form className="admin-form" onSubmit={handleEditPlayer}>
                <h3>Edit Player</h3>

                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => setPlayer({ ...player, name: e.target.value })}
                />

                <select
                  value={player.role}
                  onChange={(e) => setPlayer({ ...player, role: e.target.value })}
                >
                  <option value="BATSMAN">BATSMAN</option>
                  <option value="BOWLER">BOWLER</option>
                  <option value="ALL-ROUNDER">ALL-ROUNDER</option>
                  <option value="WICKET-KEEPER">WICKET-KEEPER</option>
                </select>

                <input
                  type="text"
                  value={player.battingStyle}
                  onChange={(e) => setPlayer({ ...player, battingStyle: e.target.value })}
                />

                <input
                  type="text"
                  value={player.bowlingStyle}
                  onChange={(e) => setPlayer({ ...player, bowlingStyle: e.target.value })}
                />

                <input
                  type="text"
                  value={player.imageUrl}
                  onChange={(e) => setPlayer({ ...player, imageUrl: e.target.value })}
                />

                <select
                  value={player.country}
                  onChange={(e) => setPlayer({ ...player, country: e.target.value })}
                >
                  <option value="India">India 🇮🇳</option>
                  <option value="Australia">Australia 🇦🇺</option>
                  <option value="England">England 🏴</option>
                  <option value="South Africa">South Africa 🇿🇦</option>
                  <option value="New Zealand">New Zealand 🇳🇿</option>
                </select>

                <button type="submit">Update Player</button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default ManagePlayers;