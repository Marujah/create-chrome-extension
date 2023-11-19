export const generateManifest = (data) => ({
    // Required
    manifest_version: 3,
    name: data.extensionName,
    version: "1.0.0",

    // Recommended
    action: {
        default_popup: "./popup/popup.html"
    },
    // Optional
    description: data.extensionDescription || "",
    icons: {
        16: './images/extension-default-icon16.png',
        32: './images/extension-default-icon32.png',
        48: './images/extension-default-icon48.png',
        128: './images/extension-default-icon128.png',
    },

    // Optional
    author: data?.extensionAuthor || "",
    background: {
        // Required
        service_worker: "service-worker.js",
    },
    permissions: ["activeTab", "scripting"],
    "content_scripts": [
        {
        "matches": ["<all_urls>"],
        "js": ["content.js"]
        }
    ]
});