# HII CODERS - Frontend Application

## 🚀 Overview

HII CODERS is a modern, brutalist-inspired coding practice platform with a unique terminal aesthetic. This document outlines the complete page flow and routing structure.

## 📦 Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Ant Design** - UI components
- **Monaco Editor** - Code editor
- **React Syntax Highlighter** - Code display in solutions

## 🎨 Design Philosophy

**"Code Brutalist/Terminal"** Aesthetic:
- Monospace fonts (JetBrains Mono, Space Mono)
- Grid-based layouts with strong geometric lines
- Terminal-inspired animations (scanlines, glitch effects)
- Cyber color scheme (primary blue, secondary green, tertiary orange)
- ASCII art elements
- Bold borders and zero border-radius styling
- Command-line inspired interactions

## 🗺️ Page Flow & Routes

### 1. Landing Page (`/`)
**Purpose:** First impression and platform introduction

**Features:**
- ASCII art logo with glitch animation
- Animated grid background with scanline effect
- Hero section with CTA buttons
- Platform statistics (500+ Problems, 10K+ Users, 50K+ Solutions)
- Feature cards showcasing key capabilities
- Terminal-style boxes for visual interest

**Navigation:**
- "Start Coding" → `/problems`
- "View Dashboard" → `/dashboard`

### 2. Problems Page (`/problems`)
**Purpose:** Browse and filter available coding problems

**Features:**
- Comprehensive problem list with pagination
- Sidebar filters (difficulty, status, tags, companies)
- Problem statistics
- Search functionality
- Click any problem to navigate to solver

**Navigation:**
- Click problem → `/problem/:id`
- MainNav provides global navigation

### 3. Problem Detail Page (`/problem/:id`)
**Purpose:** Solve individual coding problems

**Features:**
- Split-pane layout (Description | Code Editor + Console)
- Multi-language support (Python, JS, TS, Java, C++, Go, Rust)
- Resizable panels for customization
- Monaco Editor with syntax highlighting
- Run and Submit buttons
- Breadcrumb navigation
- "View Solutions" button

**Navigation:**
- "Back" → `/problems`
- "View Solutions" → `/problem/:id/solutions`
- Breadcrumbs for quick navigation

### 4. Solutions Page (`/problem/:id/solutions`)
**Purpose:** View and learn from community solutions

**Features:**
- Multiple solution submissions with explanations
- Syntax-highlighted code display
- Time/Space complexity analysis
- Filter by language and sort options
- Like, discuss, and copy code features
- User avatars and engagement metrics
- "Submit Your Solution" CTA

**Navigation:**
- "Back to Problem" → `/problem/:id`
- MainNav for global navigation

### 5. Dashboard Page (`/dashboard`)
**Purpose:** Track personal progress and statistics

**Features:**
- User profile header with rank and badges
- Main statistics cards (Solved, Streak, Submissions, Acceptance Rate)
- Problem breakdown by difficulty with progress bars
- Recent activity timeline
- Achievement badges
- "Solve More Problems" CTA

**Navigation:**
- Click activity item → `/problem/:id`
- "Solve More Problems" → `/problems`
- MainNav for global navigation

## 🧭 Navigation Components

### MainNav
Global navigation header used across all pages (except Landing and Problem Detail)

**Includes:**
- Logo (clickable → `/`)
- Home, Problems, Dashboard links
- Active route highlighting
- Sticky positioning

## 📁 Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx          # Home/landing page
│   ├── ProblemsPage.tsx         # Problem list with filters
│   ├── ProblemDetailPage.tsx    # Individual problem solver
│   ├── SolutionsPage.tsx        # Community solutions
│   ├── DashboardPage.tsx        # User dashboard
│   └── ProblemSolverPage.tsx    # (Legacy - can be removed)
├── components/
│   ├── layout/
│   │   ├── MainNav/             # Global navigation
│   │   ├── AppHeader/           # (Legacy header)
│   │   ├── AppFooter/
│   │   └── SideNav/
│   ├── features/
│   │   ├── ProblemList/         # Problem table with pagination
│   │   ├── ProblemSolver/       # Code editor interface
│   │   ├── Sidebar/             # Filters and collections
│   │   └── FAB/                 # Floating action button
│   └── common/
│       ├── StatusIcon/
│       ├── DifficultyBadge/
│       ├── TopicTag/
│       └── ...
├── constants/
│   ├── problems.ts              # Mock problem data
│   ├── theme.ts                 # Color system and Ant Design theme
│   ├── companies.ts
│   └── navigation.ts
├── hooks/
│   ├── useProblems.ts           # Problem filtering and pagination
│   ├── useTimer.ts
│   └── usePersistedCode.ts
└── contexts/
    └── ProblemContext.tsx

## 🎯 User Journey Flow

```
Landing Page (/)
    ↓
    ├─→ Start Coding → Problems Page (/problems)
    │                      ↓
    │                  Click Problem → Problem Detail (/problem/:id)
    │                                      ↓
    │                                  ├─→ Solve & Submit
    │                                  └─→ View Solutions (/problem/:id/solutions)
    │                                          ↓
    │                                      Back to Problem or Submit Own
    │
    └─→ View Dashboard → Dashboard (/dashboard)
                            ↓
                        Track Progress & Activity
                            ↓
                        Click Recent Problem → Back to Problem Detail
```

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Custom Fonts Used

The application uses distinctive fonts loaded from Google Fonts:
- **JetBrains Mono** - Headlines and code elements
- **Space Mono** - Secondary text and labels
- **Fira Code** - Code editor (with ligatures)

## 🔧 Next Steps (Backend Integration)

### API Endpoints Needed:
1. **GET /api/problems** - Fetch problem list with filters
2. **GET /api/problem/:id** - Get problem details
3. **POST /api/problem/:id/submit** - Submit solution
4. **POST /api/problem/:id/run** - Run test cases
5. **GET /api/problem/:id/solutions** - Get community solutions
6. **GET /api/user/dashboard** - Get user statistics
7. **POST /api/auth/login** - User authentication
8. **POST /api/auth/register** - User registration

### Components Ready for Integration:
- `CodeEditor.tsx` - handleChange debounced function ready for autosave
- `ProblemSolver/index.tsx` - handleRun and handleSubmit ready for API calls
- `useProblems.ts` - Filter and pagination logic ready for API integration

## 🎭 Unique Design Features

1. **Glitch Text Animation** - Landing page title has a cyberpunk glitch effect
2. **Scanline Overlay** - Terminal-style scanline animation across pages
3. **Grid Background** - Animated grid that scrolls infinitely
4. **ASCII Art** - Used for branding and visual interest
5. **Zero Border Radius** - Everything uses sharp, brutalist edges
6. **Terminal Boxes** - Blinking cursor and command-line aesthetics
7. **Gradient Borders** - Striped border effects using CSS
8. **Monospace Typography** - Consistent with code/terminal theme

## 📱 Responsive Design

All pages are responsive and adapt to different screen sizes:
- Landing: Stacked cards on mobile
- Problems: Single column layout on small screens
- Problem Detail: Resizable panels
- Solutions: Card-based responsive grid
- Dashboard: Responsive grid with column reflow

## 🔒 Security Notes

- No authentication implemented yet (ready for backend integration)
- All data is currently mock data
- Environment variables should be used for API endpoints
- Consider implementing CORS policies for production

---

**Built with ❤️ for coders, by coders**
