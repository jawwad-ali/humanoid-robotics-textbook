# Claude Code Reference - Humanoid Robotics Textbook Project

## Project Overview

This is a Physical AI and Humanoid Robotics educational textbook platform built with Docusaurus and FastAPI. The project features an interactive textbook with AI-powered chat assistance using RAG (Retrieval Augmented Generation) with Qdrant vector database and Google's Gemini model via OpenAI Agents SDK. It includes a text selection feature that allows users to highlight passages and ask contextual questions. The entire system is deployed on Vercel with both the Next.js main app and the Python FastAPI backend running as serverless functions.

## Technology Stack

### Frontend
- **Docusaurus**: 3.9.2 (documentation site generator)
- **React**: 18.2.0
- **TypeScript**: ~5.6.2
- **Next.js**: 13.4.4 (main landing page at `/app`)
- **Tailwind CSS**: For styling
- **Vercel Analytics**: Integrated

### Backend
- **Python**: 3.14
- **FastAPI**: Web framework for API
- **Uvicorn**: ASGI server
- **OpenAI Agents SDK**: 0.6.1 (for AI interactions)
- **Google Generative AI**: Integration with Gemini models
- **Qdrant Client**: Vector database for RAG
- **Pydantic**: Data validation

### Deployment
- **Vercel**: Hosting and serverless functions
- **Qdrant Cloud**: Hosted vector database

## Directory Structure

```
humanoid-robotics-textbook/
├── api/                           # FastAPI backend
│   ├── index.py                   # Main API entry point with endpoints
│   └── __pycache__/
├── utils/                         # Backend utilities
│   ├── config.py                  # Qdrant and settings configuration
│   ├── models.py                  # Pydantic models (ChatRequest, AskSelectionRequest, etc.)
│   └── helpers.py                 # Helper functions (embed_text, build_rag_prompt, etc.)
├── textbook/                      # Docusaurus site
│   ├── docs/                      # Markdown documentation files
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── ChatBot.tsx        # Main chatbot component
│   │   │   ├── AskAIModal.tsx     # Modal for ask-on-selection feature
│   │   │   └── TextSelectionButton.tsx  # Button that appears on text selection
│   │   ├── hooks/                 # Custom React hooks
│   │   │   └── useTextSelection.ts  # Hook for detecting text selection
│   │   ├── services/              # API client services
│   │   │   ├── chatApi.ts         # Chat API client
│   │   │   └── askSelectionApi.ts # Ask selection API client
│   │   ├── theme/                 # Theme customization
│   │   │   └── Root/
│   │   │       └── index.tsx      # Root wrapper (integrates chat + selection features)
│   │   └── css/
│   ├── docusaurus.config.ts       # Docusaurus configuration
│   └── package.json
├── app/                           # Next.js main landing page
├── specs/                         # Feature specifications
│   └── 001-text-selection-ai/     # Text selection feature spec
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── vercel.json                    # Vercel deployment config
├── requirements.txt               # Python dependencies
└── package.json                   # Main workspace package.json
```

## Coding Conventions

### General
- **Theme Color**: `#1cd98e` (green) - used consistently across ChatBot and text selection features
- **TypeScript**: Strict typing for all frontend components
- **Component Structure**: Functional components with hooks (no class components)

### API Endpoints
- **Dual Routing**: All endpoints must have both `/endpoint` and `/api/endpoint` decorators
  ```python
  @app.post("/chat", response_model=ChatResponse)
  @app.post("/api/chat", response_model=ChatResponse)
  ```
  - Vercel does NOT strip the `/api` prefix automatically
  - This is required for both localhost and production

### Frontend
- **Environment-Aware URLs**: API clients must detect localhost vs production
  ```typescript
  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:8000';
      }
      return '/api';
    }
    return process.env.NEXT_PUBLIC_API_URL || '';
  };
  ```
- **Docusaurus Theme Swizzling**: Custom components go in `src/theme/Root/index.tsx` (not `Root.tsx`)
- **State Management**: Capture selection state before opening modals to prevent loss

### Backend
- **Pydantic Models**: Use for all request/response validation in `utils/models.py`
- **Error Handling**: Return detailed error messages with proper HTTP status codes
- **Logging**: Use Python's `logging` module, avoid emojis in print statements (Windows encoding issues)

## Key Commands

### Development

```bash
# Frontend (Docusaurus)
cd textbook
npm install          # Install dependencies
npm run start        # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run serve        # Serve production build

# Backend (FastAPI)
cd api
python -m pip install openai-agents python-dotenv fastapi uvicorn qdrant-client google-generativeai
python -m uvicorn index:app --reload --port 8000  # Start dev server

# Or from root:
cd api && python -m uvicorn index:app --reload --port 8000
```

### Testing
```bash
# Frontend compiles automatically on file changes
# Backend reloads with --reload flag

# Test API endpoints
curl http://localhost:8000/health
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d '{"query": "test"}'
```

### Deployment
```bash
# Vercel automatically deploys on git push to main branch
# Manual deployment:
vercel deploy
vercel deploy --prod
```

## Important Notes & Gotchas

### Vercel Deployment
1. **Dual Route Decorators Required**: Vercel does NOT strip `/api` prefix, so EVERY endpoint needs both:
   - `@app.post("/endpoint")` for localhost
   - `@app.post("/api/endpoint")` for production

2. **Serverless Context**: Both frontend and backend run as serverless functions
   - Qdrant client initialized lazily with `get_qdrant()` function
   - No persistent in-memory state between requests

### Text Selection Feature
3. **Selection Persistence**: Browser clears selection when clicking modals
   - Solution: Capture `selection.text` in state BEFORE opening modal
   - Implemented in `Root/index.tsx` with `capturedText` state

4. **Root Component Location**: Docusaurus uses `src/theme/Root/index.tsx`, NOT `src/theme/Root.tsx`
   - Components must be imported and rendered here to appear globally
   - This is where ChatBot and text selection features are integrated

### Windows Development
5. **Emoji Encoding**: Windows console (cp1252) can't handle emoji characters
   - Use ASCII alternatives: `[OK]` instead of `✅`
   - Affects print statements in Python code

6. **Path Handling**: Use forward slashes or escaped backslashes in paths
   - Bash commands need quoted paths: `"D:\path\to\file"`

### API Configuration
7. **Environment Variables Required** (`.env` file in `/api`):
   ```env
   GOOGLE_API_KEY=your_gemini_api_key
   MODEL_NAME=gemini-2.0-flash-exp
   QDRANT_URL=https://your-qdrant-instance.cloud.qdrant.io:6333
   QDRANT_API_KEY=your_qdrant_key
   ```

8. **OpenAI Agents SDK**: Uses Google's Gemini via OpenAI-compatible endpoint
   - Base URL: `https://generativelanguage.googleapis.com/v1beta/openai/`
   - Model specified in environment variables

### Error Handling
9. **Error Display**: Always stringify objects before displaying to users
   - Bad: `setError(err)` → shows `[object Object]`
   - Good: `setError(JSON.stringify(err, null, 2))` or `err.message`

10. **Console Logging**: Add extensive logging for debugging API calls
    - Log request body, endpoint, response status
    - Helps identify issues quickly in development

### Git Branch
- Current branch: `NT-Chatbot-Integration`
- Main branch: `main` (use for PRs)

---

Last Updated: 2025-12-02
