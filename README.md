# switch-ev

An electric vehicle battery swapping management system built with modern web technologies.

## Getting Started

### Prerequisites

1. **(Important) Run the backend first**
   
   The backend can be installed and set up from: https://github.com/cometdigitalagency/switch

2. **Create environment file**
   
   Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_BACKEND_URL="http://localhost:7002"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure and Tech Stack

This project is built with a modern tech stack optimized for performance, type safety, and developer experience:

### Core Framework
- **Next.js** - React framework for production with server-side rendering and static generation
- **TypeScript** - For type safety and better development experience

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - High-quality, accessible UI components
- **React Icons** - Popular icon library for React
- **Google Fonts** - Web fonts for typography

### Forms & Validation
- **React Hook Form** - Performant, flexible forms with easy validation
- **Zod** - TypeScript-first schema validation for form data

### Data Management
- **TanStack Query** - Powerful data synchronization for React applications, handling server state management, caching, and background updates

### Project Structure
```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── services/               # API service layer
├── types/                  # TypeScript type definitions
└── context/                # React context providers
```

## Features

- Battery transaction management
- Customer information tracking
- Live tracking system
- Switch station monitoring
- Vehicle management
- User authentication and authorization
Test change
Test auto deployment again
Testing deployment with fixed SSH secrets - Thu Sep 18 16:37:37 +07 2025
Trigger deployment with Docker credentials - Thu Sep 18 17:14:21 +07 2025
