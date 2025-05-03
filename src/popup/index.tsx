// src/popup/index.tsx
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

async function fetchQuestions(): Promise<string[]> {
  // 1. Grab the active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];

  const tabId = activeTab?.id;
  if (typeof tabId !== 'number') {
    console.warn('No valid tab ID—cannot send message');
    return [];
  }

  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tabId,
      { type: 'GET_QUESTION_LIST' },
      (response: { titles: string[] }) => {
        resolve(response?.titles ?? []);
      }
    );
  });
}

function Popup() {
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions()
      .then(setTitles)
      .catch((err) => {
        console.error(err);
        setTitles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: 12 }}>Loading…</div>;
  }
  if (titles.length === 0) {
    return <div style={{ padding: 12 }}>No questions found. Habibi</div>;
  }

  return (
    <div style={{ padding: 12, fontFamily: 'sans-serif', width: 300 }}>
      <h2>Questions on this page</h2>
      <ul style={{ maxHeight: 400, overflowY: 'auto' }}>
        {titles.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<Popup />);
}
