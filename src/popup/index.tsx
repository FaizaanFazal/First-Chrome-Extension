import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

async function fetchQuestions(): Promise<string[]> {

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
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14);

  useEffect(() => {
    chrome.storage.local.get({ fontSize: 14 }, (items) => {
      setFontSize(items.fontSize);
    });
  }, []);


  useEffect(() => {
    chrome.storage.local.set({ fontSize });
  }, [fontSize]);

  const onFetch = async () => {
    setLoading(true);
    try {
      const qs = await fetchQuestions();
      setTitles(qs);
    } finally {
      setLoading(false);
    }
  };

  const adjustFont = (delta: number) => {
    setFontSize((fs) => Math.max(10, Math.min(32, fs + delta)));
  };

  return (
    <div style={{ padding: 12, fontFamily: 'sans-serif', width: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={() => adjustFont(-2)} disabled={fontSize <= 10}>A⁻</button>
        <button onClick={onFetch}>Fetch Questions</button>
        <button onClick={() => adjustFont(2)} disabled={fontSize >= 32}>A⁺</button>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : titles.length === 0 ? (
        <div>No questions yet. Click “Fetch Questions.”</div>
      ) : (
        <ul style={{ fontSize: `${fontSize}px`, maxHeight: 400, overflowY: 'auto', paddingLeft: 16 }}>
          {titles.map((t, i) => (
            <li key={i} style={{ marginBottom: 6 }}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Popup />);