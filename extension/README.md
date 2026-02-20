# AI Page Summarizer (Minimal Free Version)

A Chrome Extension that extracts visible text from web pages and provides AI-powered summaries.

## Project Structure

```
ai-page-summarizer/
│
├── manifest.json          # Extension manifest (Manifest V3)
├── popup/
│   ├── popup.html        # Popup UI structure
│   ├── popup.css         # Popup styling
│   └── popup.js          # Popup logic and message handling
│
├── content/
│   └── content.js        # Content script for text extraction
│
└── background/
    └── background.js     # Background service worker and AI integration
```

## Features

- ✅ Extracts visible text from any webpage
- ✅ Clean, minimal popup interface
- ✅ Message passing between popup, content script, and background
- ✅ Placeholder AI summarization function (ready for API integration)
- ✅ Error handling and loading states
- ✅ Manifest V3 compliant

## How to Load the Extension in Chrome

### Step 1: Enable Developer Mode

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Toggle **"Developer mode"** ON (top-right corner)

### Step 2: Load the Extension

1. Click **"Load unpacked"** button
2. Select the `ai-page-summarizer` folder (the folder containing `manifest.json`)
3. The extension should now appear in your extensions list

### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon (🧩) in Chrome's toolbar
2. Find "AI Page Summarizer" and click the pin icon to keep it visible

### Step 4: Test the Extension

1. Navigate to any webpage with text content
2. Click the extension icon in the toolbar
3. Click "Summarize This Page"
4. Wait for the summary to appear

## Icon Setup

The manifest references icon files in an `icons/` directory. You have two options to generate icons:

### Option 1: HTML Generator (Easiest - No dependencies)

1. Open `generate-icons.html` in your web browser
2. Click "Generate Icons" (they should appear automatically)
3. Click "Download All Icons" button, OR
4. Right-click each canvas and "Save image as..." to save:
   - `icon16.png` (16x16)
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)
5. Save all icons in the `icons/` folder

### Option 2: Python Script

1. Install Pillow: `pip install Pillow`
2. Run: `python3 create-icons.py`
3. Icons will be automatically created in the `icons/` folder

### Option 3: Manual Creation

Create an `icons/` folder and add three PNG files:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

If icons are missing, Chrome will use a default extension icon, but the extension will work fine.

## Integrating a Real AI API

To use a real AI API, edit `background/background.js` and replace the `summarizeText()` function:

```javascript
async function summarizeText(text) {
  // Example: Using a free API like Hugging Face Inference API
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      inputs: text,
      parameters: {
        max_length: 150,
        min_length: 30
      }
    })
  });
  
  const data = await response.json();
  return data[0].summary_text || data.summary;
}
```

### Free AI API Options:

- **Hugging Face Inference API** - Free tier available
- **Cohere API** - Free tier available
- **OpenAI API** - Pay-as-you-go (not free, but affordable)
- **Anthropic Claude API** - Pay-as-you-go

## How It Works

1. **User clicks extension icon** → Popup opens
2. **User clicks "Summarize This Page"** → Popup sends message to content script
3. **Content script extracts text** → Filters visible text from the page
4. **Text sent to background** → Background service worker receives text
5. **AI summarization** → `summarizeText()` processes the text (currently mocked)
6. **Result displayed** → Summary shown in popup

## Message Flow

```
Popup (popup.js)
    ↓ (sendMessage)
Content Script (content.js)
    ↓ (extractText response)
Popup (popup.js)
    ↓ (sendMessage)
Background (background.js)
    ↓ (summarizeText)
Popup (popup.js)
    ↓ (display result)
```

## Permissions

- `activeTab`: Allows the extension to access the current active tab
- `scripting`: Allows injection of content scripts

## Browser Compatibility

- Chrome 88+ (Manifest V3 support required)
- Edge 88+ (Chromium-based)

## Development Notes

- No frameworks or bundlers used (vanilla JavaScript)
- Modular code structure for easy maintenance
- Error handling included throughout
- Text extraction limits to 50,000 characters to prevent API issues

## Troubleshooting

**Extension not loading:**
- Ensure all files are in the correct folder structure
- Check `chrome://extensions/` for error messages
- Verify `manifest.json` is valid JSON

**No text extracted:**
- Some pages may have minimal visible text
- Check browser console for errors (F12 → Console tab)

**Summary not appearing:**
- Check background service worker logs (chrome://extensions → Details → Service worker)
- Verify message passing is working correctly

## License

Free to use and modify.
