const POINT_VALUES = [100, 200, 300, 400, 500]

function GameBoard({ categories, openedCells, onCellClick }) {
  return (
    <div
      className="game-board"
      style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}
    >
      {categories.map((category, colIdx) => (
        <div key={colIdx} className="board-column">
          <div className="category-header">
            <span>{category.columnTitle}</span>
          </div>
          {POINT_VALUES.map((points, rowIdx) => {
            const cellKey = `${colIdx}-${rowIdx}`
            const isOpened = openedCells.has(cellKey)
            return (
              <button
                key={rowIdx}
                className={`cell${isOpened ? ' cell--opened' : ''}`}
                onClick={() => !isOpened && onCellClick(colIdx, rowIdx)}
                disabled={isOpened}
                aria-label={`${category.columnTitle} for ${points} points`}
              >
                {isOpened ? '' : `$${points}`}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default GameBoard
