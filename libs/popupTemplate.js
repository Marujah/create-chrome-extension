export const popupHTMLTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <title>my chrome extension</title>
    <link rel="stylesheet" href="popup.css">
  </head>
  <body>
    <button id="changeColor">Change Background</button>
    <script src="popup.js"></script>
  </body>
</html>`;

export const popupCSSTemplate = `
#changeColor {
    cursor: pointer;
    padding: 15px;
    color: #fff;
    border: 1px solid blue;
    background-color: #1859bb;
    border-radius: 4px;
}
#changeColor:hover {
    background-color: #0e397a;
}
`;

export const popupJSTemplate = `
let changeColor = document.getElementById("changeColor");
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColorToLightBlue,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColorToLightBlue() {
    document.body.style.backgroundColor = '#6ab4ec';
};
`;

