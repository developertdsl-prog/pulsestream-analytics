import React from 'react';

const WindowTimelineVisualizer = () => {
  const recentWindows = [
    { id: 'WIN-01', start: '11:14:00', end: '11:15:00', count: 2450, sum: '342.1k', p99: '412ms', status: 'FINALIZED' },
    { id: 'WIN-02', start: '11:15:00', end: '11:16:00', count: 2680, sum: '378.4k', p99: '395ms', status: 'FINALIZED' },
    { id: 'WIN-03', start: '11:16:00', end: '11:17:00', count: 1890, sum: '254.2k', p99: '425ms', status: 'COMPUTING' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span>Tumbling Window Aggregation Timeline (60s Slices)</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>
          Watermark Lag Tolerance: 3000ms
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '12px',
        background: '#090d18',
        padding: '16px',
        borderRadius: '6px'
      }}>
        {recentWindows.map(w => (
          <div key={w.id} style={{
            background: '#10172a',
            border: `1px solid ${w.status === 'COMPUTING' ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
            borderRadius: '6px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>{w.id}</span>
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background: w.status === 'FINALIZED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                color: w.status === 'FINALIZED' ? '#10b981' : '#06b6d4',
                fontWeight: 700
              }}>
                {w.status}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w.start} ➔ {w.end}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.75rem', fontFamily: 'JetBrains Mono' }}>
              <span style={{ color: 'var(--accent-emerald)' }}>Events: {w.count.toLocaleString()}</span>
              <span style={{ color: 'var(--accent-cyan)' }}>P99: {w.p99}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WindowTimelineVisualizer;
