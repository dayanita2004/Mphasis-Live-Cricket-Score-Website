import React,{useEffect,useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Schedule(){

const [matches,setMatches]=useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/matches")
.then(res=>{

const upcoming=res.data.filter(
m=>m.status==="UPCOMING"
);

setMatches(upcoming);

});

},[]);

return(
<>
<Navbar/>

<div className="score-container">
<h2>Upcoming Schedule</h2>

{matches.map(match=>(

<div key={match._id} className="score-card upcoming-card">

<h3>
{match.team1?.shortName} vs {match.team2?.shortName}
</h3>

<p>🏟 {match.venue}</p>

<p>
🕒 {match.scheduledTimeString}
</p>

</div>

))}

</div>
</>
)

}

export default Schedule;