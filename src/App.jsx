import { useState, useEffect, useCallback } from 'react'
import defaultQuestions from './questions.json'
import GameBoard from './components/GameBoard'
import QuestionView from './components/QuestionView'
import TeamPanel from './components/TeamPanel'
import './App.css'

function App() {
  const [categories, setCategories] = useState(defaultQuestions)
  const [openedCells, setOpenedCells] = useState(new Set())
  const [activeCell, setActiveCell] = useState(null) // { categoryIndex, questionIndex }
  const [showAnswer, setShowAnswer] = useState(false)
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
  ])
  const [nextTeamId, setNextTeamId] = useState(3)

  const handleCellClick = useCallback(
    (categoryIndex, questionIndex) => {
      const cellKey = `${categoryIndex}-${questionIndex}`
      if (openedCells.has(cellKey)) return
      setActiveCell({ categoryIndex, questionIndex })
      setShowAnswer(false)
    },
    [openedCells]
  )

  const handleSpacebar = useCallback(() => {
    if (!activeCell) return
    if (!showAnswer) {
      setShowAnswer(true)
    } else {
      const cellKey = `${activeCell.categoryIndex}-${activeCell.questionIndex}`
      setOpenedCells((prev) => new Set([...prev, cellKey]))
      setActiveCell(null)
      setShowAnswer(false)
    }
  }, [activeCell, showAnswer])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        handleSpacebar()
      }
      if (e.code === 'Escape' && activeCell) {
        setActiveCell(null)
        setShowAnswer(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSpacebar, activeCell])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result)
        setCategories(data)
        setOpenedCells(new Set())
        setActiveCell(null)
        setShowAnswer(false)
      } catch {
        alert('Invalid JSON file. Please check the format and try again.')
      }
    }
    reader.readAsText(file)
  }

  const addTeam = () => {
    setTeams((prev) => [
      ...prev,
      { id: nextTeamId, name: `Team ${nextTeamId}`, score: 0 },
    ])
    setNextTeamId((id) => id + 1)
  }

  const removeTeam = (id) => {
    setTeams((prev) => prev.filter((t) => t.id !== id))
  }

  const updateTeamName = (id, name) => {
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)))
  }

  const updateTeamScore = (id, delta) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, score: t.score + delta } : t))
    )
  }

  const activeQuestion =
    activeCell
      ? categories[activeCell.categoryIndex]?.questions[activeCell.questionIndex]
      : null

  const pointValue = activeCell
    ? (activeCell.questionIndex + 1) * 100
    : null

  return (
    <div className="app">
      {activeCell && activeQuestion ? (
        <QuestionView
          question={activeQuestion}
          pointValue={pointValue}
          showAnswer={showAnswer}
          onSpacebar={handleSpacebar}
        />
      ) : (
        <>
          <header className="app-header">
            <h1 className="app-title">JEOPARDY!</h1>
            <label className="upload-btn">
              Load Questions
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </header>
          <main className="app-main">
            <GameBoard
              categories={categories}
              openedCells={openedCells}
              onCellClick={handleCellClick}
            />
          </main>
          <TeamPanel
            teams={teams}
            onAddTeam={addTeam}
            onRemoveTeam={removeTeam}
            onUpdateName={updateTeamName}
            onUpdateScore={updateTeamScore}
          />
        </>
      )}
    </div>
  )
}

export default App
