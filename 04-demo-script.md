# 5-Minute Demo Script

## 0:00 to 0:30 - Opening

Hello everyone. My project is **ThermaRoute AI**, a thermal-equity copilot for climate-resilient campuses. I chose this topic because many students choose common sustainability ideas like waste segregation, crop advice, or carbon calculators. I wanted a rare but important problem: extreme heat exposure at the exact places where people walk, wait, work, and study.

## 0:30 to 1:15 - Problem

Weather apps usually give city-level alerts, but actual heat risk is hyperlocal. A shaded garden route, an asphalt gate walkway, and a metal rooftop can feel completely different even on the same day. This matters for students, security staff, sanitation workers, canteen workers, delivery workers, and maintenance staff. These groups may not have the freedom to avoid peak heat.

My problem statement is: How might we use AI to predict hyperlocal heat exposure and recommend safer routes, schedules, rest breaks, water access, and shade interventions so campuses become more climate-resilient and inclusive?

## 1:15 to 2:00 - Solution

ThermaRoute AI takes weather, humidity, task duration, task intensity, user group, time of day, and zone data such as surface, shade score, tree canopy, and water points. It calculates a heat-risk score, classifies the risk tier, retrieves trusted heat guidance using RAG, and generates an action plan.

The system is aligned mainly with SDG 11: Sustainable Cities and Communities, and also supports SDG 3 and SDG 13.

## 2:00 to 3:15 - Live Demo

Now I will run the prototype. I choose the hostel rooftop utility area. The scenario is a maintenance worker doing a heavy task for 45 minutes at midday, with 38 C temperature and 61 percent humidity.

When I click "Assess risk," the backend calculates the heat index and adjusts it using the zone context. Because this is a metal roof with very low shade and no water point, the risk becomes very high.

The system gives a rest plan, hydration plan, and recommendations such as postponing non-essential work, adding temporary shade, placing water access, and escalating symptoms to human support. It also shows evidence from sources such as WHO, ILO, IPCC, and Indian heat guidance.

## 3:15 to 4:00 - Product Differentiation

What makes this project different is that it is not just a chatbot and not just a weather dashboard. It connects heat science, campus infrastructure, AI guidance, and community reports. The reports tab lets users submit anonymous observations like "this gate walkway feels dangerously hot and has no water point." Over time, administrators can identify hotspots and prioritize shade, water, tree cover, cool roofs, and safer schedules.

## 4:00 to 4:40 - Responsible AI

Responsible AI is built into the design. The system explains the risk score, shows the evidence used, avoids collecting personal identity data, and clearly states that it is not a medical diagnosis. If symptoms are reported, it recommends human escalation instead of pretending to act as a doctor. The system can work with a deterministic mock model, and can later connect to IBM Granite through an OpenAI-compatible adapter.

## 4:40 to 5:00 - Closing

ThermaRoute AI turns invisible heat exposure into visible and actionable climate adaptation. It is rare, practical, socially impactful, and feasible for student implementation. My goal is to show how AI can help campuses protect people while building more sustainable and climate-resilient environments. Thank you.

## Q&A Preparation

**Q: Why is this better than a weather app?**  
A: Weather apps provide city-level conditions. ThermaRoute AI combines weather with campus micro-location factors such as shade, surface, water access, task duration, and vulnerable user group.

**Q: Does the AI diagnose heat illness?**  
A: No. It only provides planning guidance. Symptoms trigger human escalation and first-aid recommendations.

**Q: Can this work without real sensors?**  
A: Yes. The prototype uses mock zone data and manual inputs. Later, it can integrate weather APIs, IoT sensors, GPS, and GIS data.

**Q: Why is this a sustainability project?**  
A: It supports climate adaptation, sustainable urban planning, shade infrastructure, water access, and inclusive safety for vulnerable groups.

**Q: What is the role of IBM Granite?**  
A: The project has an OpenAI-compatible adapter that can connect to IBM Granite or similar models for RAG-backed summarization and action planning.

