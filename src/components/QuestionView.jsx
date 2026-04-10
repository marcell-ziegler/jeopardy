function QuestionView({ question, pointValue, showAnswer, onSpacebar }) {
  return (
    <div className="question-view" onClick={onSpacebar}>
      <div className="question-point-value">${pointValue}</div>
      <div className="question-prompt">{question.prompt}</div>
      {showAnswer && (
        <div className="question-answer">
          <div className="answer-divider" />
          <div className="answer-text">{question.answer}</div>
        </div>
      )}
      <div className="question-hint">
        {showAnswer
          ? 'Press Space or click to return to the board'
          : 'Press Space or click to reveal the answer'}
      </div>
    </div>
  )
}

export default QuestionView
