# ThermaRoute AI

ThermaRoute AI is a submission-ready project for the 1M1B AI for Sustainability Virtual Internship. It is a thermal-equity copilot that helps campuses and city institutions protect students, informal workers, security staff, sanitation workers, and visitors from extreme heat exposure.

## Why this project was chosen

Common internship ideas often focus on flood prediction, generic waste segregation, crop advice, carbon calculators, or basic chatbots. ThermaRoute AI focuses on a less commonly selected but urgent sustainability gap: hyperlocal heat safety and urban heat adaptation. It combines climate resilience, public health, worker dignity, and sustainable campus planning.

Primary SDG: SDG 11 - Sustainable Cities and Communities  
Secondary SDGs: SDG 3 - Good Health and Well-being, SDG 13 - Climate Action

## What the demo does

- Scores heat risk for a specific campus zone, weather condition, task, user group, and exposure duration.
- Retrieves evidence from a small RAG knowledge base using official sources such as ILO, WHO, IPCC, NDMA, and IMD-linked public guidance.
- Generates a heat-safe action plan through a deterministic mock AI by default.
- Supports OpenAI-compatible model integration for IBM Granite or other LLM providers.
- Shows safer route options based on shade and water access.
- Lets users submit anonymous heat hotspot reports.
- Converts reports into metrics that support shade, water, scheduling, and cool-infrastructure decisions.

## Folder structure

```text
thermaroute-ai/
  backend/
    app/
      data/                 Seeded zones, guidance, and sample requests
      services/             Risk scoring, RAG, AI adapter, recommendations
      main.py               FastAPI app
    requirements.txt
    .env.example
  frontend/
    src/
      components/           Dashboard UI components
      lib/api.js            API client
      App.jsx
    package.json
  docs/
    01-project-selection.md
    02-project-report.md
    03-ppt-content.md
    04-demo-script.md
    05-resume-linkedin.md
```

## Run locally

### 1. Backend

```bash
cd thermaroute-ai/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open API docs at:

```text
http://127.0.0.1:8000/docs
```

### 2. Frontend

```bash
cd thermaroute-ai/frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Optional real AI integration

The backend works without paid APIs. To connect an OpenAI-compatible endpoint, edit `backend/.env`:

```env
USE_REAL_AI=true
AI_API_KEY=your_key_here
AI_BASE_URL=https://your-openai-compatible-endpoint/v1
AI_MODEL=your-granite-or-compatible-model
```

The same `AIClient` interface can be connected to IBM Granite through watsonx.ai or a gateway that exposes chat-completions style requests.

## Deployment guide

Simple student deployment:

1. Deploy backend to Render, Railway, Fly.io, or a VPS.
2. Set environment variables from `.env.example`.
3. Deploy frontend to Vercel or Netlify.
4. Set `VITE_API_BASE=https://your-backend-url`.
5. Update `FRONTEND_ORIGIN` in the backend to the deployed frontend URL.

## Submission files

- Full project report: `docs/02-project-report.md`
- PPT slide content and speaker notes: `docs/03-ppt-content.md`
- 5-minute demo script: `docs/04-demo-script.md`
- Resume and LinkedIn material: `docs/05-resume-linkedin.md`

