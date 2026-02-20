# AI Page Summarizer Backend

A standalone NestJS backend application for summarizing web page content using the Groq API.

## Features

- POST `/summarize` endpoint for content summarization
- CORS enabled for cross-origin requests
- Content validation (max 12000 characters)
- Environment-based configuration
- Clean architecture with DTOs, Controllers, and Services

## Prerequisites

- Node.js (v18 or higher)
- npm
- Groq API key

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The application will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

### Production Mode
```bash
npm run build
npm run start:prod
```

## API Endpoints

### POST /summarize

Summarizes the provided content using Groq AI.

**Request Body:**
```json
{
  "content": "Your web page content here..."
}
```

**Response:**
```json
{
  "summary": "Generated summary text..."
}
```

**Validation:**
- `content` is required (string)
- `content` must not exceed 12000 characters

**Example using curl:**
```bash
curl -X POST http://localhost:3000/summarize \
  -H "Content-Type: application/json" \
  -d '{"content": "Your content here..."}'
```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
└── summarize/
    ├── summarize.controller.ts  # Controller handling HTTP requests
    ├── summarize.service.ts     # Service with Groq API integration
    └── dto/
        └── summarize-request.dto.ts  # Data Transfer Object for validation
```

## Environment Variables

- `GROQ_API_KEY` (required): Your Groq API key
- `PORT` (optional): Server port (default: 3000)

## Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
