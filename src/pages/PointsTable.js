import React,{useEffect,useState} from "react";
import axios from "axios";
import { FaTrophy } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../styles/PointsTable.css";

function PointsTable(){

const [table,setTable]=useState([]);

useEffect(()=>{
axios.get("http://localhost:5000/points-table")
.then(res=>setTable(res.data))
.catch(err=>console.error(err));
},[]);

return(
<>
<Navbar/>

<div className="points-page">

<div className="points-table-wrapper">

<div className="points-header">
<div className="points-icon">
<FaTrophy/>
</div>

<div>
<h2>Points Table</h2>
<p>IPL Team Standings</p>
</div>
</div>


<table className="points-table">

<thead>
<tr>
<th>Team</th>
<th>M</th>
<th>W</th>
<th>L</th>
<th>PTS</th>
<th>NRR</th>
</tr>
</thead>

<tbody>

{table.map((t,i)=>(
<tr key={i}>
<td className="team">
<span className="rank">{i+1}</span>
{t.shortName}
</td>

<td>{t.played}</td>
<td>{t.win}</td>
<td>{t.loss}</td>
<td className="pts">{t.points}</td>
<td>{t.nrr}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>
</>
)

}

export default PointsTable;