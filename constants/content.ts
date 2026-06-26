import type {
  FeaturePanel,
  LogoItem,
  NavLink,
  StatItem,
  Testimonial,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Product", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#testimonials" },
];

export const FEATURE_PANELS: FeaturePanel[] = [
  {
    id: "ingest",
    title: "Universal ingestion",
    summary: "Pull from 200+ sources without writing a connector.",
    detail:
      "Point Dataflow at a database, warehouse, SaaS API, or flat-file drop and it infers schema, handles pagination and backfills, and keeps itself in sync as upstream shapes change.",
    size: "lg",
  },
  {
    id: "clean",
    title: "Self-healing cleaning",
    summary: "Anomalies get flagged and fixed before they reach a table.",
    detail:
      "Statistical and AI-based checks catch null spikes, type drift, and duplicate records at ingest time, with one-click rules that turn a fix into a permanent guardrail.",
    size: "sm",
  },
  {
    id: "transform",
    title: "Composable transforms",
    summary: "Chain reusable steps instead of one-off scripts.",
    detail:
      "Every transform — join, dedupe, enrich, redact — is a versioned, testable unit you can share across pipelines, with full lineage from raw input to final output.",
    size: "sm",
  },
  {
    id: "orchestrate",
    title: "Adaptive orchestration",
    summary: "Pipelines reschedule themselves around real-world failures.",
    detail:
      "Dataflow's scheduler retries with backoff, reroutes around degraded sources, and escalates only when a human decision is actually required.",
    size: "md",
  },
  {
    id: "govern",
    title: "Built-in governance",
    summary: "Every field is traceable from source to dashboard.",
    detail:
      "Column-level lineage, access policies, and audit logs are generated automatically — no separate cataloging step, no stale documentation.",
    size: "md",
  },
];

export const STATS: StatItem[] = [
  { id: "uptime", value: "99.99%", label: "Pipeline uptime", detail: "Across all managed regions, trailing 12 months" },
  { id: "rows", value: "4.2T", label: "Rows processed monthly", detail: "Streaming and batch combined", trending: true },
  { id: "setup", value: "18 min", label: "Median time to first pipeline", detail: "From signup to first successful run" },
  { id: "teams", value: "1,400+", label: "Engineering teams", detail: "Running Dataflow in production" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "We replaced eleven cron jobs and a Slack channel full of manual fixes with three Dataflow pipelines. Nobody has paged for a broken ETL job since.",
    name: "Priya Raman",
    role: "Head of Data Platform",
    company: "Northwind Logistics",
  },
  {
    id: "t2",
    quote:
      "The lineage view alone paid for the platform. Our compliance review went from three weeks to an afternoon.",
    name: "Marcus Lindgren",
    role: "VP Engineering",
    company: "Heliotrope Health",
  },
  {
    id: "t3",
    quote:
      "Dataflow's adaptive orchestration caught a degraded upstream API before our own monitoring did, and rerouted around it automatically.",
    name: "Ada Ferreira",
    role: "Staff Data Engineer",
    company: "Quillrock Finance",
  },
];

export const LOGOS: LogoItem[] = [
  { id: "northwind", name: "Northwind Logistics" },
  { id: "heliotrope", name: "Heliotrope Health" },
  { id: "quillrock", name: "Quillrock Finance" },
  { id: "fernbridge", name: "Fernbridge Retail" },
  { id: "amberlane", name: "Amberlane Energy" },
  { id: "solandra", name: "Solandra Labs" },
];

export const PROBLEM_POINTS = [
  {
    id: "manual-fixes",
    title: "Every broken pipeline is a 2am page",
    body: "Schema changes upstream, a job fails silently, and someone finds out when a dashboard is already wrong in front of a customer.",
  },
  {
    id: "tribal-knowledge",
    title: "Lineage lives in someone's head",
    body: "When the one engineer who remembers how a transform works is on vacation, every audit and every incident takes twice as long.",
  },
  {
    id: "glue-code",
    title: "Glue code outlives the person who wrote it",
    body: "Cron jobs and one-off scripts accumulate until nobody is confident which ones are safe to touch, let alone delete.",
  },
];

export const TRUST_POINTS = [
  {
    id: "compliance",
    title: "Compliance-ready by default",
    body: "Column-level access policies and audit logs are generated automatically, not bolted on before a review.",
  },
  {
    id: "encryption",
    title: "Encrypted in transit and at rest",
    body: "Every connector and managed store uses the same encryption standard — no exceptions for legacy sources.",
  },
  {
    id: "isolation",
    title: "Dedicated infrastructure on Enterprise",
    body: "VPC peering and dedicated compute keep regulated workloads isolated from the shared platform.",
  },
];

export const ENGINE_POINTS = [
  {
    id: "reasoning",
    title: "Reasoning over raw signals",
    body: "Every event is interpreted in context against your schema and history, not just logged and forgotten.",
  },
  {
    id: "self-correcting",
    title: "Self-correcting models",
    body: "Drift in upstream data triggers a retraining pass before accuracy quietly decays in a downstream report.",
  },
  {
    id: "composable-ai",
    title: "Composable AI primitives",
    body: "The same reasoning steps that clean one pipeline are reusable building blocks for the next one.",
  },
];
