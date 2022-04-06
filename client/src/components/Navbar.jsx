import React from 'react';

const Navbar = ({ onOpenIngestModal }) => {
  return (
    <nav style={{
      background: '#0c1220',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          color: '#fff',
          fontSize: '1.1rem'
        }}>
          ≋
        </div>
        <div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
            PulseStream<span style={{ color: 'var(--accent-cyan)' }}>.Analytics</span>
          </h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Real-Time Event-Time Engine & Watermarking</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '5px 12px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          color: '#10b981',
          fontFamily: 'JetBrains Mono'
        }}>
          ● STREAM STATUS: INGESTING
        </div>
        <button className="btn-primary" onClick={onOpenIngestModal}>
          + Ingest Event
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
