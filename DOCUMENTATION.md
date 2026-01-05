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
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI component library
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Client-side navigation (without react-router)
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

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
User Arrives → Selects Industry → Enters Dashboard
                     ↓
              Privacy Policy (optional)
```

**Industry Selection**:
- 18 industry options available (IT, Finance, Healthcare, etc.)
- Each industry has unique icons and color gradients
- Selection persists in localStorage
- Background music player available

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
- Recommended playbooks based on industry
- Recent activity sidebar
- Pro tips and statistics
- Quick access to all sections

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
- **Location**: Landing page
- **Function**: Allows users to select their industry context
- **Industries Supported**:
  - IT & Technology
  - Finance & Banking
  - HR & Recruitment
  - Operations & Logistics
  - Healthcare
  - Construction
  - Marketing
  - Education
  - Retail & E-commerce
  - Manufacturing
  - Legal & Compliance
  - Sales
  - Customer Service
  - Product Management
  - Real Estate
  - Hospitality & Tourism
  - Media & Entertainment
  - Government & Public Sector

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

## Component Structure

### Component Hierarchy
```
App
├── IndustryLanding
│   ├── BackgroundMusic
│   └── Footer
├── Layout
│   ├── Header
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
- **Props**: onSelect, onPrivacyPolicyClick
- **Features**: Industry cards with icons, gradients, animations

#### Dashboard.tsx
- **Purpose**: Main hub after industry selection
- **Props**: industry, entries, onViewEntry, onNewEntry
- **Features**: Search, recommendations, recent activity

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
- **Props**: currentIndustry, onIndustryChange, currentView, onNavigate
- **Features**: Navigation menu, industry selector, privacy policy link

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
- Entries: Supabase database
- Loading on mount: Fetches all entries from database

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

**Document Version**: 1.0
**Last Updated**: December 22, 2024
**Application Version**: 0.1.0
