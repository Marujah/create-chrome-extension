export const backgroundTemplate = `
chrome.runtime.onInstalled.addListener(() => {
  // add "contextMenu" to permissions in manifest.json and remove comments the next comments
  // chrome.contextMenus.create({
  //   "id": "sampleContextMenu",
  //   "title": "Sample Context Menu",
  //   "contexts": ["selection"],
  // });
});    
`;