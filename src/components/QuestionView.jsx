import { MathJax } from 'better-react-mathjax'

function isMathBlock(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  return trimmed.length > 4 && trimmed.startsWith('$$') && trimmed.endsWith('$$')
}

function RenderContent({ value, className }) {
  const text = typeof value === 'string' ? value : ''
  if (!isMathBlock(text)) {
    return <div className={className}>{text}</div>
  }

  return (
    <div className={className}>
      <MathJax dynamic>{text.trim()}</MathJax>
    </div>
  )
}

function QuestionView({ question, pointValue, showAnswer, onSpacebar }) {
  return (
    <div className="question-view" onClick={onSpacebar}>
      <div className="question-point-value">${pointValue}</div>
      <RenderContent value={question.prompt} className="question-prompt" />
      {showAnswer && (
        <div className="question-answer">
          <div className="answer-divider" />
          <RenderContent value={question.answer} className="answer-text" />
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
