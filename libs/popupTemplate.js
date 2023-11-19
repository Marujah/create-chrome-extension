export const popupHTMLTemplate = `
<!DOCTYPE html>
  <html>
  <head>
    <title>Background Changer</title>
    <script src="popup.js"></script>
    <link rel="stylesheet" href="popup.css">
  </head>
  <body>
    <button id="changeBackground">Switch Background color</button>
  </body>
</html>`;

export const popupCSSTemplate = `
body {
  min-width: 400px;
  padding: 1rem;
  margin: 0 auto;
}
#changeBackground {
    cursor: pointer;
    padding: 15px;
    color: #fff;
    border: 1px solid blue;
    background-color: #1859bb;
    border-radius: 4px;
}
#changeBackground:hover {
    background-color: #0e397a;
}
`;

export const popupJSTemplate = `
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('changeBackground').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'changeBackground' });
    });
  });
});
`;

