/// <reference types="chrome" />

console.log('[QuoraExt] content script injected on', location.href);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_QUESTION_LIST') {
    const items = Array.from(document.querySelectorAll<HTMLDivElement>(
      'div.puppeteer_test_question_title'
    )).map(div => {
      const anchor = div.closest('a') as HTMLAnchorElement | null;
      return {
        title: div.textContent?.trim() || '',
        href:   anchor?.href || ''
      };
    }).filter(item => item.title && item.href);

    console.log('[QuoraExt] scraped items:', items);
    sendResponse({ items });
  }
});
