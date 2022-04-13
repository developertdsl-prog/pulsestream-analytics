import React, { useState } from 'react';

const IngestEventModal = ({ isOpen, onClose, onIngest }) => {
  const [pipelineId, setPipelineId] = useState('pipe-clickstream-01');
  const [value, setValue] = useState(120);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onIngest({
      pipelineId,
      payload: { value: parseFloat(value), eventType: 'USER_CLICK' },
      eventTimestamp: new Date()
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ width: '440px', maxWidth: '90%' }}>
        <div className="card-title">
          <span>Ingest Stream Event</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Target Pipeline</label>
            <select
              value={pipelineId}
              onChange={(e) => setPipelineId(e.target.value)}
              style={{ width: '100%', padding: '8px', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
            >
              <option value="pipe-clickstream-01">ClickstreamSessionAnalytics</option>
              <option value="pipe-fraud-02">FinancialFraudDetector</option>
              <option value="pipe-iot-telemetry-03">IoTTelemetryMonitor</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Metric Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: '100%', padding: '8px', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            Dispatch to Ingestion Gateway
          </button>
        </form>
      </div>
    </div>
  );
};

export default IngestEventModal;
