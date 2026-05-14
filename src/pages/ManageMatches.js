import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageMatches.css";

function ManageMatches() {

  const [teams, setTeams] = useState([]); // ✅ dynamic teams

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [venue, setVenue] = useState("");

  const [status, setStatus] = useState("LIVE");
  const [scheduledTime, setScheduledTime] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [team1Players, setTeam1Players] = useState([]);
const [team2Players, setTeam2Players] = useState([]);

const [team1XI, setTeam1XI] = useState([]);
const [team2XI, setTeam2XI] = useState([]);

const [showTeam1XI,setShowTeam1XI]=useState(true);
const [showTeam2XI,setShowTeam2XI]=useState(true);

const [showTeam1Box,setShowTeam1Box] = useState(true);
const [showTeam2Box,setShowTeam2Box] = useState(true);

  /* ================= LOAD TEAMS ================= */
useEffect(() => {
  axios.get("http://localhost:5000/teams")
    .then(res => {
      console.log("Teams API:", res.data); // optional debug
      setTeams(res.data);
    })
    .catch(err => console.log("Team load error:", err));
}, []);

//   useEffect(() => {
//   if (team1) {
//     axios.get(`http://localhost:5000/players/team/${team1}`)
//       .then(res => setTeam1Players(res.data))
//       .catch(err => console.log(err));
//   }
// }, [team1]);
useEffect(() => {

if(team1){

const teamObj = teams.find(t=>t._id===team1);

if(teamObj){
axios
.get(
`http://localhost:5000/players/team/${teamObj.shortName}`
)
.then(res=>setTeam1Players(res.data))
.catch(err=>console.log(err));
}

}

},[team1,teams]);

// useEffect(() => {
//   if (team2) {
//     axios.get(`http://localhost:5000/players/team/${team2}`)
//       .then(res => setTeam2Players(res.data))
//       .catch(err => console.log(err));
//   }
// }, [team2]);

useEffect(()=>{

if(team2){

const teamObj = teams.find(t=>t._id===team2);

if(teamObj){
axios
.get(
`http://localhost:5000/players/team/${teamObj.shortName}`
)
.then(res=>setTeam2Players(res.data))
.catch(err=>console.log(err));
}

}

},[team2,teams]);

const handleSelectPlayer = (playerId, team) => {

  if (team === "team1") {
    if (team1XI.includes(playerId)) {
      setTeam1XI(team1XI.filter(id => id !== playerId));
    } else {
      if (team1XI.length >= 11) return alert("Only 11 players allowed");
      const updated=[...team1XI,playerId];
      setTeam1XI(updated);

      if(updated.length===11){
      setShowTeam1XI(false);
}
    }
  }

  if (team === "team2") {
    if (team2XI.includes(playerId)) {
      setTeam2XI(team2XI.filter(id => id !== playerId));
    } else {
      if (team2XI.length >= 11) return alert("Only 11 players allowed");
      const updated=[...team2XI,playerId];
      setTeam2XI(updated);

      if(updated.length===11){
      setShowTeam2XI(false);
}
    }
  }
};
  /* ================= CREATE MATCH ================= */
  const handleCreateMatch = async (e) => {
    e.preventDefault();

    if (team1 === team2) {
      setMessage("Team 1 and Team 2 cannot be the same");
      return;
    }

    if (status === "UPCOMING" && !scheduledTime) {
      setMessage("Please select a scheduled time!");
      return;
    }

    if (team1XI.length !== 11 || team2XI.length !== 11) {
  setMessage("❌ Select exactly 11 players for both teams");
  return;
}

    const payload =
      status === "LIVE"
        ? {
            team1Id: team1,  // ✅ FIX
            team2Id: team2,
            venue,
            startType: "NOW",
            matchStartTime: new Date(),
            scheduledTimeString: "Live Now",

            team1PlayingXI: team1XI,
            team2PlayingXI: team2XI
          }
        : {
            team1Id: team1,  // ✅ FIX
            team2Id: team2,
            venue,
            startType: "SCHEDULE",
            matchStartTime: scheduledTime,
            scheduledTimeString: new Date(scheduledTime).toLocaleString(),

            team1PlayingXI: team1XI,
            team2PlayingXI: team2XI
          };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/matches/create", payload);

      setMessage("✅ Match created successfully!");

      setTeam1("");
      setTeam2("");
      setVenue("");
      setStatus("LIVE");
      setScheduledTime("");

    } catch (err) {
      setMessage("❌ Failed to create match");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPER ================= */
  const getTeamName = (id) => {
    const t = teams.find(team => team._id === id);
    return t ? t.shortName : "";
  };

  return (
    <div className="admin-container">
      <div className="manage-card">

        <h2>Manage IPL Matches</h2>

        {message && <p className="admin-message">{message}</p>}

        {/* MATCH PREVIEW */}
        {team1 && team2 && (
          <div className="match-preview">
            <h4>Match Preview</h4>
            <p>{getTeamName(team1)} 🆚 {getTeamName(team2)}</p>
            <p>Venue: {venue || "Not selected"}</p>
            <p>Status: {status}</p>
          </div>
        )}

        <form className="admin-form" onSubmit={handleCreateMatch}>

          {/* TEAM 1 */}
          <select
            value={team1}
            onChange={(e) => {
              setTeam1(e.target.value);
              setTeam2("");
              setTeam1XI([])
            }}
            required
          >
            <option value="">Select Team 1</option>
            {teams.map(t => (
              <option key={t._id} value={t._id}>
                {t.shortName}
              </option>
            ))}
          </select>

          {/* TEAM 2 */}
          <select
            value={team2}
            onChange={(e) => {
            setTeam2(e.target.value)
            setTeam2XI([])}}
            required
            disabled={!team1}
          >
            <option value="">Select Team 2</option>
            {teams
              .filter(t => t._id !== team1)
              .map(t => (
                <option key={t._id} value={t._id}>
                  {t.shortName}
                </option>
              ))}
          </select>
         {team1Players.length > 0 && showTeam1Box && (
    <div className="players-box">
    <h4>Select {getTeamName(team1)} Playing XI</h4>

    {team1Players.map(p => (
      <label key={p._id}>
        <input
          type="checkbox"
checked={team1XI.includes(String(p._id))}
onChange={() => handleSelectPlayer(String(p._id), "team1")}        />
        {p.name} ({p.role})
      </label>
    ))}

    <p>Selected: {team1XI.length}/11</p>
  </div>
)}

{team2Players.length > 0 && showTeam2Box && (
    <div className="players-box">
    <h4>Select {getTeamName(team2)} Playing XI</h4>

    {team2Players.map(p => (
      <label key={p._id}>
        <input
          type="checkbox"
checked={team2XI.includes(String(p._id))}
onChange={() => handleSelectPlayer(String(p._id), "team2")}        />
        {p.name} ({p.role})
      </label>
    ))}

    <p>Selected: {team2XI.length}/11</p>
  </div>
)}

          {/* VENUE */}
          <select
  value={venue}
  onChange={(e) => setVenue(e.target.value)}
  required
>
  <option value="">Select Venue</option>

  <option value="Wankhede Stadium">Wankhede Stadium</option>
  <option value="M. Chinnaswamy Stadium">M. Chinnaswamy Stadium</option>
  <option value="MA Chidambaram Stadium">MA Chidambaram Stadium</option>
  <option value="Arun Jaitley Stadium">Arun Jaitley Stadium</option>
  <option value="Eden Gardens">Eden Gardens</option>
  <option value="Narendra Modi Stadium">Narendra Modi Stadium</option>
  <option value="Rajiv Gandhi International Stadium">Rajiv Gandhi Stadium</option>
  <option value="Punjab Cricket Association Stadium">PCA Stadium</option>

</select>

          {/* STATUS */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="LIVE">LIVE</option>
            <option value="UPCOMING">UPCOMING</option>
          </select>

          {/* DATE TIME */}
          {status === "UPCOMING" && (
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              required
            />
          )}

          <p>Team1 Count: {team1XI.length}</p>
          <p>Team2 Count: {team2XI.length}</p>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Match"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ManageMatches;