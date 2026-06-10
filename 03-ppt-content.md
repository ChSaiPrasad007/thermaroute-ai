# PPT Content: ThermaRoute AI

Use this content directly in a 15 to 20 slide submission deck. Speaker notes are included for presentation practice.

## Slide 1: Title

**ThermaRoute AI**  
Thermal-Equity Copilot for Climate-Resilient Campuses  
1M1B AI for Sustainability Virtual Internship  
Name: [Your Name]  
College: [Your College]

Visual: Campus heat map with shaded safe route line.

Speaker notes: Introduce the project as a rare AI sustainability idea focused on hyperlocal heat safety, not generic weather forecasting.

## Slide 2: The Overlooked Problem

- Official weather alerts are city-level.
- Real exposure happens at micro-locations: gates, rooftops, service yards, sports grounds, bus stops, and walkways.
- Students and outdoor workers often cannot avoid peak heat.
- Campuses need practical tools to decide where to add shade, water, rest breaks, and safer routes.

Visual: Split comparison: city temperature versus campus heat hotspot.

Speaker notes: Explain that two places in the same campus can feel very different because of surfaces, shade, airflow, and water access.

## Slide 3: Why This Matters

- WHO reports approximately 489,000 heat-related deaths per year globally for 2000 to 2019 studies.
- ILO reports excessive heat causes major worker safety and health risks.
- IPCC explains urban heat island effects make cities warmer than surroundings.
- Heat risk affects health, learning, productivity, infrastructure, and equity.

Visual: Three statistic tiles with WHO, ILO, IPCC source labels.

Speaker notes: Keep this factual and source-backed. The point is that heat is a sustainability and social equity problem.

## Slide 4: Project Selection Logic

- Avoided common ideas: flood prediction, generic waste segregation, crop advice, basic chatbots, carbon calculators.
- Selected a rare problem with high impact and easy demo creation.
- Chosen project connects SDG 11, SDG 3, and SDG 13.

Visual: Scoring matrix showing originality, feasibility, AI depth, impact.

Speaker notes: Show that the project was chosen intentionally, not randomly.

## Slide 5: Problem Statement

**How might we use AI to predict hyperlocal heat exposure and recommend safer routes, schedules, rest breaks, water access, and shade interventions so that campuses and outdoor work zones become more climate-resilient, inclusive, and sustainable?**

Visual: Large problem statement with icons for heat, route, water, shade, and safety.

Speaker notes: This is the core sentence of the project.

## Slide 6: SDG Alignment

- Primary SDG: 11 - Sustainable Cities and Communities.
- Secondary SDG: 3 - Good Health and Well-being.
- Secondary SDG: 13 - Climate Action.
- The project supports heat-safe infrastructure, inclusive planning, and climate adaptation.

Visual: SDG alignment triangle.

Speaker notes: Emphasize SDG 11 as the main anchor because the system improves local built environments.

## Slide 7: Target Users

- Campus administrators and sustainability cells.
- Facility, maintenance, security, sanitation, and canteen teams.
- Students, visitors, and outdoor workers.
- City resilience teams and NGOs in future expansion.

Visual: Stakeholder map.

Speaker notes: Stress that the project includes people who are often left out of sustainability technology.

## Slide 8: Existing Gaps

- Weather apps do not understand campus surfaces or shade.
- Manual complaints are not structured into action.
- Heat action plans may not identify micro-hotspots.
- Infrastructure decisions need evidence and prioritization.

Visual: Gap-to-opportunity table.

Speaker notes: AI is useful because it connects scattered data into decisions.

## Slide 9: Solution Overview

ThermaRoute AI provides:

- Heat-risk scoring.
- RAG-backed safety guidance.
- AI action plan.
- Safer route suggestions.
- Anonymous heat hotspot reports.
- Campus adaptation metrics.

Visual: Product dashboard mockup.

Speaker notes: Explain that the prototype is a working dashboard with backend logic.

## Slide 10: AI Architecture

Pipeline:

1. Weather and task inputs.
2. Zone context: shade, surface, water, canopy.
3. Heat index and exposure score.
4. Risk tier classification.
5. RAG evidence retrieval.
6. AI planning agent.
7. Recommendations and report loop.

Visual: Flowchart.

Speaker notes: Mention IBM Granite compatibility through the model adapter.

## Slide 11: AI Components

- IBM Granite compatible LLM adapter.
- Retrieval-Augmented Generation.
- Heat-risk classification.
- Recommendation logic.
- Summarization.
- Agentic workflow.
- Community report analytics.

Visual: AI component stack.

Speaker notes: This slide proves AI depth beyond a simple chatbot.

## Slide 12: Data Design

Sample data fields:

- Zone ID and name.
- Surface type.
- Shade score.
- Water points.
- Tree canopy.
- Temperature modifier.
- People exposed daily.
- User group and task duration.

Visual: Data schema card and sample JSON.

Speaker notes: Explain that the prototype uses mock data but is designed for real weather, IoT, and GIS inputs later.

## Slide 13: Prototype Demo Scenario

Scenario: Maintenance worker on hostel rooftop at midday.

Inputs:

- 38 C, 61 percent humidity.
- Heavy task.
- 45 minutes.
- Metal roof, low shade, no water point.
- Symptom: dizziness.

Output:

- Extreme risk.
- Postpone or use strict rest schedule.
- Add temporary shade and water.
- Human escalation if symptoms continue.

Visual: Before and after task plan.

Speaker notes: This is the demo scenario to run live.

## Slide 14: Dashboard Walkthrough

Dashboard tabs:

- Assess: simulate heat exposure task.
- Zones: view hotspot map and safer routes.
- Reports: submit anonymous heat observations.
- Sources: view RAG knowledge base.

Visual: Four-tab product walkthrough.

Speaker notes: Keep the demo fast and focused.

## Slide 15: Responsible AI

- Fairness: includes outdoor workers, sanitation workers, security staff, elderly visitors.
- Transparency: shows risk score, tier, and evidence.
- Privacy: anonymous reports only.
- Safety: no medical diagnosis; escalate symptoms to humans.
- Hallucination prevention: RAG and deterministic fallback.
- Environmental AI: lightweight rules first, LLM only when needed.

Visual: Risk and mitigation table.

Speaker notes: Responsible AI is mandatory in the internship, so make this confident.

## Slide 16: Expected Impact

Environmental:

- More shade, trees, cool surfaces, and water access.

Social:

- Safer routes and schedules for vulnerable campus users.

Economic:

- Lower disruption, fewer heat incidents, smarter infrastructure spending.

Visual: Impact flywheel.

Speaker notes: Make the link between recommendations and real campus action.

## Slide 17: KPIs and Evaluation

- Number of zones assessed.
- Percentage of high-risk zones improved.
- Peak-hour outdoor tasks reduced.
- Anonymous hotspot reports resolved.
- Water and shade access coverage.
- Safer route usage.

Visual: KPI dashboard.

Speaker notes: Evaluation matters because judges want measurable impact.

## Slide 18: Roadmap and Closing

Future roadmap:

- Live weather API.
- GPS route planning.
- Image-based shade detection.
- IoT heat sensors.
- Multilingual worker alerts.
- City heat-action-plan integration.

Closing line:  
**ThermaRoute AI turns invisible heat exposure into visible, responsible, and actionable climate adaptation.**

Visual: Roadmap timeline.

Speaker notes: End with confidence. This project is rare, feasible, and meaningful.

