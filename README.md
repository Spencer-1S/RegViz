# RegViz (Spring Boot + React)

Local-first app that converts regular expressions to DFAs using `dk.brics.automaton`, with a React + Tailwind + Graphviz UI for visualization.

## Prerequisites
- Java 21+
- Node.js 18+

## Backend (Spring Boot)
```powershell
mvn spring-boot:run
```
API lives at `http://localhost:8081/api`. Swagger UI: `http://localhost:8081/swagger-ui.html`.

## Frontend (Vite React)
Located in `./frontend`.
```powershell
cd frontend
npm install
npm run dev
```
Vite dev server runs on `http://localhost:5173` and proxies `/api` to the backend.

## Run tests
```powershell
mvn test
```

## Notes
- DFA diagram uses Graphviz (via @viz-js/viz) for authentic layout.
- CORS is open for `http://localhost:5173` in dev. Remove or tighten for production.
