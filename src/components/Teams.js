import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/teams.css";

import CSK from "../assets/teams/CSK.jpg";
import DC from "../assets/teams/DC.jpg";
import GT from "../assets/teams/GT.jpg";
import KKR from "../assets/teams/KKR.jpg";
import LSG from "../assets/teams/LSG.jpg";
import MI from "../assets/teams/MI.jpg";
import PK from "../assets/teams/PK.jpg";
import RCB from "../assets/teams/RCB.jpg";
import RR from "../assets/teams/RR.jpg";
import SRH from "../assets/teams/SRH.jpg";

function Teams(){

const navigate=useNavigate();

const teamsData=[
{
name:"CSK",
full:"Chennai Super Kings",
img:CSK
},
{
name:"DC",
full:"Delhi Capitals",
img:DC
},
{
name:"PK",
full:"Punjab Kings",
img:PK
},
{
name:"KKR",
full:"Kolkata Knight Riders",
img:KKR
},
{
name:"MI",
full:"Mumbai Indians",
img:MI
},
{
name:"RR",
full:"Rajasthan Royals",
img:RR
},
{
name:"RCB",
full:"Royal Challengers Bengaluru",
img:RCB
},
{
name:"SRH",
full:"Sunrisers Hyderabad",
img:SRH
},
{
name:"GT",
full:"Gujarat Titans",
img:GT
},
{
name:"LSG",
full:"Lucknow Super Giants",
img:LSG
}
];

return(
<>
<Navbar/>

<div className="teams-page">

<h2>LEAGUE TEAMS</h2>

<div className="teams-list">

{teamsData.map((team,index)=>(

<div
key={index}
className="team-row"
onClick={()=>navigate(`/team/${team.name}`)}
>

<div className="team-left">

<img
src={team.img}
alt={team.full}
/>

<span>
{team.full}
</span>

</div>

<div className="arrow">
›
</div>

</div>

))}

</div>

</div>
</>
)

}

export default Teams;