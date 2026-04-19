document.addEventListener('DOMContentLoaded', () => {
    const setupView = document.getElementById('setup-view');
    const activeView = document.getElementById('active-view');
    const apiUrlInput = document.getElementById('apiUrl');
    const tokenInput = document.getElementById('token');
    const saveBtn = document.getElementById('saveBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const statusDiv = document.getElementById('status');

    // Load existing settings
    chrome.storage.local.get(['ff_api_url', 'ff_token'], (res) => {
        if (res.ff_api_url) apiUrlInput.value = res.ff_api_url;
        if (res.ff_token) {
            tokenInput.value = res.ff_token;
            showActiveView();
        }
    });

    saveBtn.addEventListener('click', () => {
        const apiUrl = apiUrlInput.value.trim().replace(/\/$/, '');
        const token = tokenInput.value.trim();

        if (!apiUrl || !token) {
            showStatus('Please enter both API URL and Token', '#ef4444');
            return;
        }

        chrome.storage.local.set({ ff_api_url: apiUrl, ff_token: token }, () => {
            showStatus('Connected successfully!');
            showActiveView();
        });
    });

    disconnectBtn.addEventListener('click', () => {
        chrome.storage.local.remove(['ff_token'], () => {
            setupView.style.display = 'block';
            activeView.style.display = 'none';
            tokenInput.value = '';
            showStatus('Disconnected', '#ef4444');
        });
    });

    function showActiveView() {
        setupView.style.display = 'none';
        activeView.style.display = 'block';
    }

    function showStatus(text, color = '#10b981') {
        statusDiv.textContent = text;
        statusDiv.style.color = color;
        setTimeout(() => statusDiv.textContent = '', 3000);
    }
});
