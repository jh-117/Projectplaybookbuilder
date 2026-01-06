# Project Playbook Builder - Complete Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [User Workflow](#user-workflow)
4. [Features & Functions](#features--functions)
5. [Database Schema](#database-schema)
6. [API & Edge Functions](#api--edge-functions)
7. [Component Structure](#component-structure)
8. [State Management](#state-management)
9. [Test Cases](#test-cases)
10. [Setup & Installation](#setup--installation)

---

## Application Overview

**Project Playbook Builder** is a web-based application designed to capture, standardize, and manage "lessons learned" from projects across various industries. The application uses AI to help organizations convert incidents and project experiences into actionable playbooks that can be shared and reused.

### Purpose
- Capture critical project incidents and lessons learned
- Generate standardized, AI-enhanced playbook entries
- Build a knowledge library across multiple industries
- Prevent recurring mistakes through systematic documentation

### Key Value Propositions
- Converts hindsight into foresight
- Standardizes organizational knowledge
- AI-powered analysis and recommendations
- Industry-specific categorization
- Cross-team knowledge sharing

---

## Architecture & Technology Stack

### Frontend Technologies
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5 with SWC compiler
- **Styling**: Tailwind CSS 4.1.18 with custom design system
- **UI Components**: Radix UI component library (comprehensive set)
  - Accordion, Alert Dialog, Avatar, Badge, Button, Card, Checkbox
  - Command, Context Menu, Dialog, Dropdown Menu, Form, Input
  - Label, Menubar, Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Sheet, Sidebar, Slider, Switch
  - Table, Tabs, Textarea, Tooltip, and more
- **State Management**: React Hooks (useState, useEffect, custom useStore hook)
- **Routing**: Client-side navigation using view state management (no react-router)
- **Icons**: Lucide React (comprehensive icon set)
- **Notifications**: Sonner (toast notifications)
- **PDF Generation**: Browser print API (html2canvas + jspdf packages available)
- **Utilities**:
  - class-variance-authority (CVA) for component variants
  - clsx & tailwind-merge for conditional classes
  - react-hook-form for form handling
  - recharts for potential data visualization

### Backend Technologies
- **Database**: Supabase (PostgreSQL)
- **Edge Functions**: Supabase Edge Functions (Deno runtime)
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Authentication**: No authentication (public access)

### Development Tools
- **Package Manager**: npm
- **Language**: TypeScript
- **Compiler**: SWC (via Vite plugin)

---

## User Workflow

### 1. Landing Page Flow
```
User Arrives → Quick Guide (first-time) → Selects Industry → Enters Dashboard
                     ↓                           ↓
              Privacy Policy (optional)    Quick Guide (auto-shows)
```

**Industry Selection**:
- 18 industry options available (IT, Finance, Healthcare, etc.)
- Each industry has unique icons and color gradients
- Selection persists in localStorage
- Background music player available
- Help button available for accessing Quick Start Guide anytime

### 2. Dashboard Flow
```
Dashboard → View Recent Entries
         → Search Playbooks
         → View Recommendations
         → Create New Entry
         → Navigate to Library/My Entries
```

**Dashboard Features**:
- Hero section with search functionality
- Recommended playbooks based on industry (or all playbooks if "General" selected)
- Recent activity sidebar (last 5 entries)
- Pro tips and statistics
- Quick access to all sections

**Industry Recommendation Logic**:
- If "General" industry is selected: Shows all published entries (mixed industries)
- If specific industry is selected: Shows entries matching that industry
- Fallback: If no matches for specific industry, shows all entries
- Limit: Maximum 6 recommended entries displayed

### 3. Entry Creation Flow
```
New Entry → Fill Form → Generate with AI → Preview → Save
                           ↓
                    Validation Checks
                           ↓
                    AI Processing
                           ↓
                    Structured Output
```

**Form Fields**:
- **Required**: Project Name, Summary
- **Optional**: Root Cause, Impact, Custom Category
- **AI Generated**: Recommendations, Do/Don't Lists, Prevention Checklist

### 4. Entry Management Flow
```
View Entry → Edit Content → Change Status → Publish/Unpublish
          → Export to PDF
          → Delete
```

### 5. Library & Search Flow
```
Library → Apply Filters → View Results → Select Entry → View Details
       → Search by Keyword
       → Filter by Industry
       → Filter by Category
```

---

## Features & Functions

### Core Features

#### 1. Industry Selection
- **Location**: Landing page and navigation bar
- **Function**: Allows users to select their industry context
- **Industries Supported** (19 total):
  - **General** - Cross-industry recommendations, shows all playbooks
  - IT & Technology - Blue/cyan gradient, Server icon
  - Finance & Banking - Emerald/teal gradient, Landmark icon
  - HR & Recruitment - Orange/amber gradient, Briefcase icon
  - Operations & Logistics - Slate/gray gradient, Building icon
  - Healthcare - Red/pink gradient, Stethoscope icon
  - Construction - Yellow/orange gradient, Hard Hat icon
  - Marketing - Rose/pink gradient, Megaphone icon
  - Education - Sky/blue gradient, Graduation Cap icon
  - Retail & E-commerce - Violet/purple gradient, Shopping Cart icon
  - Manufacturing - Zinc/slate gradient, Factory icon
  - Legal & Compliance - Amber/yellow gradient, Scale icon
  - Sales - Green/emerald gradient, Trending Up icon
  - Customer Service - Cyan/teal gradient, Headphones icon
  - Product Management - Fuchsia/pink gradient, Package icon
  - Real Estate - Lime/green gradient, Home icon
  - Hospitality & Tourism - Blue/cyan gradient, Plane icon
  - Media & Entertainment - Red/orange gradient, Film icon
  - Government & Public Sector - Stone/gray gradient, Flag icon

**Industry Dropdown Styling**:
- Solid white background for readability (not transparent)
- Applied to both desktop header and mobile menu
- Hover state changes to light gray (bg-gray-50)
- Focus state includes indigo ring for accessibility

#### 2. AI-Powered Playbook Generation
- **Technology**: OpenAI GPT-4o-mini
- **Input**: Title, Summary, Category, Optional (Root Cause, Impact)
- **Output**:
  - Root cause analysis (if not provided)
  - Impact assessment (if not provided)
  - Strategic recommendations
  - Do list (4-6 actionable items)
  - Don't list (4-6 anti-patterns)
  - Prevention checklist (4-6 proactive measures)

**Validation Process**:
1. Frontend validation (title min 3 chars, summary min 20 chars)
2. AI validation (checks for meaningful content)
3. Content generation with industry context
4. Structured JSON output

#### 3. Dashboard
- **Search**: Real-time search across titles, summaries, and tags
- **Recent Activity**: Last 5 entries created/updated
- **Recommendations**: Industry-specific suggested playbooks
- **Statistics**: Visual progress indicators
- **Quick Actions**: Create new entry button

#### 4. Entry Form
- **Dynamic Categories**: Predefined + custom category support
- **Real-time Character Count**: For summary field
- **Loading States**: Animated AI processing indicator
- **Preview Mode**: Review before saving
- **Error Handling**: User-friendly error dialogs

#### 5. Playbook Card (View/Edit)
- **Status Management**: Draft → Needs Edit → Approved
- **Inline Editing**: Edit all fields directly
- **Publishing**: Toggle between private and library-published
- **Export to PDF**: Print-to-PDF functionality
- **Copy to Clipboard**: Share playbook content
- **Responsive Design**: Mobile and desktop optimized

#### 6. Library
- **Multi-Filter System**:
  - Search by keyword
  - Filter by industry
  - Filter by category
  - Custom industry/category input
- **Published Entries Only**: Shows only public entries
- **Clear Filters**: Reset all filters at once
- **Grid Layout**: Responsive card grid

#### 7. My Entries
- **Status Filtering**: All, Draft, Needs Edit, Approved
- **Quick Actions**: View/Edit, Delete
- **Delete Confirmation**: AlertDialog prevents accidental deletion
- **Status Indicators**: Visual badges for each status

#### 8. Privacy Policy
- **Accessible From**: Landing page footer and app layout
- **Navigation**: Maintains previous view for return
- **Content**: Privacy information and policies

#### 9. Background Music
- **Location**: Landing page
- **Control**: Mute/unmute toggle
- **Audio**: Custom playbook theme music
- **Persistence**: Music state not persisted

#### 10. Quick Start Guide
- **First-Time Experience**: Automatically shows for new users after selecting industry
- **Trigger**: Shows 800ms after industry selection (first-time only)
- **Accessibility**: Help button in header (both desktop and mobile)
- **Content**:
  - Step-by-step walkthrough (4 main steps)
  - Industry selection guidance
  - Entry creation process
  - AI generation explanation
  - Key features overview
  - Pro tips and best practices
- **Persistence**: Once viewed, doesn't show automatically (stored in localStorage)
- **Manual Access**: Click "Help" button in navigation anytime
- **Design**: Modal dialog with visual step indicators and color-coded sections
- **Mobile Friendly**: Responsive design with scrollable content

---

## Database Schema

### Table: `playbook_entries`

```sql
CREATE TABLE playbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  industry text NOT NULL,
  status text NOT NULL DEFAULT 'Draft',
  date_created bigint NOT NULL,
  last_updated bigint NOT NULL,
  summary text NOT NULL,
  root_cause text DEFAULT '',
  impact text DEFAULT '',
  category text NOT NULL,
  recommendation text DEFAULT '',
  do_list jsonb DEFAULT '[]'::jsonb,
  dont_list jsonb DEFAULT '[]'::jsonb,
  prevention_checklist jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

### Indexes
- `idx_playbook_entries_published` - on `is_published` column
- `idx_playbook_entries_industry` - on `industry` column
- `idx_playbook_entries_category` - on `category` column

### Row Level Security (RLS)

**Policies**:
1. **Read**: Anyone can read entries (published or all)
2. **Insert**: Anyone can create entries
3. **Update**: Anyone can update entries
4. **Delete**: Anyone can delete entries

**Note**: Current RLS policies allow public access without authentication. This is intentional for the current implementation but should be reviewed for production use with sensitive data.

### Data Transformation

**TypeScript to Database**:
- `dateCreated` → `date_created` (bigint timestamp)
- `lastUpdated` → `last_updated` (bigint timestamp)
- `rootCause` → `root_cause` (text)
- `doList` → `do_list` (jsonb array)
- `dontList` → `dont_list` (jsonb array)
- `preventionChecklist` → `prevention_checklist` (jsonb array)
- `isPublished` → `is_published` (boolean)

---

## API & Edge Functions

### Edge Function: `generate-playbook`

**Endpoint**: `${SUPABASE_URL}/functions/v1/generate-playbook`

**Method**: POST

**Headers**:
```json
{
  "Authorization": "Bearer {ANON_KEY}",
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "title": "string (required)",
  "category": "string (required)",
  "summary": "string (required, min 20 chars)",
  "rootCause": "string (optional)",
  "impact": "string (optional)",
  "industry": "string (required)"
}
```

**Response** (Success - 200):
```json
{
  "rootCause": "string",
  "impact": "string",
  "recommendation": "string",
  "doList": ["string", ...],
  "dontList": ["string", ...],
  "preventionChecklist": ["string", ...]
}
```

**Response** (Error - 400/500):
```json
{
  "error": "string"
}
```

### AI Processing Pipeline

1. **Input Validation**:
   - Check required fields
   - Validate minimum lengths
   - Check for OpenAI API key

2. **Content Validation** (First AI Call):
   - Model: GPT-4o-mini
   - Temperature: 0.3
   - Purpose: Validate if input is meaningful
   - Output: `{ isValid: boolean, reason: string }`

3. **Playbook Generation** (Second AI Call):
   - Model: GPT-4o-mini
   - Temperature: 0.7
   - Purpose: Generate structured playbook content
   - Context: Industry-specific, category-aware
   - Output: Structured JSON with all playbook fields

### CORS Configuration
```javascript
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey"
}
```

---

## Design System

### Color Palette

**Primary Colors**:
- Indigo: Main brand color (indigo-600, indigo-700, indigo-500)
- Violet: Accent color (violet-600)
- Gray: Neutral tones (gray-50 to gray-900)

**Industry-Specific Gradients**:
Each industry has a unique gradient applied on hover states and visual elements.

**Status Colors**:
- Draft: Gray (slate-500)
- Needs Review: Orange (orange-500)
- Human Approved: Green (emerald-500)

**Semantic Colors**:
- Success: Green (emerald-500, green-500)
- Warning: Yellow/Orange (amber-500, orange-500)
- Error: Red (red-500)
- Info: Blue (sky-500)

### Typography

**Font Family**: System font stack (sans-serif)
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...
```

**Font Sizes**:
- Display: 5xl-7xl (48px-72px) for hero headings
- Heading 1: 3xl-4xl (30px-36px) for main headings
- Heading 2: 2xl-3xl (24px-30px) for section headings
- Heading 3: xl-2xl (20px-24px) for subsections
- Body: base-lg (16px-18px) for main content
- Small: sm-xs (14px-12px) for captions and labels

**Font Weights**:
- Extrabold (800): Hero headings
- Bold (700): Section headings, buttons
- Semibold (600): Subheadings, labels
- Medium (500): Navigation, tabs
- Regular (400): Body text

### Spacing System

Based on Tailwind's default spacing scale (4px increments):
- Base unit: 4px (space-1)
- Common spacings: 8px, 12px, 16px, 24px, 32px, 48px
- Component padding: p-4 to p-8 (16px-32px)
- Section margins: gap-4 to gap-12 (16px-48px)

### Border Radius

- Small: rounded-lg (8px) - buttons, inputs
- Medium: rounded-xl (12px) - cards
- Large: rounded-2xl (16px) - feature cards
- Circle: rounded-full - avatars, badges, pills

### Shadows

- Small: shadow-sm - subtle elevation
- Medium: shadow-md - cards
- Large: shadow-xl - modals, dropdowns
- Colored: shadow-indigo-500/20 - brand elements

### Animations & Transitions

**Built-in Transitions**:
- Duration: 200-300ms (standard)
- Easing: ease-in-out (default)
- Properties: colors, transform, opacity, shadow

**Custom Animations**:
- `animate-in` - Fade and slide in elements
- `fade-in` - Opacity transition
- `slide-in-from-bottom` - Upward entrance
- Duration delays: 100ms, 200ms, 300ms for staggered animations

**Hover Effects**:
- Scale: hover:scale-105, hover:scale-110
- Shadow: hover:shadow-xl
- Translate: hover:-translate-y-0.5
- Background: hover:bg-{color}

### Responsive Breakpoints

- **sm**: 640px and up (small tablets)
- **md**: 768px and up (tablets)
- **lg**: 1024px and up (small desktops)
- **xl**: 1280px and up (large desktops)
- **2xl**: 1536px and up (extra large screens)

**Mobile-First Approach**: Base styles target mobile, with progressively enhanced layouts for larger screens.

### Accessibility Features

- Focus rings: focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
- Screen reader text: sr-only class for hidden labels
- ARIA labels: Implemented on interactive elements
- Keyboard navigation: Full support for tab navigation
- Color contrast: WCAG AA compliant (checked for readability)
- Semantic HTML: Proper heading hierarchy, landmarks

---

## Component Structure

### Component Hierarchy
```
App
├── QuickGuide (Modal)
├── IndustryLanding
│   ├── Help Button
│   ├── BackgroundMusic
│   └── Footer
├── Layout
│   ├── Header
│   │   ├── Help Button
│   │   └── Privacy Button
│   └── Navigation
├── Dashboard
│   ├── Hero Section
│   ├── Search Bar
│   ├── Recommendations Grid
│   └── Recent Activity Sidebar
├── EntryForm
│   ├── Form Fields
│   ├── Loading State
│   ├── Preview Mode
│   └── PlaybookCard (Preview)
├── PlaybookCard
│   ├── Status Selector
│   ├── Edit Mode
│   ├── Export Button
│   └── Share Button
├── Library
│   ├── Search & Filters
│   └── Entry Grid
├── MyEntries
│   ├── Status Tabs
│   └── Entry List
└── PrivacyPolicy
```

### Key Components

#### App.tsx
- **Purpose**: Root component, manages routing and global state
- **State**: currentView, selectedEntry, previousView
- **Views**: landing, dashboard, new, library, my-entries, view-entry, privacy-policy

#### IndustryLanding.tsx
- **Purpose**: Landing page with industry selection
- **Props**:
  - `onSelect: (industry: Industry) => void` - Callback when industry selected
  - `onPrivacyPolicyClick: () => void` - Opens privacy policy
  - `onHelpClick?: () => void` - Opens quick guide (optional)
- **Features**:
  - Industry cards with unique icons and gradients
  - Background music player with mute toggle
  - Animated background blur effects
  - Help button for quick guide access
  - 2-column (mobile) to 4-column (desktop) responsive grid
  - Hover effects with scale and shadow transitions
  - Gradient overlays on hover
- **State**: None (stateless component)
- **Assets**:
  - Logo: src/assets/kadoshAI.png
  - Music: src/assets/playbook-theme.mp3

#### Dashboard.tsx
- **Purpose**: Main hub after industry selection
- **Props**:
  - `industry: Industry` - Current selected industry
  - `entries: PlaybookEntry[]` - All user entries
  - `onViewEntry: (entry: PlaybookEntry) => void` - View entry callback
  - `onNewEntry: () => void` - Navigate to new entry form
- **State**:
  - `searchTerm: string` - Real-time search query
- **Features**:
  - Hero section with gradient background
  - Real-time search with dropdown results
  - Industry-specific recommendations (6 max)
  - Recent activity sidebar (5 most recent entries)
  - Pro tips section with icons
  - Statistics display (entries created, approved count)
  - Quick action button for creating entries
- **Search Logic**:
  - Searches across: title, summary, tags
  - Case-insensitive matching
  - Shows results only when search term length > 0
  - Combines user entries and library entries
- **Mock Data**: Includes 5 pre-populated library entries for demo

#### EntryForm.tsx
- **Purpose**: Create new playbook entries
- **Props**: industry, onSave, onCancel
- **State**: formData, generatedEntry, loading, showPreview
- **API Integration**: Calls generate-playbook edge function

#### PlaybookCard.tsx
- **Purpose**: Display and edit playbook entries
- **Props**: entry, onStatusChange, onSave, onPublishToggle, readOnly
- **Features**: Inline editing, status management, PDF export, copy

#### Library.tsx
- **Purpose**: Browse all published entries
- **Props**: entries, currentIndustry, onViewEntry
- **Features**: Multi-filter system, search, grid layout

#### MyEntries.tsx
- **Purpose**: Manage user's created entries
- **Props**: entries, onViewEntry, onDeleteEntry
- **Features**: Status filtering, delete with confirmation

#### Layout.tsx
- **Purpose**: Wrapper providing navigation and header
- **Props**:
  - `children: React.ReactNode` - Page content
  - `currentIndustry: Industry` - Selected industry
  - `onIndustryChange: (industry: Industry) => void` - Industry change handler
  - `currentView: 'dashboard' | 'new' | 'library' | 'my-entries'` - Active view
  - `onNavigate: (view) => void` - Navigation handler
  - `onPrivacyPolicyClick: () => void` - Privacy policy handler
  - `onHelpClick: () => void` - Quick guide handler
- **State**:
  - `isMobileMenuOpen: boolean` - Mobile menu sheet state
- **Features**:
  - Sticky header with backdrop blur
  - Desktop navigation tabs (Dashboard, Library, My Entries)
  - Mobile navigation via Sheet component
  - Industry selector dropdown (desktop and mobile)
  - Help and Privacy buttons (desktop only in header, both in mobile menu)
  - "New Entry" button with icon
  - Background pattern overlay
  - Responsive breakpoints (md:, lg:)
- **Styling**:
  - Header: White background with 80% opacity + backdrop blur
  - Active nav item: Indigo background with ring border
  - Industry dropdown: Solid white background (not transparent)
  - Mobile menu: Slide-in sheet from right side

#### QuickGuide.tsx
- **Purpose**: Interactive tutorial modal for first-time users
- **Props**: open (boolean), onClose (function)
- **Features**:
  - 4-step walkthrough with visual indicators
  - Color-coded sections for each step
  - Key features overview with icons
  - Pro tips section
  - Responsive design with scrollable content
  - First-time auto-display with localStorage tracking

---

## Data Flow & Architecture

### Application State Flow

```
User Action → Component Event → State Update → Database Sync → UI Re-render
```

**Example: Creating a New Entry**
```
1. User fills form in EntryForm component
2. User clicks "Generate with AI"
3. Frontend validates input (title, summary length)
4. API call to generate-playbook edge function
5. Edge function validates content with AI
6. Edge function generates playbook with AI
7. Response returns to frontend
8. User reviews preview
9. User clicks "Save to Library"
10. createEntry() called from useStore
11. Entry inserted into Supabase database
12. Local state updated with new entry
13. Navigation to entry view
14. Success toast displayed
```

**Example: Editing an Entry**
```
1. User clicks edit icon on PlaybookCard
2. Card enters edit mode (inline editing)
3. User modifies fields
4. User clicks save icon
5. updateEntry() called from useStore
6. Database updated via Supabase
7. Local state updated
8. Card exits edit mode
9. Success toast displayed
```

### Data Synchronization

**On Application Mount**:
1. Check localStorage for selected industry
2. Fetch all entries from database via `getAllEntries()`
3. Update local state with entries
4. Set loading state to false

**On Entry Creation**:
1. Insert to database
2. Database returns created entry with ID
3. Add to local state array
4. Update relevant views

**On Entry Update**:
1. Update in database by ID
2. Update local state by ID
3. Preserve other entries unchanged

**On Entry Delete**:
1. Delete from database by ID
2. Remove from local state array
3. Navigate to previous view if currently viewing deleted entry

### Local Storage Usage

**Key**: `pp_selected_industry`
- **Type**: string (Industry type)
- **Purpose**: Persist industry selection across sessions
- **Read**: On app mount
- **Write**: On industry change

**Key**: `pp_quick_guide_seen`
- **Type**: boolean (stored as "true" string)
- **Purpose**: Track if user has seen quick guide
- **Read**: On dashboard mount
- **Write**: When quick guide is closed

### Database Query Patterns

**Common Queries**:
```typescript
// Get all entries (ordered)
.select('*')
.order('last_updated', { ascending: false })

// Get published entries only
.select('*')
.eq('is_published', true)
.order('last_updated', { ascending: false })

// Update entry
.update({ ...updates, last_updated: Date.now() })
.eq('id', id)

// Delete entry
.delete()
.eq('id', id)
```

---

## State Management

### Global State (useStore Hook)

**Location**: `src/hooks/useStore.ts`

**State Variables**:
```typescript
{
  selectedIndustry: Industry | null,  // From localStorage
  entries: PlaybookEntry[],           // From database
  isLoading: boolean                  // Loading state
}
```

**Actions**:
- `setSelectedIndustry(industry)` - Updates industry and localStorage
- `addEntry(entry)` - Creates in database, updates state
- `updateEntry(id, updates)` - Updates in database, updates state
- `deleteEntry(id)` - Deletes from database, updates state
- `togglePublish(id, isPublished)` - Toggles publish status

**Persistence**:
- Industry selection: localStorage (`pp_selected_industry`)
- Quick guide seen status: localStorage (`pp_quick_guide_seen`)
- Entries: Supabase database (persisted)
- Loading on mount: Fetches all entries from database

**Store Implementation Details**:
```typescript
// Location: src/hooks/useStore.ts
export const useStore = () => {
  const [selectedIndustry, setIndustry] = useState<Industry | null>(null);
  const [entries, setEntries] = useState<PlaybookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load industry from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pp_selected_industry');
    if (saved) setIndustry(saved as Industry);
  }, []);

  // Load entries from database on mount
  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
      setIsLoading(false);
    });
  }, []);

  // Industry setter with localStorage sync
  const setSelectedIndustry = (industry: Industry) => {
    setIndustry(industry);
    localStorage.setItem('pp_selected_industry', industry);
  };

  // CRUD operations...
}
```

**State Update Patterns**:
- **Optimistic Updates**: UI updates immediately, database syncs in background
- **Error Handling**: Toast notifications on failure, state rollback if needed
- **Loading States**: Individual loading states for async operations

### Local Component State

**App-level**:
- `currentView` - Active view/route
- `selectedEntry` - Entry being viewed
- `previousView` - For navigation back

**Form-level**:
- `formData` - Form inputs
- `generatedEntry` - AI-generated content
- `loading` - API call state
- `showPreview` - Preview mode toggle

**Filter-level** (Library/MyEntries):
- `search` - Search query
- `filterIndustry` - Industry filter
- `filterCategory` - Category filter
- `filterStatus` - Status filter

---

## Test Cases

### Functional Test Cases

#### TC001: Industry Selection
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to landing page
  2. Click on any industry card
  3. Verify navigation to dashboard
  4. Verify industry persists in localStorage
- **Expected**: User navigates to dashboard, industry saved

#### TC002: Create Entry - Valid Input
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to "New Entry"
  2. Enter valid title (>3 chars)
  3. Enter valid summary (>20 chars)
  4. Select category
  5. Click "Generate Playbook with AI"
  6. Wait for AI processing
  7. Review preview
  8. Click "Save to Library"
- **Expected**: Entry created and saved to database

#### TC003: Create Entry - Invalid Title
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to "New Entry"
  2. Enter title with <3 characters
  3. Enter valid summary
  4. Click "Generate Playbook"
- **Expected**: Error dialog: "Title Too Short"

#### TC004: Create Entry - Invalid Summary
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to "New Entry"
  2. Enter valid title
  3. Enter summary with <20 characters
  4. Click "Generate Playbook"
- **Expected**: Error dialog: "Summary Too Short"

#### TC005: Create Entry - Random Characters
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to "New Entry"
  2. Enter title: "abc"
  3. Enter summary: "abcde"
  4. Click "Generate Playbook"
- **Expected**: Error dialog: "Invalid Input"

#### TC006: AI Generation - API Error
- **Status**: ⚠️ HANDLED
- **Steps**:
  1. Simulate API failure
  2. Attempt to generate playbook
- **Expected**: Error dialog with failure message
- **Note**: Graceful error handling implemented

#### TC007: Search Functionality
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to Dashboard
  2. Enter search term in search bar
  3. Verify search results dropdown
  4. Click on result
- **Expected**: Navigates to selected entry

#### TC008: Edit Entry
- **Status**: ✅ PASS
- **Steps**:
  1. View any entry
  2. Click edit icon
  3. Modify fields
  4. Click save
- **Expected**: Changes persisted to database

#### TC009: Change Status
- **Status**: ✅ PASS
- **Steps**:
  1. View any entry
  2. Click status dropdown
  3. Select new status
- **Expected**: Status updated immediately

#### TC010: Export to PDF
- **Status**: ⚠️ PARTIAL (Bug Fixed)
- **Original Bug**: Success message appeared even when print was cancelled
- **Fix Applied**: Removed automatic success message
- **Steps**:
  1. View any entry
  2. Click "Export" button
  3. Print dialog opens
  4. Cancel print dialog
- **Expected**: No success message on cancel
- **Current Status**: ✅ FIXED

#### TC011: Delete Entry
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to "My Entries"
  2. Click delete icon on entry
  3. Confirm deletion in dialog
- **Expected**: Entry deleted from database

#### TC012: Publish/Unpublish Entry
- **Status**: ✅ PASS
- **Steps**:
  1. View entry in edit mode
  2. Toggle "Publish to Library" switch
  3. Verify in Library view
- **Expected**: Entry appears/disappears from Library

#### TC013: Filter by Industry (Library)
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to Library
  2. Select industry filter
  3. Verify filtered results
- **Expected**: Only entries from selected industry shown

#### TC014: Filter by Category (Library)
- **Status**: ✅ PASS
- **Steps**:
  1. Navigate to Library
  2. Select category filter
  3. Verify filtered results
- **Expected**: Only entries from selected category shown

#### TC015: Custom Category Creation
- **Status**: ✅ PASS
- **Steps**:
  1. Create new entry
  2. Select "Other" in category dropdown
  3. Enter custom category
  4. Generate and save
- **Expected**: Entry saved with custom category

#### TC016: Privacy Policy Navigation
- **Status**: ✅ PASS
- **Steps**:
  1. Click "Privacy Policy" from landing or layout
  2. Verify privacy policy displays
  3. Click back
  4. Verify return to previous view
- **Expected**: Correct navigation flow

#### TC017: Background Music Control
- **Status**: ✅ PASS
- **Steps**:
  1. On landing page, click music toggle
  2. Verify audio plays/pauses
- **Expected**: Music toggles on/off

#### TC018: Industry Change
- **Status**: ✅ PASS
- **Steps**:
  1. From dashboard, click industry selector
  2. Select different industry
  3. Verify dashboard updates
- **Expected**: Dashboard reloads with new industry context

#### TC018a: General Industry Selection
- **Status**: ✅ PASS
- **Steps**:
  1. Select "General" from industry dropdown
  2. Verify dashboard shows mixed industry recommendations
  3. Navigate to library
  4. Verify all published entries shown (not filtered)
- **Expected**: "General" shows cross-industry content

#### TC018b: Industry Dropdown Readability
- **Status**: ✅ PASS
- **Steps**:
  1. Click industry dropdown in header
  2. Verify dropdown has solid white background
  3. Verify text is clearly readable
  4. Test on both desktop and mobile
- **Expected**: Dropdown background is opaque white, text is readable

#### TC019: Quick Guide - First-Time User
- **Status**: ✅ PASS
- **Steps**:
  1. Clear localStorage
  2. Navigate to landing page
  3. Select any industry
  4. Wait for guide to appear
- **Expected**: Quick Start Guide modal appears after 800ms

#### TC020: Quick Guide - Manual Access
- **Status**: ✅ PASS
- **Steps**:
  1. Click "Help" button in navigation
  2. Verify guide modal opens
  3. Review content
  4. Click "Got it, let's start!"
- **Expected**: Guide displays and closes correctly

#### TC021: Quick Guide - Persistence
- **Status**: ✅ PASS
- **Steps**:
  1. View quick guide and close it
  2. Navigate away and return to dashboard
  3. Verify guide doesn't auto-show again
- **Expected**: Guide only auto-shows once per user

#### TC022: Quick Guide - Mobile Access
- **Status**: ✅ PASS
- **Steps**:
  1. Open mobile menu
  2. Click "Quick Start Guide"
  3. Verify guide displays correctly on mobile
- **Expected**: Guide is responsive and readable on mobile

---

### Edge Cases & Error Handling

#### EC001: Empty Database
- **Status**: ✅ HANDLED
- **Behavior**: Shows "No entries" message with call-to-action

#### EC002: API Timeout
- **Status**: ⚠️ NOT FULLY TESTED
- **Expected**: Error message displayed
- **Note**: Timeout handling exists but not explicitly tested

#### EC003: Invalid JSON from AI
- **Status**: ✅ HANDLED
- **Behavior**: Try-catch blocks handle parsing errors

#### EC004: Network Offline
- **Status**: ⚠️ PARTIAL
- **Behavior**: Fetch errors caught and displayed
- **Note**: No offline mode or retry mechanism

#### EC005: LocalStorage Full
- **Status**: ⚠️ NOT HANDLED
- **Risk**: Industry selection may fail silently
- **Impact**: Low (small data footprint)

#### EC006: Very Long Entry Content
- **Status**: ✅ HANDLED
- **Behavior**: Text areas support scrolling, no length limits enforced

---

### Performance Test Cases

#### PT001: Initial Load Time
- **Status**: ✅ ACCEPTABLE
- **Metrics**:
  - Bundle size: ~580 KB (minified + gzipped)
  - First load: < 2 seconds on average connection

#### PT002: Database Query Performance
- **Status**: ✅ OPTIMIZED
- **Features**:
  - Indexes on published, industry, category
  - Order by last_updated with index

#### PT003: Search Performance
- **Status**: ✅ ACCEPTABLE
- **Implementation**: Client-side filtering
- **Performance**: Instant on datasets < 1000 entries

---

### Security Test Cases

#### ST001: SQL Injection
- **Status**: ✅ PROTECTED
- **Protection**: Supabase query builder (parameterized queries)

#### ST002: XSS (Cross-Site Scripting)
- **Status**: ✅ PROTECTED
- **Protection**: React automatically escapes output

#### ST003: API Key Exposure
- **Status**: ✅ SECURE
- **Implementation**:
  - OPENAI_API_KEY stored as environment variable
  - Not exposed to client
  - Used only in Edge Function

#### ST004: CORS Misconfiguration
- **Status**: ✅ CONFIGURED
- **Settings**: Allow all origins (intentional for public access)

#### ST005: Data Validation
- **Status**: ✅ IMPLEMENTED
- **Layers**:
  - Frontend validation (character limits)
  - Edge function validation (required fields)
  - AI validation (content meaningfulness)

---

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- Supabase account (for database and edge functions)
- OpenAI API key (for AI generation)

### Environment Variables

Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd project-playbook-builder
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Supabase**
   - Create Supabase project
   - Run migration file: `supabase/migrations/20251216135033_create_playbook_entries_table.sql`
   - Deploy edge function: `supabase/functions/generate-playbook/index.ts`
   - Set OPENAI_API_KEY in Supabase edge function secrets

4. **Configure Environment**
   - Copy `.env` values from Supabase project settings
   - Add OpenAI API key

5. **Run Development Server**
```bash
npm run dev
```

6. **Build for Production**
```bash
npm run build
```

### Deployment

**Supabase Edge Function Deployment**:
```bash
supabase functions deploy generate-playbook --no-verify-jwt
```

**Frontend Deployment**:
- Build: `npm run build`
- Deploy `build/` directory to hosting service (Vercel, Netlify, etc.)
- Ensure environment variables are configured on hosting platform

---

## Known Issues & Limitations

### Current Limitations

1. **No User Authentication**
   - All entries are publicly accessible
   - No user-specific content isolation
   - Anyone can edit/delete any entry

2. **No Offline Support**
   - Requires internet connection
   - No service worker or caching

3. **Client-Side Filtering**
   - Library search/filter happens on client
   - May not scale well with thousands of entries

4. **No Real-time Collaboration**
   - No live updates when multiple users editing
   - No conflict resolution

5. **Limited Export Options**
   - PDF export via print dialog only
   - No CSV, Excel, or Word export

6. **No Analytics**
   - No usage tracking
   - No entry view counts
   - No user engagement metrics

### Future Enhancements

1. **User Authentication & Authorization**
   - Supabase Auth integration
   - Role-based access control
   - Private vs. public entries

2. **Advanced Search**
   - Full-text search via PostgreSQL
   - Fuzzy matching
   - Tag-based search

3. **Collaboration Features**
   - Comments on entries
   - Version history
   - Change tracking

4. **Analytics Dashboard**
   - Entry metrics
   - User engagement
   - Popular playbooks

5. **Export Improvements**
   - Multiple export formats
   - Bulk export
   - Custom templates

6. **Mobile App**
   - Native iOS/Android apps
   - Offline mode
   - Push notifications

---

## API Reference

### Database Functions

Located in `src/lib/database.ts`:

#### `getAllEntries(): Promise<PlaybookEntry[]>`
Fetches all entries from database, ordered by last_updated.

#### `getPublishedEntries(): Promise<PlaybookEntry[]>`
Fetches only published entries.

#### `createEntry(entry: PlaybookEntry): Promise<PlaybookEntry | null>`
Creates new entry in database.

#### `updateEntry(id: string, updates: Partial<PlaybookEntry>): Promise<PlaybookEntry | null>`
Updates existing entry.

#### `deleteEntry(id: string): Promise<boolean>`
Deletes entry by ID.

#### `togglePublishEntry(id: string, isPublished: boolean): Promise<PlaybookEntry | null>`
Toggles published status of entry.

---

## Troubleshooting

### Common Issues

#### Issue: "Failed to generate playbook"
- **Cause**: OpenAI API key not configured or invalid
- **Solution**: Verify OPENAI_API_KEY in Supabase edge function secrets

#### Issue: "Cannot connect to database"
- **Cause**: Incorrect Supabase credentials
- **Solution**: Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env

#### Issue: "Build warnings about chunk size"
- **Cause**: Large bundle size from dependencies
- **Solution**: Consider code splitting (future enhancement)
- **Current**: Warning only, does not affect functionality

#### Issue: "Success message appears when print cancelled"
- **Status**: ✅ FIXED
- **Solution**: Removed automatic success message in PDF export

#### Issue: "Search not working"
- **Cause**: Check if entries exist and are loaded
- **Solution**: Verify database connection and data

---

## Mock Library Data

The application includes 5 pre-populated playbook entries for demonstration purposes:

### Mock Entry 1: Data Breach Incident Response
- **Industry**: IT & Technology
- **Category**: Risk Management
- **Status**: Human Approved
- **Summary**: Major data breach affecting customer PII due to unpatched vulnerability
- **Key Learning**: Automated patch management prevents security incidents

### Mock Entry 2: Budget Overrun
- **Industry**: Finance & Banking
- **Category**: Financial Planning
- **Status**: Human Approved
- **Summary**: Project exceeded budget by 40% due to scope creep
- **Key Learning**: Regular scope reviews and change control processes

### Mock Entry 3: Failed Product Launch
- **Industry**: Marketing
- **Category**: Strategic Planning
- **Status**: Needs Review
- **Summary**: Product launch failed due to inadequate market research
- **Key Learning**: Comprehensive market validation before launch

### Mock Entry 4: Construction Delay
- **Industry**: Construction
- **Category**: Timeline Management
- **Status**: Human Approved
- **Summary**: 6-month delay due to supply chain disruptions
- **Key Learning**: Multi-supplier sourcing and contingency planning

### Mock Entry 5: High Employee Turnover
- **Industry**: HR & Recruitment
- **Category**: Team Management
- **Status**: Human Approved
- **Summary**: 30% turnover rate traced to poor onboarding
- **Key Learning**: Structured onboarding program reduces turnover

**Location**: `src/data/mockLibrary.ts`

**Purpose**:
- Provides immediate content for new users
- Demonstrates playbook format and quality
- Shows industry variety
- Helps with UI testing and development

---

## File Structure

```
project-playbook-builder/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images, audio, media
│   │   ├── kadoshAI.png            # Logo image
│   │   └── playbook-theme.mp3      # Background music
│   ├── components/                  # React components
│   │   ├── ui/                     # Radix UI components (30+ files)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   └── ...
│   │   ├── BackgroundMusic.tsx     # Audio player component
│   │   ├── Dashboard.tsx           # Main dashboard view
│   │   ├── EntryForm.tsx           # New entry creation form
│   │   ├── IndustryLanding.tsx     # Landing page
│   │   ├── Layout.tsx              # App layout wrapper
│   │   ├── Library.tsx             # Published entries browser
│   │   ├── MyEntries.tsx           # User entries manager
│   │   ├── PlaybookCard.tsx        # Entry display/edit card
│   │   ├── PrivacyPolicy.tsx       # Privacy policy page
│   │   └── QuickGuide.tsx          # Tutorial modal
│   ├── data/
│   │   └── mockLibrary.ts          # Demo library entries
│   ├── hooks/
│   │   └── useStore.ts             # Global state management
│   ├── lib/
│   │   ├── database.ts             # Supabase CRUD functions
│   │   └── supabase.ts             # Supabase client setup
│   ├── styles/
│   │   └── globals.css             # Global styles, Tailwind imports
│   ├── App.tsx                     # Root component
│   ├── index.css                   # Additional global styles
│   ├── main.tsx                    # Application entry point
│   └── types.ts                    # TypeScript type definitions
├── supabase/
│   ├── functions/
│   │   └── generate-playbook/
│   │       └── index.ts            # AI generation edge function
│   └── migrations/
│       └── 20251216135033_create_playbook_entries_table.sql
├── .env                            # Environment variables (gitignored)
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
├── DOCUMENTATION.md                # This file
└── README.md                       # Project readme
```

---

## Environment Configuration

### Required Environment Variables

**.env file**:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI Configuration (for edge function)
OPENAI_API_KEY=sk-your-openai-key-here
```

### Obtaining Credentials

**Supabase**:
1. Create account at https://supabase.com
2. Create new project
3. Navigate to Settings → API
4. Copy Project URL (VITE_SUPABASE_URL)
5. Copy anon/public key (VITE_SUPABASE_ANON_KEY)

**OpenAI**:
1. Create account at https://platform.openai.com
2. Navigate to API Keys
3. Create new secret key
4. Copy key (OPENAI_API_KEY)
5. Add to Supabase edge function secrets:
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-your-key
   ```

### Build Configuration

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'esbuild'
  }
})
```

**Key Settings**:
- Output directory: `build/`
- SWC compiler for faster builds
- ESBuild minification
- No source maps in production

---

## Credits & Attribution

- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI**: OpenAI GPT-4o-mini
- **Build Tool**: Vite
- **Design**: Based on Figma design by Kadosh AI

---

## License

All rights reserved. © 2024 Playbook Builder. Powered by Kadosh AI.

---

## Contact & Support

For issues, questions, or contributions, please contact the development team.

---

**Document Version**: 1.1
**Last Updated**: January 6, 2026
**Application Version**: 0.1.0

---

## Changelog

### Version 1.1 (January 6, 2026)
- Added "General" industry option for cross-industry recommendations
- Fixed industry dropdown transparency issue (now solid white background)
- Enhanced documentation with detailed design system section
- Added comprehensive component props documentation
- Added data flow and architecture section
- Added file structure overview
- Added environment configuration details
- Added mock library data descriptions
- Expanded test cases with new industry-related tests
- Updated last updated date

### Version 1.0 (December 22, 2024)
- Initial comprehensive documentation
- Complete feature documentation
- Database schema documentation
- API reference
- Component structure
- Test cases
- Setup instructions
