/// <reference types="chrome" />

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GET_QUESTION_LIST') {
      const nodes = document.querySelectorAll<HTMLDivElement>(
        'div.puppeteer_test_question_title'
      );
      const titles = Array.from(nodes)
        .map((n) => n.textContent?.trim() || '')
        .filter((t) => t);
      sendResponse({ titles });
    }
  });
  