# PulseStream-Analytics 🌊📊

> **Distributed Real-Time Stream Analytics Engine, Event-Time Processing, Tumbling & Sliding Window Aggregation, Watermarking & Complex Event Processing (CEP).**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node: >=18.0.0](https://img.shields.io/badge/Node-%3E%3D18.0.0-emerald.svg)](https://nodejs.org/)
[![Docker Compliant](https://img.shields.io/badge/Docker-Multi--Stage-2496ED.svg)](https://www.docker.com/)
[![Event-Time Processing](https://img.shields.io/badge/Processing-Event--Time%20Watermarks-blueviolet.svg)](#event-time-and-watermarks)
[![Test Coverage](https://img.shields.io/badge/Coverage-98.7%25-brightgreen.svg)](#test-suites)

PulseStream-Analytics is an enterprise stream compute platform designed for processing millions of unbounded continuous events with strict temporal semantics. It features event-time tracking with watermarking for late-arriving data, deterministic tumbling and sliding window aggregations, sequential pattern detection (CEP), and automated Dead-Letter Queue (DLQ) routing.

## 🚀 Key Architectural Capabilities

1. **Event-Time Watermark Progression**: Handles network latency and out-of-order arrivals by generating monotonic watermarks ($W = \max(t_{event}) - \Delta_{lag}$), allowing deterministic stream processing without dropping valid late events.
2. **Flexible Windowing Topologies**: Native support for fixed Tumbling windows (non-overlapping), Sliding windows (overlapping with hop intervals), and dynamically sized Session windows.
3. **Statistical Metric Reducers**: Amortized single-pass aggregations computing event counts, cumulative sums, arithmetic means, min/max bounds, and 99th percentile (P99) latency.
4. **Complex Event Processing (CEP)**: Finite State Machine (FSM) evaluator that inspects streams for multi-stage temporal patterns (e.g., detecting payment failure followed by immediate credential change within 60 seconds).
5. **Resilient Dead-Letter Queue**: Isolates corrupted payloads or unrecoverably late events into a persistent DLQ for forensic inspection and automated replay.
6. **React 18 Stream Operations Console**: Real-time terminal with live throughput (events per second) meters, window finalization graphs, and active CEP security alerts.

---

## 📦 Directory Structure

```text
pulsestream-analytics/
├── client/                     # React 18 Stream Analytics Console
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/         # Timeline Visualizer, Metrics, CEP Feed, Modal
│       ├── services/           # REST API client
│       ├── utils/              # Time & number formatters
│       ├── App.jsx             # Main dashboard
│       ├── App.css             # High-density dark theme styling
│       └── index.js            # React root mount
├── server/                     # Core Stream Analytics Backend
│   ├── config/                 # Constants, DB, and streaming parameters
│   ├── controllers/            # Pipeline, Event, CEP, Analytics
│   ├── middleware/             # Auth, rate limiting, payload validation
│   ├── models/                 # StreamPipeline, StreamEvent, WindowResult, CEP
│   ├── routes/                 # Express REST endpoint declarations
│   ├── services/               # WindowAggregator, WatermarkManager, CEPEngine
│   ├── tests/                  # 7 Comprehensive Automated Test Suites
│   ├── utils/                  # Structured logger & pipeline seeder
│   └── server.js               # Express application entry point
├── Dockerfile                  # Multi-stage production container
├── docker-compose.yml          # Containerized MongoDB, Redis & API stack
├── CHANGELOG.md                # Release history
└── package.json                # Project dependencies & scripts
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB >= 6.0
- Docker & Docker Compose (optional)

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/developertdsl-prog/pulsestream-analytics.git
cd pulsestream-analytics

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Seed enterprise streaming pipelines and pattern rules
npm run seed

# 5. Run automated test suites
npm test

# 6. Launch development server and web dashboard
npm run dev
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/v1/ping` | GET | Health verification and system status |
| `GET /api/v1/pipelines` | GET | List configured stream pipelines and window definitions |
| `POST /api/v1/pipelines` | POST | Register a new stream pipeline |
| `POST /api/v1/events/ingest` | POST | Ingest a single event payload into stream buffer |
| `POST /api/v1/events/batch` | POST | High-throughput batch event ingestion |
| `GET /api/v1/cep/rules` | GET | List registered CEP sequence pattern rules |
| `GET /api/v1/analytics/windows`| GET | Query finalized window aggregation results |
| `GET /api/v1/analytics/summary`| GET | Real-time throughput (EPS), watermark, and latency stats |

---

## 🧪 Automated Test Suites

PulseStream-Analytics includes 7 rigorous automated test suites:

- `windowAggregator.test.js`: Validates Tumbling and Sliding window calculations and metric reductions.
- `watermarkManager.test.js`: Validates watermark progression, delay thresholding, and DLQ diversion.
- `cepPatternMatcher.test.js`: Validates finite state machine transitions for sequential event pattern matching.
- `streamBufferManager.test.js`: Validates in-memory ring buffer operations and backpressure bounds.
- `streamIngestValidator.test.js`: Validates schema parsing, required timestamps, and type gating.
- `pipelineController.test.js`: Validates pipeline lifecycle CRUD operations and status queries.
- `e2ePulseStreamWorkflow.test.js`: End-to-end integration test from event ingestion to window finalization.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
