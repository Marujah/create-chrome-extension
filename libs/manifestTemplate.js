export const generateManifest = (data) => ({
    // Required
    manifest_version: 3,
    name: data.extensionName,
    version: "1.0.0",

    // Recommended
    action: {
        ...(data.defaultPopup && {default_popup: "./popup/popup.html"}),
    },
    description: data.extensionDescription || "",
    icons: {
        16: './images/extension-default-icon16.png',
        32: './images/extension-default-icon32.png',
        48: './images/extension-default-icon48.png',
        128: './images/extension-default-icon128.png',
    },

    // Optional
    author: "",
    background: {
        // Required
        service_worker: "background.js",
        // Optional
        ...(data.backgroundType && {type: data.backgroundType})
    },
    permissions: [...new Set(["scripting", ...data.permissions?.split(',').map(i => i.trim())])],
});