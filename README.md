# College Discovery App

A modern college discovery platform built with Next.js that helps students explore colleges, compare institutions, and view detailed academic and campus information in one place.

## Overview

This application provides a clean and user-friendly experience for browsing colleges, filtering options, comparing institutions side by side, and viewing detailed insights about each university.

The project is designed to act as a student-facing discovery dashboard with dynamic listings, a comparison workflow, and structured API routes for college data.

## Features

- College listing page with searchable and browsable content
- Detailed college profile pages
- Side-by-side comparison of multiple colleges
- Modern responsive UI with reusable components
- API routes for fetching college records
- Built with Next.js App Router
- Clean styling with Tailwind CSS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- SWR
- Lucide React

## Project Structure

```text
college-discovery-app/
├── public/                 # Static assets
├── src/
│   ├── app/                # App Router pages and routes
│   │   ├── api/            # API endpoints
│   │   ├── colleges/       # College detail pages
│   │   ├── compare/        # Comparison page
│   │   ├── login/          # Login page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utility helpers
│   ├── types/              # Type definitions
│   └── middleware.ts       # Request middleware
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Main Routes

- `/` — home page with the college listing
- `/compare` — compare colleges side by side
- `/login` — login screen
- `/colleges/[id]` — detailed college information page
- `/api/colleges` — college data API
- `/api/colleges/[id]` — single college data API

## Prerequisites

Before running the project, make sure you have installed:

- Node.js 18 or later
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Pradumnsaindane/College-Dhekho.git
cd college-discovery-app
```

2. Install dependencies:

```bash
npm install
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production Build

To build the app for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Linting

```bash
npm run lint
```

## Notes

This project currently uses mock or structured college data through its API layer and is well-suited for extension with real backend data, authentication, filters, and search features.

## Future Enhancements

- Add real database integration
- Add advanced filters and search
- Connect login flow to authentication backend
- Add favorites and saved colleges
- Add admission statistics and comparison charts

## Contributing

Contributions are welcome. If you'd like to improve the app:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Contact

For questions or collaboration, reach out through the repository owner or project maintainer on GitHub.
