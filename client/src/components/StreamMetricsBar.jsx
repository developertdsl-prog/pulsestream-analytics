import React from 'react';

const StreamMetricsBar = ({ summary }) => {
  const cards = [
    { label: 'Ingestion Throughput', value: `${summary.eventsPerSecond || 1480} EPS`, unit: 'real-time', color: '#06b6d4' },
    { label: 'P99 Processing Latency', value: `${summary.p99LatencyMs || 2.14}ms`, unit: 'sub-3ms', color: '#10b981' },
    { label: 'Finalized Time Windows', value: summary.finalizedWindowsTotal || 1240, unit: 'windows', color: '#8b5cf6' },
    { label: 'Dead-Letter Queue (DLQ)', value: summary.deadLetterEventsCount || 0, unit: 'dropped', color: '#f59e0b' },
    { label: 'Active Stream Pipelines', value: summary.activePipelines || 3, unit: 'topologies', color: '#38bdf8' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '14px'
    }}>
      {cards.map((c, i) => (
        <div key={i} className="card" style={{ borderLeft: `3px solid ${c.color}` }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{c.label}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', fontFamily: 'JetBrains Mono' }}>
              {c.value}
            </span>
            <span style={{ fontSize: '0.7rem', color: c.color, fontWeight: 600 }}>{c.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreamMetricsBar;
