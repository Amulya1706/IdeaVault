# IdeaVault – On‑Chain Idea Proof (Aptos)


## Run
1. Start AI: `cd ideavault-ai && uvicorn main:app --reload --port 8000`
2. Start Web: `cd ideavault && cp .env.local.example .env.local && npm i && npm run dev`
3. Open http://localhost:3000



## Certificates
- Auto‑downloaded PDF with QR that opens `/verify?id=...`.


## Move
- Minimal module in `/move/IdeaVault`. Publish later for real txns.