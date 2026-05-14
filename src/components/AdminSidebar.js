import React from "react";
import {useNavigate,useLocation} from "react-router-dom";
import {
FaTachometerAlt,
FaCalendarAlt,
FaBroadcastTower,
FaUsers,
FaUserFriends,
FaTable,
FaHistory,
FaSignOutAlt
} from "react-icons/fa";

import "../styles/AdminSidebar.css";

function AdminSidebar(){

const navigate=useNavigate();
const location=useLocation();

const menu=[
{label:"Dashboard",path:"/admin/dashboard",icon:<FaTachometerAlt/>},
{label:"Manage Matches",path:"/admin/manage-matches",icon:<FaCalendarAlt/>},
{label:"Live Match",path:"/admin/live-match",icon:<FaBroadcastTower/>},
{label:"Manage Teams",path:"/admin/teams/manage",icon:<FaUsers/>},
{label:"Manage Players",path:"/admin/players/manage",icon:<FaUserFriends/>},
{label:"Points Table",path:"/admin/points-table",icon:<FaTable/>},
{label:"Match History",path:"/admin/match-history",icon:<FaHistory/>},
];

return(
<div className="admin-sidebar">

<div className="logo">
ADMIN <span>DASHBOARD</span>
</div>

<div className="sidebar-menu">
{menu.map(item=>(
<div
key={item.label}
onClick={()=>navigate(item.path)}
className={
location.pathname===item.path
? "menu-item active"
: "menu-item"
}
>
<span className="menu-icon">
{item.icon}
</span>

<span>
{item.label}
</span>

</div>
))}
</div>
<div
className="logout-row"
onClick={()=>{
localStorage.removeItem("adminLoggedIn");
navigate("/admin/login");
}}
>
<FaSignOutAlt/>
<span>Logout</span>
</div>

</div>
)

}

export default AdminSidebar;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Admin.css";

// function AdminSidebar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminLoggedIn");
//     navigate("/admin/login");
//   };

//   return (
//     <aside className="admin-sidebar">
//       <h2 className="sidebar-title">Admin Panel</h2>

//       <nav className="sidebar-nav">
//         <button onClick={() => navigate("/admin/dashboard")}>
//           Dashboard
//         </button>

//         <button onClick={() => navigate("/admin/manage-matches")}>
//           Manage Matches
//         </button>

//         <button onClick={() => navigate("/admin/live-match")}>
//           Live Match
//         </button>

//         <button onClick={() => navigate("/admin/teams/manage")}>
//           Manage Teams
//         </button>

//         <button onClick={() => navigate("/admin/players/manage")}>
//           Manage Players
//         </button>

//         <button onClick={() => navigate("/admin/points-table")}>
//           Points Table
//         </button>

//         <button onClick={() => navigate("/admin/upcoming-matches")}>
//           Upcoming Matches
//         </button>

//         <button onClick={() => navigate("/admin/match-history")}>
//           Match History
//         </button>
//       </nav>

//       <button className="logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </aside>
//   );
// }

// export default AdminSidebar;
