import React,{useEffect,useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/TeamDetails.css";

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

function TeamDetails(){

const {shortName}=useParams();

const [team,setTeam]=useState(null);
const [players,setPlayers]=useState([]);

const descriptions={
CSK:"The Chennai Super Kings, also known as CSK, are a professional Twenty20 cricket team based in Chennai, Tamil Nadu, that competes in the Indian Premier League (IPL). The team was one of the eight debut franchises when the league was established in 2008. The team plays its home matches at the M. A. Chidambaram Stadium and is owned by Chennai Super Kings Cricket.",

DC:"The Delhi Capitals, formerly the Delhi Daredevils, are a professional Twenty20 cricket team based in Delhi that competes in the Indian Premier League (IPL). The franchise is owned by GMR Group and JSW Sports. Its home ground is Arun Jaitley Stadium in New Delhi. The team is captained by Axar Patel, and is coached by Hemang Badani. They appeared in their first IPL final in 2020 against Mumbai Indians.",

MI:"The Mumbai Indians are a professional Twenty20 cricket team based in Mumbai, Maharashtra, that competes in the Indian Premier League (IPL). The Indians were founded in 2008 and are owned by India's largest conglomerate, Reliance Industries, through its wholly - owned subsidiary, Indiawin Sports. Since its establishment, the team has primarily played its home matches at the 33,108-capacity Wankhede Stadium. It is one of the most successful teams in the IPL.",

KKR:"The Kolkata Knight Riders, also known as KKR, are a professional Twenty20 cricket team based in Kolkata, West Bengal, that competes in the Indian Premier League (IPL). The franchise is owned by actor Shah Rukh Khan, actress Juhi Chawla, and her spouse Jay Mehta. Their home ground is Eden Gardens",

RCB:"Royal Challengers Bengaluru, also known as RCB, formerly Royal Challengers Bangalore, are a professional Twenty20 cricket team based in Bengaluru, Karnataka, that competes in the Indian Premier League (IPL). Founded in 2008 by United Spirits, the franchise has been owned by the Aditya Birla Group and the Sahu Jain family (via the Times of India Group), along with Blackstone since 2026.[4] The team was acquired for a record $1.78 billion, representing the highest valuation for a franchise in IPL history.",

SRH:"Sunrisers Hyderabad are a professional Twenty20 cricket team based in Hyderabad that competes in the Indian Premier League. The franchise is owned by Kalanithi Maran of Sun Group and was founded in 2013 after the Hyderabad-based Deccan Chargers in erstwhile United Andhra Pradesh were terminated by the IPL. The team is coached by Daniel Vettori and captained by Ishan Kishan. Their home ground is the Rajiv Gandhi International Cricket Stadium, Hyderabad, which has a capacity of 39,200.",

RR:"The Rajasthan Royals, also known as RR, are a professional Twenty20 cricket team based in Jaipur, Rajasthan, that competes in the Indian Premier League (IPL). Founded in 2008 as one of the initial eight franchises, the Royals were owned by Indian tycoon Manoj Badale for several years. In March 2026, an American consortium led by Kal Somani, Rob Walton, and the Hamp family bought the team for $1.63 billion. The Royals team is based at the Sawai Mansingh Stadium in Jaipur. It plays its home matches at Sawai Mansingh Stadium and at Assam Cricket Association Stadium, Guwahati.",

GT:"The Gujarat Titans, also known as GT, are a professional Twenty20 cricket team based in Ahmedabad, Gujarat, that competes in the Indian Premier League (IPL). The home ground of the team is Narendra Modi Stadium in Ahmedabad. The franchise is owned by Torrent Group and CVC Capital Partners. The team is captained by Shubman Gill and coached by Ashish Nehra. They won their maiden title in their debut season in 2022 under captain Hardik Pandya and secured the runners-up position the following season, in 2023.",

LSG:"The Lucknow Super Giants, also known as LSG, are a professional Twenty20 cricket team based in Lucknow, Uttar Pradesh, that competes in the Indian Premier League (IPL). The franchise is owned by RP-Sanjiv Goenka Group. Ekana Cricket Stadium is its home ground. As of 2025, the team is coached by Justin Langer and captained by Rishabh Pant.",

PK:"The Punjab Kings, also known as PBKS, formerly known as Kings XI Punjab, are a professional Twenty20 cricket team based in New Chandigarh, Punjab, that competes in the Indian Premier League (IPL). The franchise is jointly owned by Mohit Burman, Ness Wadia, Preity Zinta and Karan Paul. The team plays its home matches at the Maharaja Yadavindra Singh International Cricket Stadium, although since the 2010 season, they have played some matches at Dharamshala and Indore. They topped the league table twice, in 2014 Indian Premier League and 2025 Indian Premier League and finished as runners-up both times."
};

const logos={
CSK,DC,GT,KKR,LSG,MI,PK,RCB,RR,SRH
};

useEffect(()=>{

axios
.get(`http://localhost:5000/matches/team-profile/${shortName}`)
.then(res=>{
setTeam(res.data.team);
setPlayers(res.data.players);
})
.catch(err=>console.log(err));

},[shortName]);

if(!team) return <h2>Loading...</h2>;

return(
<>
<Navbar/>

<div className="team-page">

<div className="wiki-layout">


{/* LEFT CONTENT */}
<div className="team-left">

<h1>{team.name}</h1>

<p className="description">
{descriptions[shortName]}
</p>


<h2>Squad</h2>

<table className="squad-table">

<thead>
<tr>
<th>Player</th>
<th>Role</th>
</tr>
</thead>

<tbody>

{players.map((p,i)=>(
<tr key={i}>
<td>{p.name}</td>
<td>{p.role}</td>
</tr>
))}

</tbody>

</table>

</div>



{/* RIGHT INFOBOX */}
<div className="team-right">

<img
src={logos[shortName]}
alt={team.name}
className="team-logo"
/>

<h3>{team.name}</h3>

<table>
<tbody>

<tr>
<td>Captain:</td>
<td>{team.captain}</td>
</tr>

<tr>
<td>Coach:</td>
<td>{team.coach}</td>
</tr>

<tr>
<td>Owner:</td>
<td>{team.owner}</td>
</tr>

<tr>
<td>City:</td>
<td>{team.name.split(" ")[0]}</td>
</tr>

<tr>
<td>Founded:</td>
<td>{team.foundedYear}</td>
</tr>

<tr>
<td>Home Ground:</td>
<td>{team.homeGround}</td>
</tr>

<tr>
<td>Titles:</td>
<td>{team.titlesWon}</td>
</tr>

</tbody>
</table>

</div>


</div>
</div>

</>
)

}

export default TeamDetails;