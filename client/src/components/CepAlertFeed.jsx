import React from 'react';

const CepAlertFeed = () => {
  const alerts = [
    { id: '1', rule: 'BruteForceAuthenticationPattern', time: '11:16:15', severity: 'CRITICAL', desc: '3 failed logins followed by password reset' },
    { id: '2', rule: 'HighVelocityTransactionAnomaly', time: '11:15:40', severity: 'WARNING', desc: 'PIN changed and high-value transfer within 120s' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span>Complex Event Processing (CEP) Alerts</span>
        <span style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'JetBrains Mono' }}>● FSM ACTIVE</span>
      </div>

      <div style={{
        background: '#080c16',
        border: '1px solid var(--border-color)',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '0.75rem'
      }}>
        {alerts.map(a => (
          <div key={a.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #141b29' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, color: a.severity === 'CRITICAL' ? '#f43f5e' : '#f59e0b' }}>
                [{a.severity}] {a.rule}
              </span>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{a.time}</span>
            </div>
            <p style={{ color: '#cbd5e1', marginTop: '4px' }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CepAlertFeed;
