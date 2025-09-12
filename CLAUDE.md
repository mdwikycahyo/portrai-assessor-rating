# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "PortrAI Assessor" - a comprehensive assessment rating system where assessors evaluate participants using BARS (Behaviorally Anchored Rating Scales). The app uses React 19, TypeScript, and Tailwind CSS with shadcn/ui components, featuring AI-powered evidence analysis and interactive rating workflows.

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
  - `/` - Single-page assessment rating interface (hardcoded to participant ID "1")
- **Component Organization**:
  - `components/ui/` - shadcn/ui components (automatically generated)
  - `components/` - Custom application components
  - `components/assessment/` - Assessment-specific components (AssessmentSummaryCard, AISummarySection, BarsChecklistSection, OverallSummarySection)
  - `data/` - Mock data and type definitions
  - `hooks/` - Custom React hooks (useRatingCalculation)
  - `lib/` - Utility functions
  - `utils/` - Helper utilities (interaction-utils, rating-utils)

### Key Data Models
Located in `data/` directory:
- **Participant**: Assessment participants from mock-participants.ts
- **Assessment**: Complete assessment structure with competencies (mock-assessment.ts)
- **Competency**: Skills/areas being evaluated with Key Actions
- **KeyAction**: Specific actions within competencies with interactions and rating notes
- **Interaction**: User interactions (email, chat, document, chatbot, call, document-creation)
- **BARS Checklist**: Behaviorally Anchored Rating Scale items (bars-checklist.ts)
- **AI Summaries**: AI-generated evidence summaries (ai-summaries.ts)
- **AI Behavior Evidence**: AI-identified behavioral evidence with highlighted segments (ai-behavior-evidence.ts)

### Core Features & Functionality
1. **Single-Page Assessment Interface**: Comprehensive rating page for participant evaluation
2. **BARS Rating System**: Behaviorally Anchored Rating Scales with strength/meet-requirement/need-improvement levels
3. **AI Evidence Analysis**: 
   - AI-powered behavioral evidence detection
   - Segment highlighting in interactions
   - Automated evidence-to-behavior mapping
   - AI-generated summaries by rating category
4. **Interactive Evidence Panel**: Side panel for viewing detailed interaction data with AI highlights
5. **Dynamic Rating Calculation**: Real-time rating calculation using custom hook (useRatingCalculation)
6. **Assessor Notes & Rationale**: Text areas for assessor commentary and justification
7. **Evidence Navigation**: "Lihat Bukti" (View Evidence) buttons linking behaviors to supporting interactions

### State Management
- Uses React's built-in state management (useState, useEffect, useMemo)
- Complex state for BARS selections: `{ [keyActionId: string]: { [interactionId: string]: { [behaviorId: string]: boolean } } }`
- AI highlights state for evidence visualization
- No external state management library
- Custom hook `useRatingCalculation` for rating logic

### Styling & UI
- **Tailwind CSS**: Primary styling framework with custom configuration
- **shadcn/ui**: Component library for consistent UI elements  
- **Radix UI**: Headless components underlying shadcn/ui
- **Design System**: Uses CSS custom properties for theming
- **Color Safelist**: Tailwind config includes safelist for dynamic bg/text/border colors (red/green/yellow/blue variants)
- **Custom Sidebar**: Fixed-position assessor sidebar with logo

### Key Components Architecture
- **AssessorSidebar**: Fixed navigation sidebar with logo
- **AssessorHeader**: Main header component
- **InteractionDetailPanel**: Complex side panel for evidence viewing with AI highlighting
- **Assessment Components**: Modular assessment sections (AssessmentSummaryCard, AISummarySection, BarsChecklistSection, OverallSummarySection)
- **ContextModal**: Modal for evidence viewing (currently unused in main interface)

### Configuration Notes
- **Build Configuration**: Ignores ESLint and TypeScript errors during builds (development setup)
- **Images**: Unoptimized images enabled
- **Path Aliases**: Uses `@/*` for imports mapped to root directory
- **TypeScript**: Strict mode enabled with modern ES features

### Development Patterns
- Components use "use client" directive for client-side functionality
- Extensive use of React hooks (useState, useEffect, useMemo)
- Mock data provides realistic development environment
- Responsive design with split-pane layout (2/3 main, 1/3 detail panel)
- Icon usage via Lucide React library
- Complex nested state management for BARS selections
- AI evidence integration with behavioral mapping

### File Naming Conventions
- Components: PascalCase (e.g., `AssessorSidebar`, `InteractionDetailPanel`)
- Pages: lowercase with extensions (e.g., `page.tsx`)
- Data files: kebab-case with descriptive names (e.g., `ai-behavior-evidence.ts`)
- Hooks: camelCase with "use" prefix (e.g., `useRatingCalculation.ts`)