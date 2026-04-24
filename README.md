# RegViz

RegViz is a full-stack web application that converts regular expressions into deterministic finite automata (DFA) and visualizes the result as a Graphviz diagram.

Live Demo: [https://Spencer-1S.github.io/RegViz/](https://Spencer-1S.github.io/RegViz/)

## Overview

RegViz is designed for students, educators, and developers who want to understand how regex patterns map to finite-state machines. The application accepts a supported regular expression, builds an automaton on the backend, and renders a clean DFA diagram in the browser.

## Key Features

- Convert regex input into DFA states and transitions
- Render DFA diagrams using Graphviz (WASM) in the frontend
- Return both structured DFA data and DOT output from the API
- Support optional DFA minimization
- Provide validation feedback for unsupported or invalid patterns

## Technology Stack

| Layer            | Technology                                |
|------------------|-------------------------------------------|
| Frontend         | React (Vite), Tailwind CSS                |
| Visualization    | `@viz-js/viz` (Graphviz WebAssembly)      |
| Backend          | Spring Boot 3, Java 21                    |
| Automaton Engine | `dk.brics.automaton`                      |
| Hosting          | GitHub Pages (frontend), Render (backend) |

## System Architecture

- `frontend/` contains the React UI and diagram rendering logic.
- `src/main/java/` contains REST API endpoints, validation, and regex-to-DFA conversion.
- The frontend calls the backend endpoint `POST /api/dfa`.
- The backend returns DFA metadata (states, transitions, accept states) and DOT graph content.

## Project Structure

```text
regextodfa/
  frontend/                      # React application
    src/
      api/client.js              # Axios client with VITE_API_BASE support
      components/                # Form, diagram, summary UI
  src/main/java/com/spencer/regextodfa/
    controller/DfaController.java
    service/RegexToDfaService.java
    model/                       # Request/response and graph models
```

## Local Development

### Prerequisites

- Java 21 or later
- Node.js 18 or later
- npm

### 1) Start the Backend (Spring Boot)

From the project root:

```bash
# macOS/Linux
./mvnw spring-boot:run

# Windows (PowerShell)
.\mvnw.cmd spring-boot:run
```

Backend default URL: `http://localhost:8081`

### 2) Start the Frontend (React)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Frontend API Configuration

The frontend Axios client reads `VITE_API_BASE` and builds the API URL as:

- `${VITE_API_BASE}/api` when `VITE_API_BASE` is set
- `/api` when `VITE_API_BASE` is not set (uses Vite proxy in local development)

Example `.env` (inside `frontend/`):

```bash
VITE_API_BASE=https://regviz.onrender.com
```

## API Reference

### Health Check

- `GET /api/`
- Response: `RegViz API is running!`

### Build DFA

- `POST /api/dfa`
- Content-Type: `application/json`

Request body:

```json
{
  "regex": "a*(ab|c)",
  "alphabet": null,
  "minimize": true
}
```

Main response fields:

- `regex`, `alphabet`
- `startState`, `acceptStates`, `states`
- `transitions`, `nodes`, `edges`
- `minimized`
- `dot` (Graphviz DOT string)

## Supported Regex Syntax

RegViz supports the regex syntax handled by the current automaton engine implementation, including common constructs such as:

- Grouping: `( )`
- Alternation: `|`
- Quantifiers: `*`, `+`, `?`, `{n,m}`
- Character classes and ranges: `[a-z]`, `[0-9]`

### Important Notes

- This project does not aim to support every PCRE/JavaScript regex feature.
- Anchors and advanced assertions may behave differently than full validation engines.
- If an unsupported pattern is entered, the API returns a validation or processing error.

## Deployment Notes

- Frontend is deployed to GitHub Pages.
- Backend is deployed on Render.
- On Render free tier, the backend may take time to wake up after inactivity.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a pull request

## Author

Created and maintained by [Spencer-1S](https://github.com/Spencer-1S).

## License

This project is licensed under the **GNU General Public License v3.0**. See the `LICENSE` file for details.
