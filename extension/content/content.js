/**
 * Content script to extract visible text from the webpage
 */

/**
 * Extract visible text from the page
 * Filters out script, style, and other non-visible elements
 */
function extractVisibleText() {
    // Get all text nodes from the live document
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                // Skip if parent is script, style, or hidden
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;

                const tagName = parent.tagName.toLowerCase();
                if (['script', 'style', 'noscript', 'iframe', 'embed', 'object'].includes(tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }

                // Check if element is hidden via attributes
                if (parent.hasAttribute('hidden') ||
                    parent.getAttribute('style')?.includes('display: none') ||
                    parent.getAttribute('style')?.includes('display:none')) {
                    return NodeFilter.FILTER_REJECT;
                }

                // Check if element is visible using computed styles
                try {
                    const style = window.getComputedStyle(parent);
                    if (style.display === 'none' ||
                        style.visibility === 'hidden' ||
                        style.opacity === '0' ||
                        style.position === 'fixed' && (style.top === '-9999px' || style.left === '-9999px')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                } catch (e) {
                    // If we can't compute style, skip this node
                    return NodeFilter.FILTER_REJECT;
                }

                // Only accept non-empty text nodes
                return node.textContent.trim().length > 0
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        if (text.length > 0) {
            textNodes.push(text);
        }
    }

    // Join and clean up the text
    let fullText = textNodes.join(' ');

    // Remove excessive whitespace
    fullText = fullText.replace(/\s+/g, ' ').trim();

    // Limit text length to prevent API issues (optional, can be adjusted)
    const MAX_LENGTH = 50000; // ~10k words
    if (fullText.length > MAX_LENGTH) {
        fullText = fullText.substring(0, MAX_LENGTH) + '... [text truncated]';
    }

    return fullText;
}

/**
 * Listen for messages from popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractText') {
        try {
            const text = extractVisibleText();
            sendResponse({ text: text });
        } catch (error) {
            sendResponse({ error: error.message });
        }
        return true; // Indicates we will send a response asynchronously
    }
});
