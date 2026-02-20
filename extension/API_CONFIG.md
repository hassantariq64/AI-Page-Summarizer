# Backend API Configuration

## Current Setup

The extension is configured to call your backend at:
- **Base URL**: `http://localhost:3000`
- **Default Endpoint**: `/api/summarize`

## API Requirements

Your backend should accept a POST request with the following format:

### Request
```json
{
  "text": "The extracted text from the webpage..."
}
```

### Response Options

The extension supports multiple response formats. Your backend can return any of these:

**Option 1** (Recommended):
```json
{
  "summary": "Your summarized text here..."
}
```

**Option 2**:
```json
{
  "result": "Your summarized text here..."
}
```

**Option 3**:
```json
{
  "data": {
    "summary": "Your summarized text here..."
  }
}
```

**Option 4** (Simple string):
```
"Your summarized text here..."
```

## Customizing the Endpoint

If your backend uses a different endpoint, edit `background/background.js`:

1. Find the `API_URL` constant in the `summarizeText()` function
2. Update it to match your endpoint:
   ```javascript
   const API_URL = 'http://localhost:3000/your-endpoint';
   ```

## Customizing Request Body

If your API requires additional fields, edit the `body` in `summarizeText()`:

```javascript
body: JSON.stringify({
    text: text,
    maxLength: 150,    // Add your custom fields
    minLength: 30,
    // ... other fields
})
```

## Testing

1. Make sure your backend is running on `http://localhost:3000`
2. Test the endpoint with curl:
   ```bash
   curl -X POST http://localhost:3000/api/summarize \
     -H "Content-Type: application/json" \
     -d '{"text":"Test text to summarize"}'
   ```
3. Reload the extension in Chrome (`chrome://extensions` → click reload)
4. Try summarizing a webpage

## Troubleshooting

**Error: "Cannot connect to backend server"**
- Make sure your backend is running
- Check that the port is 3000
- Verify CORS is enabled on your backend (see below)

**CORS Issues**

If you get CORS errors, add these headers to your backend response:

```javascript
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

**For Node.js/Express:**
```javascript
const cors = require('cors');
app.use(cors());
```
