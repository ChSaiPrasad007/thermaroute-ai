import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createSlideContext,
  ensureArtifactToolWorkspace,
  importArtifactTool,
  saveBlobToFile,
} from "file:///C:/Users/hp/.codex/plugins/cache/openai-primary-runtime/presentations/26.601.10930/skills/presentations/scripts/artifact_tool_utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const workspace = path.resolve(projectRoot, "..", "outputs", "manual-20260610-thermaroute", "presentations", "thermaroute-ai");
const outDir = path.resolve(projectRoot, "presentation", "output");
const previewDir = path.resolve(workspace, "preview");
const outputPptx = path.resolve(outDir, "ThermaRoute-AI-Submission-Deck.pptx");

const C = {
  ink: "#17201B",
  paper: "#F8F6EF",
  sand: "#EFE7D6",
  moss: "#466A45",
  fern: "#78A65A",
  solar: "#F3B23C",
  clay: "#C45C3C",
  blue: "#3F7F95",
  white: "#FFFFFF",
  line: "#D9D1C2",
};

function addBg(slide, ctx, color = C.paper) {
  ctx.addShape(slide, { x: 0, y: 0, width: ctx.W, height: ctx.H, fill: color });
}

function text(slide, ctx, value, x, y, width, height, options = {}) {
  return ctx.addText(slide, {
    text: value,
    x,
    y,
    width,
    height,
    fontSize: options.size ?? 24,
    color: options.color ?? C.ink,
    bold: options.bold ?? false,
    typeface: options.face ?? (options.title ? "Aptos Display" : "Aptos"),
    valign: options.valign ?? "top",
    align: options.align ?? "left",
    fill: options.fill ?? "#00000000",
    line: { style: "solid", fill: "#00000000", width: 0 },
    insets: options.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
    name: options.name,
  });
}

function kicker(slide, ctx, label, index = 1, color = C.moss) {
  ctx.addShape(slide, { x: 58, y: 42, width: 28, height: 6, fill: color, name: `kicker-${index}-marker` });
  text(slide, ctx, label.toUpperCase(), 98, 32, 430, 28, {
    size: 13,
    color: C.ink,
    bold: true,
    valign: "middle",
    name: `kicker-${index}-label`,
  });
}

function title(slide, ctx, value, y = 82) {
  text(slide, ctx, value, 58, y, 760, 88, { size: 42, bold: true, title: true });
}

function footer(slide, ctx, n) {
  ctx.addShape(slide, { x: 58, y: 670, width: 1030, height: 1, fill: C.line });
  text(slide, ctx, "ThermaRoute AI | 1M1B AI for Sustainability Virtual Internship", 58, 680, 650, 18, {
    size: 11,
    color: "#6A6256",
  });
  text(slide, ctx, String(n).padStart(2, "0"), 1170, 674, 54, 24, { size: 13, color: C.ink, bold: true, align: "right" });
}

async function icon(slide, ctx, name, x, y, size = 34, color = C.ink) {
  try {
    await ctx.addLucideIcon(slide, { icon: name, x, y, width: size, height: size, color, strokeWidth: 2.1 });
  } catch {
    text(slide, ctx, name.slice(0, 1), x, y, size, size, { size: 16, bold: true, color, align: "center", valign: "middle" });
  }
}

function bulletList(slide, ctx, items, x, y, width, options = {}) {
  const gap = options.gap ?? 54;
  items.forEach((item, i) => {
    const top = y + i * gap;
    ctx.addShape(slide, { x, y: top + 10, width: 9, height: 9, fill: options.color ?? C.moss });
    text(slide, ctx, item, x + 24, top, width - 24, gap - 4, {
      size: options.size ?? 21,
      color: options.textColor ?? C.ink,
    });
  });
}

function metric(slide, ctx, value, label, x, y, width, color = C.moss) {
  ctx.addShape(slide, { x, y, width, height: 118, fill: C.white, line: { style: "solid", fill: C.line, width: 1 } });
  ctx.addShape(slide, { x, y, width: 9, height: 118, fill: color });
  text(slide, ctx, value, x + 26, y + 20, width - 42, 42, { size: 30, bold: true, color });
  text(slide, ctx, label, x + 26, y + 66, width - 42, 36, { size: 15, color: "#5D574F" });
}

function card(slide, ctx, heading, body, x, y, width, height, color = C.white) {
  ctx.addShape(slide, { x, y, width, height, fill: color, line: { style: "solid", fill: C.line, width: 1 } });
  text(slide, ctx, heading, x + 20, y + 18, width - 40, 32, { size: 18, bold: true });
  text(slide, ctx, body, x + 20, y + 58, width - 40, height - 72, { size: 15, color: "#5D574F" });
}

function source(slide, ctx, value) {
  text(slide, ctx, value, 58, 645, 980, 16, { size: 9.5, color: "#736D64" });
}

function hBar(slide, ctx, label, value, max, x, y, width, color) {
  text(slide, ctx, label, x, y - 2, 260, 20, { size: 14, color: C.ink, bold: true });
  ctx.addShape(slide, { x: x + 280, y, width, height: 16, fill: "#E8E0D2" });
  ctx.addShape(slide, { x: x + 280, y, width: Math.max(12, (value / max) * width), height: 16, fill: color });
  text(slide, ctx, String(value), x + 290 + width, y - 2, 48, 18, { size: 13, color: "#5D574F" });
}

async function build() {
  await ensureArtifactToolWorkspace(workspace);
  const artifact = await importArtifactTool(workspace);
  const { Presentation, PresentationFile } = artifact;
  const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  const ctx = createSlideContext(artifact, { slideSize: { width: 1280, height: 720 }, workspaceDir: workspace, outputDir: outDir });

  const slides = [];
  const add = async (fn) => {
    const slide = presentation.slides.add();
    slides.push(slide);
    await fn(slide, slides.length);
  };

  await add(async (s, n) => {
    addBg(s, ctx, C.ink);
    ctx.addShape(s, { x: 0, y: 0, width: 1280, height: 720, fill: "linear(135deg, #17201B 0%, #31482E 58%, #C45C3C 100%)" });
    await icon(s, ctx, "ThermometerSun", 65, 58, 56, C.solar);
    text(s, ctx, "ThermaRoute AI", 64, 132, 760, 76, { size: 62, bold: true, color: C.white, title: true });
    text(s, ctx, "Thermal-Equity Copilot for Climate-Resilient Campuses", 68, 224, 760, 44, { size: 25, color: "#F7EBD1" });
    text(s, ctx, "Primary SDG 11 | Secondary SDG 3 and SDG 13", 68, 292, 520, 32, { size: 17, color: "#F7EBD1", bold: true });
    metric(s, ctx, "AI + RAG", "risk scoring, guidance retrieval, action planning", 68, 398, 340, C.solar);
    metric(s, ctx, "Rare idea", "hyperlocal heat exposure, not generic weather alerts", 432, 398, 340, C.fern);
    text(s, ctx, "Name: [Your Name]\nCollege: [Your College]\n1M1B AI for Sustainability Virtual Internship", 856, 490, 330, 92, { size: 17, color: C.white });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "overlooked gap", n, C.clay);
    title(s, ctx, "Heat risk is hyperlocal, but most tools are city-level.");
    bulletList(s, ctx, [
      "The same campus can contain cool shaded paths and dangerous heat pockets.",
      "People who walk, wait, clean, guard, deliver, or maintain facilities cannot always avoid peak heat.",
      "Weather alerts rarely explain where to add shade, water, rest breaks, or safer routing.",
    ], 70, 208, 560, { gap: 74 });
    card(s, ctx, "Common project blind spot", "Many sustainability projects stop at broad prediction. ThermaRoute AI turns climate risk into micro-location decisions.", 760, 200, 360, 220, "#FFF7E7");
    await icon(s, ctx, "MapPinned", 792, 456, 56, C.blue);
    await icon(s, ctx, "Sun", 890, 456, 56, C.solar);
    await icon(s, ctx, "Droplets", 988, 456, 56, C.moss);
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, "#FCFAF4");
    kicker(s, ctx, "evidence", n, C.blue);
    title(s, ctx, "Extreme heat is a health, work, and city-resilience problem.");
    metric(s, ctx, "489k", "approx. annual heat-related deaths globally in 2000-2019 studies", 70, 220, 330, C.clay);
    metric(s, ctx, "2.4B", "workers estimated by ILO as exposed to excessive heat", 470, 220, 330, C.solar);
    metric(s, ctx, "UHI", "urban heat islands make cities warmer than surroundings", 870, 220, 330, C.blue);
    text(s, ctx, "The sustainability challenge is not only rising temperature. It is unequal exposure: who has shade, water, schedule control, and safer routes.", 145, 410, 950, 82, { size: 27, bold: true, color: C.ink, align: "center" });
    source(s, ctx, "Sources: WHO Heat and health fact sheet; ILO Heat at work; IPCC AR6 Urban Areas Fact Sheet.");
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "selection logic", n, C.moss);
    title(s, ctx, "The chosen project beats common ideas on originality and demo value.");
    const labels = ["ThermaRoute AI", "RepairLoop AI", "CoolRoof Scout", "PharmaReturn", "Generic carbon app"];
    const values = [95, 82, 80, 76, 45];
    labels.forEach((label, i) => hBar(s, ctx, label, values[i], 100, 110, 218 + i * 54, 530, [C.moss, C.blue, C.fern, C.solar, C.clay][i]));
    card(s, ctx, "Why selected", "Rare problem, visible demo, strong SDG fit, multiple AI components, and clear responsible-AI boundaries.", 820, 228, 310, 220, "#FFFFFF");
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, C.ink);
    kicker(s, ctx, "problem statement", n, C.solar);
    text(s, ctx, "How might we use AI to predict hyperlocal heat exposure and recommend safer routes, schedules, rest breaks, water access, and shade interventions so that campuses and outdoor work zones become more climate-resilient, inclusive, and sustainable?", 104, 150, 980, 300, { size: 38, bold: true, color: C.white, title: true });
    await icon(s, ctx, "Route", 162, 500, 44, C.solar);
    await icon(s, ctx, "Clock", 282, 500, 44, C.fern);
    await icon(s, ctx, "Droplets", 402, 500, 44, "#9ED0E0");
    await icon(s, ctx, "Trees", 522, 500, 44, C.fern);
    await icon(s, ctx, "ShieldCheck", 642, 500, 44, C.white);
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "sdg alignment", n, C.blue);
    title(s, ctx, "SDG 11 is the anchor: safer and more resilient local environments.");
    card(s, ctx, "Primary SDG 11", "Sustainable Cities and Communities: identify heat hotspots and prioritize shade, water, cool routes, and local adaptation.", 78, 220, 330, 230, "#FFFFFF");
    card(s, ctx, "Secondary SDG 3", "Good Health and Well-being: prevent heat stress through practical risk guidance and human escalation.", 474, 220, 330, 230, "#FFFFFF");
    card(s, ctx, "Secondary SDG 13", "Climate Action: prepare institutions for more frequent and intense extreme heat conditions.", 870, 220, 330, 230, "#FFFFFF");
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, "#F7F1E5");
    kicker(s, ctx, "target users", n, C.moss);
    title(s, ctx, "ThermaRoute AI protects people with unequal exposure and low schedule control.");
    const users = [
      ["Students", "long walks across exposed routes"],
      ["Security staff", "fixed outdoor posts"],
      ["Sanitation teams", "physical work in open areas"],
      ["Maintenance workers", "rooftops and service yards"],
      ["Administrators", "heat action and infrastructure planning"],
    ];
    users.forEach(([h, b], i) => card(s, ctx, h, b, 82 + (i % 3) * 372, 220 + Math.floor(i / 3) * 150, 320, 110, i === 4 ? "#FFF7E7" : C.white));
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "solution", n, C.moss);
    title(s, ctx, "A decision-support loop, not just another chatbot.");
    const steps = ["Assess", "Retrieve", "Reason", "Recommend", "Report", "Improve"];
    steps.forEach((step, i) => {
      const x = 80 + i * 185;
      ctx.addShape(s, { x, y: 270, width: 130, height: 82, fill: i % 2 ? "#FFF7E7" : C.white, line: { style: "solid", fill: C.line, width: 1 } });
      text(s, ctx, step, x + 14, 292, 102, 28, { size: 18, bold: true, align: "center" });
      if (i < steps.length - 1) text(s, ctx, ">", x + 142, 295, 34, 28, { size: 24, bold: true, color: C.moss, align: "center" });
    });
    bulletList(s, ctx, [
      "Risk score combines weather, zone, task, user group, duration, and timing.",
      "RAG adds trusted guidance before the AI writes an action plan.",
      "Community reports convert lived experience into adaptation priorities.",
    ], 128, 430, 940, { gap: 48, size: 19 });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, "#FCFAF4");
    kicker(s, ctx, "ai architecture", n, C.blue);
    title(s, ctx, "The architecture combines scoring, RAG, planning, and analytics.");
    const nodes = [
      ["Inputs", "weather, humidity, task, user"],
      ["Zone context", "shade, surface, water, canopy"],
      ["Risk model", "heat index + exposure score"],
      ["RAG", "trusted heat guidance"],
      ["AI agent", "plain-language action plan"],
      ["Dashboard", "routes, reports, KPIs"],
    ];
    nodes.forEach(([h, b], i) => {
      const x = 82 + (i % 3) * 380;
      const y = 215 + Math.floor(i / 3) * 150;
      card(s, ctx, h, b, x, y, 300, 105, C.white);
      if (i < 5 && i % 3 !== 2) text(s, ctx, ">", x + 314, y + 38, 30, 26, { size: 22, bold: true, color: C.blue, align: "center" });
    });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "data design", n, C.solar);
    title(s, ctx, "The prototype uses mock campus data but production-ready data fields.");
    const fields = ["surface type", "shade score", "water points", "tree canopy", "temperature modifier", "people exposed", "task duration", "user group"];
    fields.forEach((field, i) => {
      const x = 92 + (i % 4) * 270;
      const y = 220 + Math.floor(i / 4) * 105;
      ctx.addShape(s, { x, y, width: 220, height: 68, fill: i % 2 ? "#FFF7E7" : C.white, line: { style: "solid", fill: C.line, width: 1 } });
      text(s, ctx, field, x + 14, y + 20, 192, 28, { size: 18, bold: true, align: "center" });
    });
    text(s, ctx, "Future inputs: live weather API, IoT sensors, GPS routes, GIS layers, image-based shade detection.", 155, 480, 910, 52, { size: 24, bold: true, align: "center" });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, C.ink);
    kicker(s, ctx, "demo scenario", n, C.solar);
    text(s, ctx, "Maintenance worker on a hostel rooftop at midday", 70, 96, 850, 58, { size: 40, bold: true, color: C.white, title: true });
    const demo = [
      ["Weather", "38 C, 61% humidity"],
      ["Task", "heavy work, 45 minutes"],
      ["Place", "metal roof, shade 10/100"],
      ["Access", "no water point"],
      ["Signal", "dizziness reported"],
    ];
    demo.forEach(([h, b], i) => metric(s, ctx, h, b, 78 + (i % 3) * 375, 230 + Math.floor(i / 3) * 142, 310, i === 4 ? C.clay : C.solar));
    text(s, ctx, "Expected result: Extreme risk. Postpone non-essential work, add shade and water, and escalate symptoms to human support.", 105, 540, 1000, 62, { size: 26, bold: true, color: C.white, align: "center" });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "product walkthrough", n, C.blue);
    title(s, ctx, "Four dashboard tabs make the demo easy to judge.");
    card(s, ctx, "Assess", "Run a task scenario and generate score, tier, rest plan, hydration plan, recommendations, and evidence.", 82, 225, 250, 225, "#FFFFFF");
    card(s, ctx, "Zones", "View campus hotspots and safer route options based on shade and water access.", 372, 225, 250, 225, "#FFF7E7");
    card(s, ctx, "Reports", "Submit anonymous heat observations to build a community sensing loop.", 662, 225, 250, 225, "#FFFFFF");
    card(s, ctx, "Sources", "Show the RAG knowledge base and trusted evidence used by the AI assistant.", 952, 225, 250, 225, "#FFF7E7");
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, "#FCFAF4");
    kicker(s, ctx, "responsible ai", n, C.moss);
    title(s, ctx, "The system is designed to assist, explain, and escalate.");
    const rows = [
      ["Fairness", "includes workers, students, staff, and elderly visitors"],
      ["Transparency", "shows score, tier, reasons, and sources"],
      ["Privacy", "anonymous reports only"],
      ["Safety", "does not diagnose; symptoms route to humans"],
      ["Hallucination control", "RAG plus deterministic fallback"],
    ];
    rows.forEach(([h, b], i) => {
      ctx.addShape(s, { x: 108, y: 205 + i * 72, width: 980, height: 52, fill: i % 2 ? "#FFFFFF" : "#F2EAD9", line: { style: "solid", fill: "#00000000", width: 0 } });
      text(s, ctx, h, 132, 218 + i * 72, 250, 24, { size: 18, bold: true });
      text(s, ctx, b, 392, 218 + i * 72, 650, 24, { size: 17, color: "#5D574F" });
    });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "impact", n, C.moss);
    title(s, ctx, "Expected impact spans environment, people, and operations.");
    card(s, ctx, "Environmental", "More shade, trees, cool surfaces, and climate-resilient campus planning.", 98, 230, 315, 220, "#FFFFFF");
    card(s, ctx, "Social", "Safer schedules and routes for people with unequal heat exposure.", 482, 230, 315, 220, "#FFF7E7");
    card(s, ctx, "Economic", "Less disruption, smarter maintenance timing, and better targeting of low-cost interventions.", 866, 230, 315, 220, "#FFFFFF");
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, "#F7F1E5");
    kicker(s, ctx, "kpis", n, C.blue);
    title(s, ctx, "The project can be evaluated with measurable sustainability KPIs.");
    bulletList(s, ctx, [
      "Zones assessed and high-risk zones improved.",
      "Peak-hour outdoor tasks reduced or rescheduled.",
      "Water and shade access coverage increased.",
      "Anonymous heat reports resolved by administrators.",
      "Safer route recommendations used during heat events.",
    ], 95, 210, 860, { gap: 62, size: 22, color: C.blue });
    await icon(s, ctx, "BarChart3", 1005, 250, 92, C.moss);
    await icon(s, ctx, "Target", 1080, 360, 72, C.clay);
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx);
    kicker(s, ctx, "technical stack", n, C.solar);
    title(s, ctx, "The demo is complete, local, and upgrade-ready.");
    card(s, ctx, "Frontend", "React, Vite, Tailwind CSS, responsive dashboard, lucide icons.", 82, 225, 330, 180, "#FFFFFF");
    card(s, ctx, "Backend", "FastAPI, Pydantic, SQLite, heat-risk service, RAG service, AI adapter.", 474, 225, 330, 180, "#FFF7E7");
    card(s, ctx, "AI integration", "Works offline with deterministic mock AI; can connect to IBM Granite through an OpenAI-compatible endpoint.", 866, 225, 330, 180, "#FFFFFF");
    text(s, ctx, "Designed for student feasibility today and real campus pilots tomorrow.", 160, 490, 920, 44, { size: 28, bold: true, align: "center" });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, C.ink);
    kicker(s, ctx, "roadmap", n, C.solar);
    text(s, ctx, "From campus prototype to city heat-action platform", 70, 92, 860, 64, { size: 42, bold: true, color: C.white, title: true });
    const roadmap = ["Live weather", "GPS routes", "IoT sensors", "Image shade detection", "Multilingual alerts", "City integration"];
    roadmap.forEach((item, i) => {
      const x = 86 + i * 180;
      ctx.addShape(s, { x, y: 300, width: 120, height: 120, fill: i % 2 ? "#31482E" : "#53362D", line: { style: "solid", fill: "#FFFFFF33", width: 1 } });
      text(s, ctx, item, x + 10, 340, 100, 50, { size: 16, bold: true, color: C.white, align: "center", valign: "middle" });
      if (i < roadmap.length - 1) text(s, ctx, ">", x + 128, 344, 34, 28, { size: 24, bold: true, color: C.solar, align: "center" });
    });
    text(s, ctx, "ThermaRoute AI turns invisible heat exposure into visible, responsible, and actionable climate adaptation.", 110, 520, 980, 58, { size: 28, bold: true, color: C.white, align: "center" });
    footer(s, ctx, n);
  });

  await add(async (s, n) => {
    addBg(s, ctx, "#FCFAF4");
    kicker(s, ctx, "references", n, C.moss);
    title(s, ctx, "References and evidence base", 80);
    bulletList(s, ctx, [
      "WHO: Heat and health fact sheet.",
      "ILO: Heat at work - implications for safety and health.",
      "IPCC AR6: Urban Areas Fact Sheet and urban heat island evidence.",
      "NDMA India: Heat Wave guidance and thresholds.",
      "PIB / IMD-linked public heatwave safety guidance.",
    ], 100, 210, 900, { gap: 56, size: 20, color: C.moss });
    text(s, ctx, "All claims in the demo are planning guidance, not medical diagnosis. Human escalation is required when symptoms or emergency conditions appear.", 118, 540, 940, 58, { size: 20, bold: true, color: C.clay, align: "center" });
    footer(s, ctx, n);
  });

  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });
  for (let i = 0; i < slides.length; i += 1) {
    const preview = await presentation.export({ slide: slides[i], format: "png", scale: 1 });
    await saveBlobToFile(preview, path.resolve(previewDir, `slide-${String(i + 1).padStart(2, "0")}.png`));
  }
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPptx);
  console.log(JSON.stringify({ outputPptx, slideCount: slides.length, previewDir }, null, 2));
}

build().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
