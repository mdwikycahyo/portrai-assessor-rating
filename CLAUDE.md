# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "PortrAI Assessor" - a mockup for an assessment rating system where assessors can evaluate participants. The app uses React 19, TypeScript, and Tailwind CSS with shadcn/ui components.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linting

### Package Manager
This project uses `pnpm` as the package manager (evidenced by `pnpm-lock.yaml`).

## Architecture & Key Concepts

### Application Structure
- **App Router**: Uses Next.js 15 App Router pattern with `app/` directory
- **Route Structure**:
  - `/` - Main dashboard (participant listing)
  - `/rating/[id]` - Rating page for specific participants
- **Component Organization**:
  - `components/ui/` - shadcn/ui components (automatically generated)
  - `components/` - Custom application components
  - `data/` - Mock data and type definitions
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `styles/` - Global styles

### Key Data Models
Located in `data/` directory:
- **Participant**: Assessment participants with status tracking
- **Assessment**: Complete assessment structure with competencies
- **Competency**: Skills/areas being evaluated  
- **KeyAction**: Specific actions within competencies
- **Interaction**: User interactions (email, chat, documents, calls, etc.)

### State Management
- Uses React's built-in state management (useState, useMemo)
- No external state management library
- Mock data simulates real application behavior

### Styling & UI
- **Tailwind CSS**: Primary styling framework with custom configuration
- **shadcn/ui**: Component library for consistent UI elements
- **Radix UI**: Headless components underlying shadcn/ui
- **Design System**: Uses CSS custom properties for theming
- **Color Safelist**: Tailwind config includes safelist for dynamic bg/text/border colors

### Key Features
1. **Participant Dashboard**: Filtering, searching, and pagination of participants
2. **Rating System**: BARS (Behaviorally Anchored Rating Scales) based assessment
3. **AI Integration**: Simulated AI-generated summaries and insights
4. **Interaction Analysis**: Various interaction types (email, chat, documents, calls)
5. **Evidence Collection**: Context modal for viewing detailed interactions

### Configuration Notes
- **Build Configuration**: Ignores ESLint and TypeScript errors during builds (development setup)
- **Images**: Unoptimized images enabled
- **Path Aliases**: Uses `@/*` for imports mapped to root directory
- **TypeScript**: Strict mode enabled with modern ES features

### Development Patterns
- Components use "use client" directive for client-side functionality
- Extensive use of React hooks (useState, useEffect, useMemo)
- Mock data provides realistic development environment
- Responsive design with mobile considerations
- Icon usage via Lucide React library

### File Naming Conventions
- Components: PascalCase (e.g., `AssessorSidebar`)
- Pages: lowercase with extensions (e.g., `page.tsx`)
- Data files: kebab-case with descriptive names (e.g., `mock-participants.ts`)