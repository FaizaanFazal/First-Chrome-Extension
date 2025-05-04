/// <reference types="chrome" />

chrome.runtime.onInstalled.addListener(() => {
  chrome.webNavigation.onHistoryStateUpdated.addListener(
    (details) => {
      if (/^https:\/\/(www\.)?quora\.com/.test(details.url)) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ['content.js'],
        });
      }
    },
    {
      url: [
        { hostEquals: 'quora.com', schemes: ['https'] },
        { hostEquals: 'www.quora.com', schemes: ['https'] },
      ],
    }
  );
});
