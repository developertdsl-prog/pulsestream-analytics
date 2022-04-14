import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'x-stream-key': 'pulsestream_sec_token_9942'
  }
});

export const fetchSummary = async () => {
  const res = await apiClient.get('/analytics/summary');
  return res.data;
};

export const ingestEvent = async (eventData) => {
  const res = await apiClient.post('/events/ingest', eventData);
  return res.data;
};

export default apiClient;
