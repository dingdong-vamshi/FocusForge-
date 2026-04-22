let currentTabInfo = null;

function getDomainFromUrl(url) {
    if (!url || !url.startsWith('http')) return null;
    try {
        const parsed = new URL(url);
        return parsed.hostname.replace('www.', '');
    } catch {
        return null;
    }
}

function categorizeDomain(domain) {
    if (!domain) return 'misc';
    const productive = ['github.com', 'stackoverflow.com', 'vscode.dev', 'docs.google.com', 'notion.so', 'figma.com'];
    const entertainment = ['youtube.com', 'netflix.com', 'twitch.tv'];
    const social = ['twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'reddit.com'];
    
    if (productive.includes(domain)) return 'productive';
    if (entertainment.includes(domain)) return 'entertainment';
    if (social.includes(domain)) return 'social';
    return 'misc';
}

async function sendActivityToServer(activity) {
    const data = await chrome.storage.local.get(['ff_api_url', 'ff_token']);
    if (!data.ff_api_url || !data.ff_token) return; // Not configured

    try {
        await fetch(`${data.ff_api_url}/activity/record`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.ff_token}`
            },
            body: JSON.stringify(activity)
        });
    } catch (e) {
        console.error("FocusForge Extension: Failed to send activity", e);
    }
}

function logCurrentActivity(endTime = new Date()) {
    if (!currentTabInfo || !currentTabInfo.domain) return;
    
    const durationMs = endTime - currentTabInfo.startTime;
    if (durationMs < 2000) return; // Ignore very brief domain visits

    const activityData = {
        domain: currentTabInfo.domain,
        title: currentTabInfo.title,
        category: categorizeDomain(currentTabInfo.domain),
        startTime: currentTabInfo.startTime.toISOString(),
        endTime: endTime.toISOString()
    };

    sendActivityToServer(activityData);
    currentTabInfo = null;
}

// LIVE PULSE TRACKING: Stream data to the server every 5 seconds without waiting for tab changes
function logPulseActivity(endTime) {
    if (!currentTabInfo || !currentTabInfo.domain) return;
    const durationMs = endTime - currentTabInfo.startTime;
    if (durationMs < 2000) return;

    const activityData = {
        domain: currentTabInfo.domain,
        title: currentTabInfo.title,
        category: categorizeDomain(currentTabInfo.domain),
        startTime: currentTabInfo.startTime.toISOString(),
        endTime: endTime.toISOString()
    };
    sendActivityToServer(activityData);
    
    // Keep tracking the same domain by rolling the start time forward
    currentTabInfo.startTime = endTime;
}

setInterval(() => {
    if (currentTabInfo) logPulseActivity(new Date());
}, 5000);

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    logCurrentActivity(); // Log previous tab before switching
    
    try {
        const tab = await chrome.tabs.get(activeInfo.tabId);
        startTrackingTab(tab);
    } catch (e) {
        // Tab might be closed
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        logCurrentActivity(); // Domain might have changed
        startTrackingTab(tab);
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // Chrome lost focus (user switched apps)
        logCurrentActivity();
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0]) {
                startTrackingTab(tabs[0]);
            }
        });
    }
});

function startTrackingTab(tab) {
    const domain = getDomainFromUrl(tab.url);
    if (!domain) return;

    currentTabInfo = {
        domain,
        title: tab.title || domain,
        startTime: new Date()
    };
}
