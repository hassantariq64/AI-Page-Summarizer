/**
 * Background Service Worker
 * Handles message passing and AI summarization
 */

/**
 * AI summarization function using backend API
 * 
 * @param {string} text - The text to summarize
 * @returns {Promise<string>} - The summarized text
 */
async function summarizeText(text) {
    // Backend API endpoint
    const API_URL = 'http://localhost:3000/summarize';

    // Backend requirements:
    // - Field name: "content" (not "text")
    // - Max length: 12000 characters
    // - Must not be empty
    // - Must be a string

    // Validate and prepare text
    if (!text || typeof text !== 'string') {
        throw new Error('Text content is required and must be a string');
    }

    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
        throw new Error('Text content cannot be empty');
    }

    // Truncate to 12000 characters if needed
    const MAX_LENGTH = 12000;
    const content = trimmedText.length > MAX_LENGTH
        ? trimmedText.substring(0, MAX_LENGTH) + '... [truncated]'
        : trimmedText;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content  // Backend expects "content" field
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || errorData.error || response.statusText;

            // Provide helpful error messages
            let userMessage = `Backend error (${response.status}): ${errorMessage}`;

            if (errorMessage.includes('exceed')) {
                userMessage += '\n\nThe page content is too long. Try a shorter page.';
            } else if (errorMessage.includes('empty')) {
                userMessage += '\n\nNo text content found on this page.';
            }

            throw new Error(userMessage);
        }

        const data = await response.json();

        // Adjust these based on your API response structure:
        // Common response formats:
        // - { summary: "..." }
        // - { result: "..." }
        // - { data: { summary: "..." } }
        // - Just a string

        if (data.summary) {
            return data.summary;
        } else if (data.result) {
            return data.result;
        } else if (data.data && data.data.summary) {
            return data.data.summary;
        } else if (typeof data === 'string') {
            return data;
        } else {
            // Fallback: return the whole response as string
            return JSON.stringify(data, null, 2);
        }

    } catch (error) {
        // Handle network errors
        if (error.message.includes('Failed to fetch') ||
            error.message.includes('NetworkError') ||
            error.message.includes('CORS')) {
            throw new Error(
                'Cannot connect to backend server.\n' +
                'Make sure:\n' +
                '1. Backend is running on http://localhost:3000\n' +
                '2. CORS is enabled on your backend\n' +
                '3. The endpoint exists (tried: ' + API_URL + ')'
            );
        }
        throw error;
    }
}

/**
 * Handle messages from popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarize') {
        // Handle summarization asynchronously
        summarizeText(request.text)
            .then(summary => {
                sendResponse({ summary: summary });
            })
            .catch(error => {
                sendResponse({ error: error.message || 'Failed to summarize text' });
            });

        // Return true to indicate we will send a response asynchronously
        return true;
    }
});

/**
 * Service worker lifecycle
 */
chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Page Summarizer extension installed');
});
