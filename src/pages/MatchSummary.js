import React,{useEffect,useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MatchSummary.css";

function MatchSummary(){

const {id}=useParams();
const [match,setMatch]=useState(null);

useEffect(()=>{
axios.get(`http://localhost:5000/matches/${id}`)
.then(res=>setMatch(res.data))
.catch(err=>console.log(err));
},[id]);

if(!match) return <h2>Loading summary...</h2>;

const team1XI=match.playingXI?.team1 || [];
const team2XI=match.playingXI?.team2 || [];

return(
<>
<Navbar/>

<div className="summary-container">

<h2>
{match.team1?.shortName} vs {match.team2?.shortName}
</h2>

<p>🏟 {match.venue}</p>

<p>
🪙 Toss: {match.tossWinner?.shortName} chose
{" "}
{match.tossChoice==="BAT" ? "bat":"bowl"}
</p>


{/* MATCH SCORE TABLE */}

<div className="score-table">

<div className="table-head">
<span>Team</span>
<span>Score</span>
<span>Overs</span>
</div>

<div className="table-row">
<span>{match.team1?.shortName}</span>
<span>
{match.team1Score?.runs}/{match.team1Score?.wickets}
</span>
<span>
{match.team1Score?.overs?.over}.
{match.team1Score?.overs?.ball}
</span>
</div>

<div className="table-row">
<span>{match.team2?.shortName}</span>
<span>
{match.team2Score?.runs}/{match.team2Score?.wickets}
</span>
<span>
{match.team2Score?.overs?.over}.
{match.team2Score?.overs?.ball}
</span>
</div>

</div>


<div className="winner-box">
🏆 Winner:
{match.winner?.shortName}
<br/>
<small>By {match.winBy}</small>
</div>



{/* BATTING TABLES */}

<h2>🟡 Batting Scorecard</h2>

<h3>{match.team1?.shortName}</h3>

<div className="player-table">

<div className="table-head batting">
<span>Player</span>
<span>Runs</span>
<span>4s</span>
<span>6s</span>
<span>Status</span>
</div>

{team1XI
.filter(p=>p.balls>0)
.sort((a,b)=>a.battingPosition-b.battingPosition)
.map((p,i)=>(
<div key={i} className="table-row batting">
<span>{p.name}</span>
<span>{p.runs} ({p.balls})</span>
<span>{p.fours}</span>
<span>{p.sixes}</span>
<span>{p.isOut?"OUT":"NOT OUT"}</span>
</div>
))}

</div>



<h3>{match.team2?.shortName}</h3>

<div className="player-table">

<div className="table-head batting">
<span>Player</span>
<span>Runs</span>
<span>4s</span>
<span>6s</span>
<span>Status</span>
</div>

{team2XI
.filter(p=>p.balls>0)
.sort((a,b)=>a.battingPosition-b.battingPosition)
.map((p,i)=>(
<div key={i} className="table-row batting">
<span>{p.name}</span>
<span>{p.runs} ({p.balls})</span>
<span>{p.fours}</span>
<span>{p.sixes}</span>
<span>{p.isOut?"OUT":"NOT OUT"}</span>
</div>
))}

</div>




{/* BOWLING TABLES */}

<h2>🔵 Bowling Scorecard</h2>

<h3>{match.team1?.shortName}</h3>

<div className="player-table">

<div className="table-head bowl">
<span>Bowler</span>
<span>Overs</span>
<span>Runs</span>
<span>Wickets</span>
</div>

{team1XI
.filter(p=>p.ballsBowled>0)
.map((p,i)=>(
<div key={i} className="table-row bowl">
<span>{p.name}</span>
<span>
{Math.floor(p.ballsBowled/6)}.{p.ballsBowled%6}
</span>
<span>{p.runsGiven}</span>
<span>{p.wicketsTaken}</span>
</div>
))}

</div>



<h3>{match.team2?.shortName}</h3>

<div className="player-table">

<div className="table-head bowl">
<span>Bowler</span>
<span>Overs</span>
<span>Runs</span>
<span>Wickets</span>
</div>

{team2XI
.filter(p=>p.ballsBowled>0)
.map((p,i)=>(
<div key={i} className="table-row bowl">
<span>{p.name}</span>
<span>
{Math.floor(p.ballsBowled/6)}.{p.ballsBowled%6}
</span>
<span>{p.runsGiven}</span>
<span>{p.wicketsTaken}</span>
</div>
))}

</div>



{match.fallOfWickets?.length>0 && (
<>
<h2>📉 Fall of Wickets</h2>

<div className="player-table">

<div className="table-head">
<span>Score</span>
<span>Batsman</span>
<span>Over</span>
</div>

{match.fallOfWickets.map((w,i)=>(
<div key={i} className="table-row">
<span>{w.at}</span>
<span>{w.batsman}</span>
<span>{w.over}</span>
</div>
))}

</div>
</>
)}


{match.manOfTheMatch &&
<h3>⭐ Man of the Match: {match.manOfTheMatch}</h3>
}


<button onClick={()=>window.location="/history"}>
⬅ Back
</button>

<button onClick={()=>window.location="/"}>
🏠 Home
</button>

</div>
</>
);

}

export default MatchSummary;