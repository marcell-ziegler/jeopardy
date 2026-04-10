# Jeopardy!

A browser-based Jeopardy quiz game built with React and Vite. Builds to a **single static HTML file** for easy sharing.

## Features

- **Game Board**: nx5 grid with n category columns and point values $100–$500
- **Question View**: Full-screen display of questions and answers
- **Spacebar Controls**: Press Space to reveal answer, press again to return to board
- **Team Scoring**: Add unlimited teams with custom names; +100/−100 score buttons
- **Custom Questions**: Load your own questions from a JSON file

## How to Play

1. Click any dollar-value cell on the board to open that question full-screen
2. Press **Space** (or click) to reveal the answer
3. Press **Space** (or click) again to mark the question as used and return to the board
4. Press **Escape** to return to the board without marking the question as used
5. Use the team panel at the bottom to adjust scores

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build to dist/index.html (single file)
npm run preview  # Preview the build
```

## Custom Questions

Click **Load Questions** in the top-right corner to upload a JSON file with your questions. The format is:

```json
[
  {
    "columnTitle": "Category Name",
    "questions": [
      { "prompt": "Question text", "answer": "Answer text" },
      { "prompt": "Question text", "answer": "Answer text" },
      { "prompt": "Question text", "answer": "Answer text" },
      { "prompt": "Question text", "answer": "Answer text" },
      { "prompt": "Question text", "answer": "Answer text" }
    ]
  }
]
```

Each category must have exactly 5 questions (for $100, $200, $300, $400, $500).

A sample `questions.json` is included in `src/questions.json`.
