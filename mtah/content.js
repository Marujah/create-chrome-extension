
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'changeBackground') {
    // Change the background color here
    document.body.style.backgroundColor = '#2eaeff';
  }
});
