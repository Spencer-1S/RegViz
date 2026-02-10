# RegViz

### [🔗 Live Demo](https://Spencer-1S.github.io/RegViz/)

**RegViz** is a clean, modern tool to visualize Regular Expressions as Deterministic Finite Automata (DFA). It bridges the gap between abstract regex patterns and their underlying state-machine logic, making it perfect for students and developers.

## ✨ Features

- **Instant Conversion**: Type a regex, get a DFA.
- **Clean Visualization**: Uses Graphviz (WebAssembly) to generate professional, textbook-quality diagrams.
- **Modern UI**: Built with React and Tailwind CSS for a responsive, dark-themed interface.
- **Robust Engine**: Powered by the industrial-strength `dk.brics.automaton` Java library.

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React, Vite, Tailwind CSS |
| **Viz Library** | @viz-js/viz (Graphviz WASM) |
| **Backend** | Java 21, Spring Boot 3 |
| **Logic** | dk.brics.automaton |
| **Hosting** | GitHub Pages (Frontend) + Render (Backend) |

## 🚀 Deployment Info

The project uses a split-hosting architecture:

1.  **Frontend**: Deployed as a static site on **GitHub Pages**.
2.  **Backend**: Containerized with Docker and hosted on **Render**.

> **Note**: The backend is hosted on a free tier service. If you are the first person visiting in a while, it may take **1-2 minutes** to wake up. Please be patient!

## 💻 Local Development

Follow these steps to run RegViz on your own machine.

### Prerequisites
*   Java 21 or higher
*   Node.js 18 or higher

### 1. Start the Backend
The Spring Boot server handles the heavy lifting of calculating the DFA.

```bash
# From the root directory
./mvnw spring-boot:run
```
*Port: 8081*

### 2. Start the Frontend
The React application communicates with the local backend.

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*Client: http://localhost:5173*

## 📝 Supported Regex Syntax
RegViz supports standard regular expression operations:
*   **Basics**: `abc`, `( )`
*   **Quantifiers**: `*`, `+`, `?`, `{n,m}`
*   **Alternation**: `|` (OR)
*   **Character Classes**: `[a-z]`, `[0-9]`
*   **Epsilon**: Use empty parentheses `()` to denote the empty string.

---
*Created by [Spencer-1S](https://github.com/Spencer-1S)*
