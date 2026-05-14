import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin.css";

function ManageTeams() {

  const [teams, setTeams] = useState([]);
  const [mode, setMode] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState({
    name: "",
    shortName: "",
    captain: "",
    coach: "",
    homeGround: "",
    owner: "",
    foundedYear: "",
    titlesWon: "",
    logoUrl: ""
  });

  

  /* ================= LOAD TEAMS ================= */
  const loadTeams = async () => {
    const res = await axios.get("http://localhost:5000/teams");
    setTeams(res.data);
  };

  const loadPlayers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/players");
    setPlayers(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    loadTeams();
    loadPlayers();
  }, []);

  const loadPlayersByTeam = async (shortName) => {
  try {
    const res = await axios.get(`http://localhost:5000/players/team/${shortName}`);
    setPlayers(res.data);
  } catch (err) {
    console.log(err);
  }
};

  /* ================= ADD ================= */
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/teams/add", team);
      setMessage(res.data.message);
      loadTeams();
    } catch (err) {
      setMessage("❌ Failed to add team");
    }
  };

  /* ================= DELETE ================= */
  const deleteTeam = async (id) => {
    await axios.delete(`http://localhost:5000/teams/delete/${id}`);
    loadTeams();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/teams/update/${editId}`,
        team
      );
      setMessage(res.data.message);
      setEditId(null);
      loadTeams();
    } catch {
      setMessage("❌ Failed to update");
    }
  };

  return (
    <div className="admin-container">
      <div className="manage-card">

        <h2>Team Management</h2>
        {message && <p>{message}</p>}

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setMode("ADD")}>Add Team</button>
          <button onClick={() => setMode("EDIT")}>Edit Team</button>
          <button onClick={() => setMode("DELETE")}>Delete Team</button>
        </div>

        {/* ================= ADD FORM ================= */}
        {mode === "ADD" && (
          <form className="admin-form" onSubmit={handleAdd}>
            <input placeholder="Team Name" onChange={e => setTeam({...team,name:e.target.value})}/>
            <input placeholder="Short Name" onChange={e => {const value = e.target.value; setTeam({ ...team, shortName: value }); loadPlayersByTeam(value);  }}/>   
<select
  value={team.captain}
  onChange={(e) => setTeam({ ...team, captain: e.target.value })}
  required
>
  <option value="">Select Captain</option>

  {players.map(p => (
    <option key={p._id} value={p.name}>
      {p.name}
    </option>
  ))}
</select>            <input placeholder="Coach" onChange={e => setTeam({...team,coach:e.target.value})}/>
            <input placeholder="Home Ground" onChange={e => setTeam({...team,homeGround:e.target.value})}/>
            <input placeholder="Owner" onChange={e => setTeam({...team,owner:e.target.value})}/>
            <input placeholder="Founded Year" onChange={e => setTeam({...team,foundedYear:e.target.value})}/>
            <input placeholder="Titles Won" onChange={e => setTeam({...team,titlesWon:e.target.value})}/>
            <input placeholder="Logo URL" onChange={e => setTeam({...team,logoUrl:e.target.value})}/>
            <button>Add Team</button>
          </form>
        )}

        {/* ================= LIST ================= */}
        {(mode === "EDIT" || mode === "DELETE") && (
          <div style={{ marginTop: "20px" }}>
            {teams.map(t => (
              <div key={t._id} className="history-card">
                <h4>{t.name} ({t.shortName})</h4>
                <p>Captain: {t.captain}</p>

                {mode === "DELETE" && (
                  <button onClick={() => deleteTeam(t._id)}>Delete</button>
                )}

                {mode === "EDIT" && (
<button onClick={() => {
  setEditId(t._id);
  setTeam(t);
  loadPlayersByTeam(t.shortName);   // 🔥 VERY IMPORTANT
}}>                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= EDIT FORM ================= */}
        {editId && (
          <form className="admin-form" onSubmit={handleUpdate}>
            <input value={team.name} onChange={e => setTeam({...team,name:e.target.value})}/>
            <input value={team.shortName} onChange={e => setTeam({...team,shortName:e.target.value})}/>
<select
  value={team.captain}
  onChange={(e) => setTeam({ ...team, captain: e.target.value })}
>
  <option value="">Select Captain</option>

  {players.map(p => (
    <option key={p._id} value={p.name}>
      {p.name}
    </option>
  ))}
</select>            <input value={team.coach} onChange={e => setTeam({...team,coach:e.target.value})}/>
            <input value={team.homeGround} onChange={e => setTeam({...team,homeGround:e.target.value})}/>
            <input value={team.owner} onChange={e => setTeam({...team,owner:e.target.value})}/>
            <input value={team.foundedYear} onChange={e => setTeam({...team,foundedYear:e.target.value})}/>
            <input value={team.titlesWon} onChange={e => setTeam({...team,titlesWon:e.target.value})}/>
            <input value={team.logoUrl} onChange={e => setTeam({...team,logoUrl:e.target.value})}/>
            <button>Update Team</button>
          </form>
        )}

      </div>
    </div>
  );
}

export default ManageTeams;