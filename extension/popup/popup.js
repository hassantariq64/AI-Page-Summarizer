// DOM elements
const summarizeBtn = document.getElementById('summarizeBtn');
const statusElement = document.getElementById('status');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const summaryText = document.getElementById('summaryText');
const error = document.getElementById('error');

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    summarizeBtn.addEventListener('click', handleSummarize);
});

/**
 * Handle summarize button click
 */
async function handleSummarize() {
    try {
        // Reset UI
        hideAll();
        statusElement.textContent = 'Extracting page content...';
        statusElement.classList.remove('hidden');
        summarizeBtn.disabled = true;

        // Get current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab) {
            throw new Error('No active tab found');
        }

        // Inject content script and extract text
        const extractedText = await extractPageText(tab.id);

        if (!extractedText || extractedText.trim().length === 0) {
            throw new Error('No text content found on this page');
        }

        statusElement.textContent = 'Sending to AI...';

        // Send to background for summarization
        const summary = await chrome.runtime.sendMessage({
            action: 'summarize',
            text: extractedText
        });

        if (summary.error) {
            throw new Error(summary.error);
        }

        // Display result
        displaySummary(summary.summary);

    } catch (err) {
        displayError(err.message || 'An error occurred while summarizing');
    } finally {
        summarizeBtn.disabled = false;
    }
}

/**
 * Extract text from the current page using content script
 */
function extractPageText(tabId) {
    return new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(
            tabId,
            { action: 'extractText' },
            (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }
                if (response && response.text) {
                    resolve(response.text);
                } else {
                    reject(new Error('Failed to extract text from page'));
                }
            }
        );
    });
}

/**
 * Display the summary result
 */
function displaySummary(text) {
    hideAll();
    summaryText.textContent = text;
    result.classList.remove('hidden');
    statusElement.textContent = 'Summary complete';
    statusElement.classList.remove('hidden');
}

/**
 * Display error message
 */
function displayError(message) {
    hideAll();
    error.textContent = message;
    error.classList.remove('hidden');
    statusElement.textContent = 'Error occurred';
    statusElement.classList.remove('hidden');
}

/**
 * Hide all result/loading/error elements
 */
function hideAll() {
    loading.classList.add('hidden');
    result.classList.add('hidden');
    error.classList.add('hidden');
}
