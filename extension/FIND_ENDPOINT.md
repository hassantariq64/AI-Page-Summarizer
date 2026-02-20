# Finding Your Backend Endpoint

## Quick Test

The extension is currently trying: `http://localhost:3000/summarize`

If that doesn't work, check your backend code to find the correct endpoint.

## Common Backend Patterns

### Express.js Example:
```javascript
// If your route looks like this:
app.post('/summarize', ...)           // Use: '/summarize'
app.post('/api/summarize', ...)       // Use: '/api/summarize'
app.post('/summarize-text', ...)     // Use: '/summarize-text'
app.post('/', ...)                    // Use: '/'
```

### FastAPI Example:
```python
# If your route looks like this:
@app.post("/summarize")               # Use: '/summarize'
@app.post("/api/summarize")          # Use: '/api/summarize'
```

## How to Update

1. Open `background/background.js`
2. Find line 20: `const API_URL = 'http://localhost:3000/summarize';`
3. Change `/summarize` to match your backend route
4. Save and reload the extension

## Test Your Backend Directly

Test if your endpoint works with curl:

```bash
curl -X POST http://localhost:3000/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Test text to summarize"}'
```

Or test different endpoints:
```bash
# Try /api/summarize
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Test"}'

# Try root
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"text":"Test"}'
```

## What Your Backend Should Accept

**Request:**
```json
{
  "text": "The webpage text to summarize..."
}
```

**Response (any format works):**
```json
{
  "summary": "Your summary here"
}
```
OR
```json
{
  "result": "Your summary here"
}
```

## Still Not Working?

1. **Check CORS** - Make sure your backend allows requests from Chrome extensions
2. **Check the port** - Make sure it's actually running on port 3000
3. **Check the method** - Must be POST
4. **Check the route** - Look at your backend code to see the exact route path
