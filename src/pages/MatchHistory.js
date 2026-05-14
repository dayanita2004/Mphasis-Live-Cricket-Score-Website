import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/MatchHistory.css";

function MatchHistory() {

const [matches,setMatches]=useState([]);

useEffect(()=>{
axios.get("http://localhost:5000/matches/completed")
.then(res=>setMatches(res.data))
.catch(err=>console.log("History fetch error:",err));
},[]);


if(matches.length===0){
return(
<div className="history-container">
<h2>No Completed Matches Found</h2>

<button onClick={()=>window.location="/"}>
Home
</button>

</div>
);
}


return(
<>
<Navbar/>

<div className="history-container">

<h2>Completed Matches</h2>

<div className="history-list">

{matches.map(match=>{

const team1Name=match.team1?.shortName || "Team 1";
const team2Name=match.team2?.shortName || "Team 2";

const tossWinner=match.tossWinner?.shortName || "N/A";
const tossChoice=match.tossChoice?.toLowerCase() || "";

const winner=match.winner?.shortName || "TBD";


return(

<div
key={match._id}
className="history-card"
onClick={()=>window.location=`/summary/${match._id}`}
>

<h3>
{team1Name} vs {team2Name}
</h3>


<p>
🏟 Venue: {match.venue}
</p>


<p>
🪙 Toss: {tossWinner} won the toss and chose {tossChoice}
</p>



{/* SCORE TABLE */}

<div className="score-table">

<div className="score-head">
<span>Team</span>
<span>Score</span>
<span>Overs</span>
</div>


<div className="score-row">
<span>{team1Name}</span>

<span>
{match.team1Score?.runs || 0}/
{match.team1Score?.wickets || 0}
</span>

<span>
{match.team1Score?.overs?.over || 0}.
{match.team1Score?.overs?.ball || 0}
</span>
</div>


<div className="score-row">
<span>{team2Name}</span>

<span>
{match.team2Score?.runs || 0}/
{match.team2Score?.wickets || 0}
</span>

<span>
{match.team2Score?.overs?.over || 0}.
{match.team2Score?.overs?.ball || 0}
</span>
</div>

</div>



{/* WINNER SECTION */}

<div className="result-box">

<div className="winner-line">
🏆 Winner: {winner}
</div>

<div className="winby-line">
{match.winBy || ""}
</div>

</div>



{match.manOfTheMatch && (
<p>
⭐ Man of the Match: {match.manOfTheMatch}
</p>
)}

</div>

);

})}

</div>


<button onClick={()=>window.location="/"}>
Home
</button>

</div>
</>
);

}

export default MatchHistory;