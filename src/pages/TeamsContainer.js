import React, { useState } from "react";
import Teams from "../components/Teams";
import TeamPlayers from "./TeamPlayers";

function TeamsContainer() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <>
      {/* ✅ Show teams list */}
      {!selectedTeam && (
        <Teams onSelectTeam={setSelectedTeam} />
      )}

      {/* ✅ Show selected team players */}
      {selectedTeam && (
        <TeamPlayers
          teamName={selectedTeam}
          onBack={() => setSelectedTeam(null)}
        />
      )}
    </>
  );
}

export default TeamsContainer;