/// <reference types="chrome" />

// background.ts

// Fired when extension is first installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Quora Helper extension installed/updated:', details.reason);
  });
  