# PMP Experience Generator - Frontend

Modern Next.js frontend for the PMP Application Experience Generator.

## Features

- Clean, professional interface with dark theme
- Comprehensive form for all PMP application fields
- Real-time AI generation of PMI-compliant summaries
- Copy and download generated content
- Fully responsive design
- Built with Next.js 15, TypeScript, and Tailwind CSS

## Setup

### Prerequisites

- Node.js 18+ installed
- Backend API running (see backend README)

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env.local` file based on `.env.example`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Update the API URL in `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001
\`\`\`

### Running Locally

Development mode:
\`\`\`bash
npm run dev
\`\`\`

Build for production:
\`\`\`bash
npm run build
npm start
\`\`\`

The app will be available at `http://localhost:3000`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Environment Variables**: Add `NEXT_PUBLIC_API_URL` with your Render backend URL
6. Deploy!

### Option 2: Deploy via Vercel CLI

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Environment Variables for Production

After deploying the backend to Render, update your Vercel environment variable:

\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
\`\`\`

## Project Structure

\`\`\`
frontend/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and theme
├── components/
│   ├── experience-form.tsx # Main form component
│   ├── generated-output.tsx # Output display
│   ├── header.tsx          # Header component
│   └── ui/                 # UI components
└── lib/
    └── utils.ts            # Utility functions
\`\`\`

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Lucide icons

## Features

### Form Sections

1. **Project Information**: Basic project details, dates, and role
2. **Process Groups**: All five PMI process groups (Initiating, Planning, Executing, Monitoring & Controlling, Closing)

### Generated Output

- Professional formatting
- Copy to clipboard
- Download as text file
- All project metadata included
