export const serviceWorkerTemplate = `
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});
`;