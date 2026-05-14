import logo from './logo.svg';
import './App.css';
import Score from './components/Score';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard'
import ManageMatches from './pages/ManageMatches';
import MatchHistory from "./pages/MatchHistory";
import MatchSummary from "./pages/MatchSummary"
import ManagePlayers from './pages/ManagePlayers';
import ManageTeams from './pages/ManageTeams';
import Teams from './components/Teams';
import News from './components/News';
import TeamDetails from './components/TeamsDetails';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Schedule from "./components/Schedule";
import PointsTable from "./pages/PointsTable";
import AdminSidebar from './components/AdminSidebar';
import AdminRoute from "./components/AdminRoute";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import AdminPageLayout from "./pages/AdminPageLayout";
import UpcomingMatches from "./pages/UpcomingMatches";
import LiveMatch from "./pages/LiveMatch";
import AdminPointsTable from './pages/adminpointstable';
function App(){

 return(

  <BrowserRouter>

   <Routes>

    // Common
<Route path="/" element={<Home />} />

// User routes
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/score" element={<Score />} />
<Route path="/teams" element={<Teams />} />
<Route path="/news" element={<News />} />
<Route path="/team/:shortName" element={<TeamDetails />} />
<Route path="/schedule" element={<Schedule/>}/>
<Route path="/points-table" element={<PointsTable/>}/>

// Admin routes
<Route path="/admin/login" element={<AdminLogin />} />
{/* 
<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/matches" element={<ManageMatches />} />
 */}

{/* ---------- ADMIN PAGES (NO SIDEBAR) ---------- */}
<Route
path="/admin"
element={
<AdminRoute>
<AdminDashboardLayout />
</AdminRoute>
}
>
<Route path="dashboard" element={<Dashboard />} />
<Route path="manage-matches" element={<ManageMatches />} />
<Route path="live-match" element={<LiveMatch />} />
<Route path="teams/manage" element={<ManageTeams />} />
<Route path="players/manage" element={<ManagePlayers />} />
{/* <Route path="points-table" element={<PointsTable />} /> */}
<Route path="upcoming-matches" element={<UpcomingMatches />} />
<Route path="match-history" element={<MatchHistory />} />
<Route path="/admin/points-table" element={<AdminPointsTable/>}
/>
</Route>





<Route path="/history" element={<MatchHistory />} />
<Route path="/summary/:id" element={<MatchSummary />} />
{/* <Route path="/admin/players" element={<ManagePlayers />} />
<Route path="/admin/teams" element={<ManageTeams />} /> */}
{/* <Route path="/admin/update-score" element={<UpdateScore />} /> */}

   </Routes>

  </BrowserRouter>

 )

}


export default App;
