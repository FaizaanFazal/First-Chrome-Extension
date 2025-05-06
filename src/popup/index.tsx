
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

type QuestionItem = { title: string; href: string; };

async function fetchQuestions(): Promise<QuestionItem[]> {
  // const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  // const activeTab = tabs[0];
  
  // const tabId = activeTab?.id;
  // if (typeof tabId !== 'number') {
  //   console.warn('No valid tab ID—cannot send message');
  //   return [];
  // }
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    console.warn('No valid tab ID—cannot send message');
    return [];
  }
  const tabId = tab.id;

  // 2. Ask content script for { items: QuestionItem[] }
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tabId,
      { type: 'GET_QUESTION_LIST' },
      (response: { items: QuestionItem[] }) => {
        if (chrome.runtime.lastError) {
          console.warn('[Popup] messaging error:', chrome.runtime.lastError.message);
          resolve([]);
        } else {
          resolve(response.items || []);
        }
      }
    );
  });
}

function Popup() {
  const [items, setItems] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(false);

  const onFetch = async () => {
    setLoading(true);
    try {
      const list = await fetchQuestions();
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  const openQuestion = (href: string) => {
    chrome.tabs.create({ url: href });
  };

  return (
    <div style={{ padding: 12, fontFamily: 'sans-serif', width: 320 }}>
      <button onClick={onFetch} style={{ marginBottom: 8 }}>
        Fetch Questions
      </button>

      {loading && <div>Loading…</div>}
      {!loading && items.length === 0 && (
        <div>No questions yet. Click “Fetch Questions.”</div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openQuestion(item.href);
              }}
              style={{
                textDecoration: 'none',
                color: '#0366d6',
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
              title={item.title}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Popup />);
