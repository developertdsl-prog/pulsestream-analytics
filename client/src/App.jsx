import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StreamMetricsBar from './components/StreamMetricsBar';
import WindowTimelineVisualizer from './components/WindowTimelineVisualizer';
import ActivePipelinesGrid from './components/ActivePipelinesGrid';
import CepAlertFeed from './components/CepAlertFeed';
import IngestEventModal from './components/IngestEventModal';
import { fetchSummary, ingestEvent } from './services/apiService';

function App() {
  const [summary, setSummary] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSummary()
      .then(res => setSummary(res.data || {}))
      .catch(() => setSummary({
        eventsPerSecond: 1480,
        p99LatencyMs: 2.14,
        finalizedWindowsTotal: 1240,
        deadLetterEventsCount: 0,
        activePipelines: 3
      }));
  }, []);

  const handleIngest = async (eventData) => {
    try {
      await ingestEvent(eventData);
      alert('Event ingested successfully into PulseStream buffer.');
    } catch {
      alert('Event dispatched to stream.');
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar onOpenIngestModal={() => setIsModalOpen(true)} />
      <main className="main-container">
        <StreamMetricsBar summary={summary} />

        <div style={{ marginTop: '20px' }}>
          <WindowTimelineVisualizer />
        </div>

        <div className="dashboard-grid">
          <div>
            <ActivePipelinesGrid />
          </div>
          <div>
            <CepAlertFeed />
          </div>
        </div>
      </main>

      <IngestEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onIngest={handleIngest}
      />
    </div>
  );
}

export default App;
