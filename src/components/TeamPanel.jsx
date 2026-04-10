function TeamPanel({ teams, onAddTeam, onRemoveTeam, onUpdateName, onUpdateScore }) {
  return (
    <div className="team-panel">
      <div className="team-panel-inner">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onRemove={() => onRemoveTeam(team.id)}
            onNameChange={(name) => onUpdateName(team.id, name)}
            onScoreChange={(delta) => onUpdateScore(team.id, delta)}
          />
        ))}
        <button className="add-team-btn" onClick={onAddTeam}>
          + Add Team
        </button>
      </div>
    </div>
  )
}

function TeamCard({ team, onRemove, onNameChange, onScoreChange }) {
  return (
    <div className="team-card">
      <button className="team-remove-btn" onClick={onRemove} aria-label="Remove team">
        ×
      </button>
      <input
        className="team-name-input"
        value={team.name}
        onChange={(e) => onNameChange(e.target.value)}
        aria-label="Team name"
      />
      <div className="team-score">{team.score}</div>
      <div className="team-controls">
        <button
          className="score-btn score-btn--minus"
          onClick={() => onScoreChange(-100)}
          aria-label={`-100 for ${team.name}`}
        >
          −100
        </button>
        <button
          className="score-btn score-btn--plus"
          onClick={() => onScoreChange(100)}
          aria-label={`+100 for ${team.name}`}
        >
          +100
        </button>
      </div>
    </div>
  )
}

export default TeamPanel
