
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "../styles/LiveMatch.css";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function LiveMatch() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);

  const navigate = useNavigate();

  /* ================= LOAD COMPLETED ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/matches/completed")
      .then((res) => setCompletedMatches(res.data))
      .catch((err) => console.error(err));
  }, []);

  /* ================= SOCKET ================= */
  useEffect(() => {
    socket.on("scoreUpdate", (data) => {
      const allIPL = data.filter((m) => m.matchType === "IPL");

      setLiveMatches(allIPL.filter((m) => m.status === "LIVE"));
      setUpcomingMatches(allIPL.filter((m) => m.status === "UPCOMING"));
    });

    return () => socket.off("scoreUpdate");
  }, []);

  /* ================= EMPTY ================= */
  if (
    liveMatches.length === 0 &&
    upcomingMatches.length === 0 &&
    completedMatches.length === 0
  ) {
    return (
      <div className="score-container">
         <PageHeader title="Live Match" />
        <h3 className="loading">❌ No IPL match running</h3>
        <button onClick={() => (window.location = "/")}>Home</button>
      </div>
    );
  }

  /* ================= NO LIVE ================= */
  if (liveMatches.length === 0 && upcomingMatches.length === 0) {
    return (
      <div className="score-container">
        <h3 className="loading">No Live Match</h3>
        <button onClick={() => (window.location = "/history")}>
          View Match History
        </button>
        <button onClick={() => (window.location = "/")}>Home</button>
      </div>
    );
  }

  return (
    <div className="score-container">

      {/* ================= UPCOMING ================= */}
      {upcomingMatches.length > 0 && (
        <div>
          <h2>⏳ Upcoming Matches</h2>
          {upcomingMatches.map((match) => (
            <div key={match._id} className="score-card upcoming-card">
              <h3>
                {match.team1?.shortName} vs {match.team2?.shortName}
              </h3>
              <p>🏟 {match.venue}</p>
              <p>🕒 Starts at: {match.scheduledTimeString}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= LIVE ================= */}
      <div>
        <h2>🔴 Live Matches </h2>

        {liveMatches.map((match) => {

const currentOver = match.overs.over;

// 👉 get all balls of current over
const balls = match.commentary?.filter(c => c.over === currentOver) || [];

// 👉 count legal balls
let legalCount = 0;
const currentOverBalls = [];

for (let b of balls) {
  currentOverBalls.push(b);

  if (b.value !== "Wd" && b.value !== "Nb") {
    legalCount++;
  }

  // stop when current legal balls reached
  if (legalCount === match.overs.ball) break;
}

// 🔥 FIX FOR 5.6 DISPLAY
const displayOver =
  match.overs.ball === 0 && legalCount === 6
    ? `${match.overs.over - 1}.6`   // ✅ show previous over 6th ball
    : `${match.overs.over}.${match.overs.ball}`;
          const battingTeamId = match.batting_team?._id;

          const isTeam1Batting =
            battingTeamId === match.team1?._id;

          const battingXI =
            match.playingXI?.[isTeam1Batting ? "team1" : "team2"] || [];

          const bowlingXI =
            match.playingXI?.[isTeam1Batting ? "team2" : "team1"] || [];

          /* ✅ SAFE CURRENT BATSMEN */
          const striker =
            battingXI[match.strikerIndex] &&
            !battingXI[match.strikerIndex].isOut
              ? battingXI[match.strikerIndex]
              : null;

          const nonStriker =
            battingXI[match.nonStrikerIndex] &&
            !battingXI[match.nonStrikerIndex].isOut
              ? battingXI[match.nonStrikerIndex]
              : null;

          return (
            <div key={match._id} className="score-card">

              {/* HEADER */}
              <h2>
                {match.team1?.shortName} vs {match.team2?.shortName}
              </h2>

              <p className="match-time">🏟 {match.venue}</p>

              {/* TOSS */}
              {match.tossWinner && (
                <p className="toss-info">🪙 Toss: {match.tossWinner?.shortName} won the toss and chose{" "}
{match.tossChoice?.toLowerCase()} </p>
              )}

              {/* SCORE */}
              <div className="innings live-innings">
                <h3>Batting: {match.batting_team?.shortName}</h3>

                <p className="score-value">
                  {match.runs}/{match.wickets}
                </p>

<p>
  Overs: {displayOver}
</p>                      <p>
  <strong>Current Over: </strong>
{currentOverBalls.map((ball, i) => (
  <span key={i} style={{ marginRight: "8px" }}>
    {ball.value}
  </span>
))}
</p><br/>

                <p className="live-indicator">🔴 LIVE</p>

          

                {match.target && (
                  <h3 className="target">🎯 Target: {match.target}</h3>
                )}
              </div>

              {/* ================= BATTING ================= */}
              <h3>🟡 Batting</h3>

              <div className="batting-table">
                <h4>Current Batsmen</h4>

                {striker && (
                  <div className="bat-row">
                    <span>
                      {striker.name}{" "}
                      {striker.country !== "India" && "✈️"} *
                    </span>
                    <span>{striker.runs} ({striker.balls})</span>
                    <span>4s: {striker.fours}</span>
                    <span>6s: {striker.sixes}</span>
                  </div>
                )}

                {nonStriker && match.nonStrikerIndex !== match.strikerIndex && (
                  <div className="bat-row">
                    <span>
                      {nonStriker.name}{" "}
                      {nonStriker.country !== "India" && "✈️"}
                    </span>
                    <span>{nonStriker.runs} ({nonStriker.balls})</span>
                    <span>4s: {nonStriker.fours}</span>
                    <span>6s: {nonStriker.sixes}</span>
                  </div>
                )}

                {!striker && !nonStriker && (
                  <p>No batsmen on field</p>
                )}
              </div>

              {/* FALLEN WICKETS */}
              <div className="batting-table">
                <h4>Fallen Wickets</h4>

                {battingXI
                  .filter((p) => p.isOut)
                  .map((p, i) => (
                    <div key={i} className="bat-row out-player">
                      <span>
                        {p.name} {p.country !== "India" && "✈️"} (OUT)
                      </span>
                      <span>{p.runs} ({p.balls})</span>
                      <span>4s: {p.fours}</span>
                      <span>6s: {p.sixes}</span>
                      <span>OUT by: {p.outBy}</span>
                    </div>
                  ))}
              </div>

              {/* YET TO BAT */}
              <div className="batting-table">
                <h4>Yet To Bat</h4>

                {battingXI
                  .filter(
                    (p, idx) =>
                      !p.isOut &&
                      idx !== match.strikerIndex &&
                      idx !== match.nonStrikerIndex &&
                      p.balls === 0 &&
                      p.runs === 0
                  )
                  .map((p, i) => (
                    <div key={i} className="bat-row pending-player">
                      <span>
                        {p.name} {p.country !== "India" && "✈️"}
                      </span>
                      <span>Yet to bat</span>
                    </div>
                  ))}
              </div>

              {/* ================= BOWLING ================= */}
              <h3>🔵 Bowling</h3>

              <div className="bowling-table">
                {bowlingXI
                  .filter((p) => p.ballsBowled > 0)
                  .map((p, i) => (
                    <div key={i} className="bowl-row">
                      <span>
                        {p.name} {p.country !== "India" && "✈️"}
                      </span>
                      <span>
                        {Math.floor(p.ballsBowled / 6)}.{p.ballsBowled % 6} ov
                      </span>
                      <span>Runs: {p.runsGiven}</span>
                      <span>Wkts: {p.wicketsTaken}</span>
                    </div>
                  ))}
              </div>

            </div>
          );
        })}
      </div>

      <button onClick={() => (window.location = "/")}>Home</button>
      <button onClick={() => navigate("/points-table")}>
  📊 Points Table
</button>
    </div>
  );
}

export default LiveMatch;