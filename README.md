# AI-Page-Summarizer

A Chrome extension that summarizes web pages using AI, powered by a NestJS backend.  
Fully functional with free AI API (Groq free tier) and almost zero cost for personal development.

---

## Features

- Extract visible text from any webpage via content script
- Send text to backend AI API for summarization
- Display summarized content in a clean popup
- Lightweight and fast
- Free to develop and test using Groq API
- Modular architecture: frontend Chrome extension + backend NestJS

---

## Getting Started (Development)

### 1️⃣ Backend Setup

1. Navigate to the backend folder:

```bash
npm install

Create .env file (copy from .env.example):
GROQ_API_KEY=your_free_api_key_here

Start backend server:
npm run start:dev
