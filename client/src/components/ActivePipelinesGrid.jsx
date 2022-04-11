import React from 'react';

const ActivePipelinesGrid = () => {
  const pipelines = [
    { id: 'pipe-clickstream-01', name: 'ClickstreamSessionAnalytics', topic: 'web-events-v1', type: 'SLIDING (60s / 15s)', field: 'durationMs' },
    { id: 'pipe-fraud-02', name: 'FinancialFraudDetector', topic: 'payment-transactions', type: 'TUMBLING (30s)', field: 'amount' },
    { id: 'pipe-iot-telemetry-03', name: 'IoTTelemetryMonitor', topic: 'industrial-sensors', type: 'TUMBLING (10s)', field: 'temperature' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span>Active Stream Pipelines</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 Active</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pipelines.map(p => (
          <div key={p.id} style={{
            background: '#0d1322',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: '#fff' }}>{p.name}</span>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono',
                background: '#1e293b',
                padding: '2px 8px',
                borderRadius: '4px',
                color: 'var(--accent-cyan)'
              }}>
                {p.type}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Topic: <strong style={{ color: '#cbd5e1' }}>{p.topic}</strong> | Aggregation Field: <strong style={{ color: '#cbd5e1' }}>{p.field}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivePipelinesGrid;
