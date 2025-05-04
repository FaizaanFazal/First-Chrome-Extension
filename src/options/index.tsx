// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';

// function Options() {
//   const [fontSize, setFontSize] = useState<number>(14);
//   const [status, setStatus] = useState<string>('');

//   useEffect(() => {
//     chrome.storage.local.get({ fontSize: 14 }, (items) => {
//       setFontSize(items.fontSize);
//     });
//   }, []);

//   // Save handler
//   const saveOptions = () => {
//     chrome.storage.local.set({ fontSize }, () => {
//       setStatus('Options saved.');
//       setTimeout(() => setStatus(''), 1500);
//     });
//   };

//   return (
//     <div style={{ padding: 16, fontFamily: 'sans-serif', maxWidth: 300 }}>
//       <h2 style={{ marginTop: 0 }}>Extension Settings</h2>

//       <label htmlFor="fontSize" style={{ display: 'block', marginBottom: 8 }}>
//         Default Question Text Size: <strong>{fontSize}px</strong>
//       </label>
//       <input
//         id="fontSize"
//         type="range"
//         min={10}
//         max={32}
//         value={fontSize}
//         onChange={(e) => setFontSize(Number(e.target.value))}
//         style={{ width: '100%' }}
//       />

//       <button
//         onClick={saveOptions}
//         style={{ marginTop: 12, padding: '6px 12px' }}
//       >
//         Save
//       </button>

//       {status && (
//         <div style={{ marginTop: 8, color: 'green' }}>
//           {status}
//         </div>
//       )}
//     </div>
//   );
// }

// const container = document.getElementById('root');
// if (container) {
//   createRoot(container).render(<Options />);
// }
