# Changelog - PulseStream-Analytics

All notable changes to this project are documented chronologically in accordance with [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2022-06-24
### Added
- Enterprise-grade Event-Time processing engine with dynamic Watermark generation for handling out-of-order streams.
- High-performance Tumbling, Sliding, and Session window aggregators (Count, Sum, Avg, Min, Max, P99).
- Finite State Machine (FSM) Complex Event Processing (CEP) engine detecting multi-stage pattern sequences.
- Ring-buffer in-memory stream buffer with automated backpressure shedder and Dead-Letter Queue (DLQ).
- React 18 Stream Operations Dashboard with live throughput EPS counters and real-time window timeline visualizer.

## [0.8.0] - 2022-05-13
### Added
- Dead-Letter Queue (DLQ) persistent storage for late-arriving events exceeding watermark thresholds.
- Millisecond-precision latency percentile tracking and batch event ingestion endpoints.

## [0.5.0] - 2022-03-21
### Added
- RESTful pipeline management API for dynamic window definition and rule registration.
- Pre-configured enterprise pipelines for Clickstream Analytics, Fraud Detection, and IoT Monitoring.

## [0.2.0] - 2022-02-14
### Added
- Initial in-memory event buffer and tumbling window time-slicer.
- Stream payload schema validator and API rate limiter.

## [0.1.0] - 2022-01-10
### Initial
- Project scaffolding, Mongoose schemas, Docker orchestration, and initial architectural specifications.
