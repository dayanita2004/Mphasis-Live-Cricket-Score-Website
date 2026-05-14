import React,{useState,useEffect} from "react";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard(){

const [liveMatches,setLiveMatches]=useState(0);
const [totalMatches,setTotalMatches]=useState(0);
const [teamsCount,setTeamsCount]=useState(0);

const loadDashboard = async()=>{
try{
const matchesRes=await axios.get("http://localhost:5000/matches");
const teamsRes=await axios.get("http://localhost:5000/teams");

const matches=matchesRes.data || [];

setTotalMatches(matches.length);
setLiveMatches(
 matches.filter(
  m=>m.status==="LIVE" || m.matchStatus==="LIVE"
 ).length
);

setTeamsCount(teamsRes.data.length);
}
catch(err){
console.log(err);
}
};

useEffect(()=>{
loadDashboard();
},[]);

return(
<div className="dashboard-page">

<h1 className="dashboard-title">
Admin Dashboard
</h1>

<button className="refresh-btn" onClick={loadDashboard}>
Refresh
</button>

<div className="dashboard-panel">

<div className="dashboard-cards">

<div className="stat-card">
<h3>Live Matches</h3>
<div className="stat-number">{liveMatches}</div>
<div className="live-dot">● LIVE</div>
</div>

<div className="stat-card">
<h3>Total Matches</h3>
<div className="stat-number">{totalMatches}</div>
</div>

<div className="stat-card">
<h3>Teams</h3>
<div className="stat-number">{teamsCount}</div>
</div>

</div>

</div>

</div>
)
}

export default Dashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Admin.css";


// function Dashboard() {
//   const [stats, setStats] = useState({
//     live: 0,
//     total: 0,
//     teams: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/matches/stats");
//       setStats(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <>
//       <div className="dashboard-header">
//         <h1>Admin Dashboard</h1>
//         <button className="refresh-btn" onClick={fetchStats}>
//           🔄 Refresh
//         </button>
//       </div>

//       <div className="dashboard-cards">
//         <div className="dashboard-card live-card">
//           <h3>Live Matches</h3>
//           <p className="count">{loading ? "…" : stats.live}</p>
//           <span className="live-dot">● LIVE</span>
//         </div>

//         <div className="dashboard-card">
//           <h3>Total Matches</h3>
//           <p className="count">{loading ? "…" : stats.total}</p>
//         </div>

//         <div className="dashboard-card">
//           <h3>Teams</h3>
//           <p className="count">{loading ? "…" : stats.teams}</p>
//         </div>
//       </div>
      
//     </>
//   );
// }

// export default Dashboard;
