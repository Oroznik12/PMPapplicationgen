# PMP Experience Generator - Backend API

Backend API for the PMP Application Experience Generator. Built with Node.js and Express.

## Features

- RESTful API for generating PMI-compliant experience summaries
- AI-powered content generation using OpenAI
- Input validation with Zod
- CORS enabled for frontend communication
- Environment-based configuration

## Setup

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env` file based on `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Add your OpenAI API key to `.env`:
\`\`\`
OPENAI_API_KEY=your_actual_api_key_here
PORT=3001
ALLOWED_ORIGINS=http://localhost:3000
\`\`\`

### Running Locally

Development mode (with auto-reload):
\`\`\`bash
npm run dev
\`\`\`

Production mode:
\`\`\`bash
npm start
\`\`\`

The API will be available at `http://localhost:3001`

## API Endpoints

### Health Check
\`\`\`
GET /health
\`\`\`

Returns the API status.

### Generate Experience
\`\`\`
POST /api/generate
\`\`\`

Generates a PMI-compliant experience summary.

**Request Body:**
\`\`\`json
{
  "projectTitle": "string",
  "organizationName": "string",
  "startDate": "string",
  "endDate": "string",
  "totalHours": "string",
  "role": "string",
  "projectDescription": "string",
  "deliverables": "string",
  "challenges": "string",
  "initiating": "string",
  "planning": "string",
  "executing": "string",
  "monitoringControlling": "string",
  "closing": "string"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "projectTitle": "string",
    "organizationName": "string",
    "role": "string",
    "startDate": "string",
    "endDate": "string",
    "totalHours": "string",
    "generatedExperience": "string"
  }
}
\`\`\`

## Deployment to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `OPENAI_API_KEY` and `ALLOWED_ORIGINS`
5. Deploy!

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Port number (default: 3001)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed frontend origins for CORS

## Tech Stack

- Node.js
- Express.js
- Vercel AI SDK
- OpenAI GPT-4
- Zod (validation)
- CORS
