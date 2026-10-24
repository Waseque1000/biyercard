# Wedly AI — Artisanal Wedding Stationery Atelier

> **"Your Love Story, Beautifully Invited."**  
> Create breathtaking, personalized wedding invitations in minutes with the power of Google Gemini AI.

---

## 💍 Overview

**Wedly AI** is a premium, AI-powered wedding invitation generator inspired by luxury boutique wedding studios and modern SaaS applications. Rather than producing raw HTML or generic layouts, Wedly uses Google Gemini to generate a strictly validated **JSON design specification**, which is then rendered through handcrafted, reusable React components into 300 DPI print-ready stationery.

Built with **Next.js (JavaScript & JSX only)**, **Tailwind CSS**, **Firebase Authentication**, **Supabase PostgreSQL**, and the **Google Gemini API**.

---

## ✨ Key Features

1. **AI-Powered Wedding Creation Wizard (6 Steps)**:
   - **Step 1: Ceremony & Couple Details**: Bride & Groom names, date, vows time, venue, location, quote, host parents, RSVP portal.
   - **Step 2: Language & Cultural Style**: Native support for **English**, **বাংলা (Bangla)**, and **Bilingual (English + Bangla)** with cultural archetypes (Western Classic, Traditional Bangladeshi, Islamic Nikah & Walima, Hindu Vivah, Fusion).
   - **Step 3: Signature Design Style**: Luxury Royal, Floral & Romantic, Modern Minimal, Traditional Kolka, Romantic Blush.
   - **Step 4: Curated Color Palette**: Real chromatic swatches (Emerald & Gold, Burgundy & Champagne, Ivory & Sage, Blush Pink & Cream, Navy & Gold, Terracotta & Beige).
   - **Step 5: Ornaments & Finishing**: Gilded floral corners, double gold borders, wax seal monogram crests, botanical branches, portrait / landscape orientation.
   - **Step 6: AI Synthesis & Review**: Review summary with real-time rotating status messages and instant transition to the Live Studio.

2. **5 Reusable Wedding Invitation Templates**:
   - `Emerald Royal`: Deep forest emerald (`#173D32`), antique champagne gold (`#C6A66B`), royal wax seal monogram, double gilded framing.
   - `Ivory Floral`: Warm cotton rag (`#FAF8F4`), botanical watercolor eucalyptus and olive foliage, deckled edge simulation.
   - `Modern Minimal`: Architectural negative space, crisp editorial typography, subtle dividers, understated elegance.
   - `Traditional Celebration`: Ornate Paisley/Kolka filigree, Islamic arch / mihrab styling, bilingual Bangla typography (`Hind Siliguri`).
   - `Romantic Blush`: Soft blush petal tones (`#FCF8F7`), rose gold borders, translucent vellum ribbon overlay effect.

3. **Live Invitation Studio & Editor (`/editor/[id]`)**:
   - **Left Panel**: Tabs for Text, Palette, Template, Decorations, and AI Magic.
   - **Quick AI Actions**: "Make it more luxurious", "Try a different floral style", "Make it more minimal", "Use traditional cultural styling", "Improve invitation wording".
   - **Right Stage**: Large responsive stationery canvas with zoom controls (50% – 140%), desktop and mobile preview frames, and tactile paper elevation shadows.
   - **Undo & Redo**: Built-in state history stack.
   - **Autosave**: Debounced cloud persistence with visual status pips.

4. **High-Resolution Export & Public Sharing**:
   - **PNG Export**: 300 DPI high-resolution rasterization.
   - **PDF Export**: Standard 5×7 inch print-ready vector PDF for commercial printers.
   - **Public Invitation Web Link (`/invite/[id]`)**: Standalone page with ceremony countdown, Google Calendar integration, Google Maps venue links, and interactive RSVP response form.

5. **User Dashboard & Library (`/dashboard`)**:
   - Sidebar navigation: Overview, Create Invitation, My Invitations, Explore Designs, Favorites, Account Settings, Billing, Help & Support.
   - 4-Bento Key Metrics: Total Suites, Attendance Flow, Moodboard Stacks, Gemini AI Credits.
   - Searchable, filterable invitation library with grid & list views.
   - Duplicate, share, edit, and delete actions.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router, JavaScript & JSX only) |
| **Styling** | Tailwind CSS v4 with custom design tokens |
| **Typography** | Playfair Display, DM Sans, Hind Siliguri (Bengali) |
| **Icons** | Lucide React |
| **Authentication** | Firebase Authentication (Client SDK + Admin server token bridge) |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **AI Engine** | Google Gemini API (`@google/genai` / `gemini-2.5-flash`) |
| **Validation** | Zod schemas |
| **Export** | html2canvas + jsPDF (5×7 inch, 300 DPI) |
| **Toasts** | Sonner |

---

## 📁 Project Structure

```text
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/sync-profile/   # Firebase UID -> Supabase bridge
│   │   │   ├── generate-design/     # Gemini AI invitation generator
│   │   │   ├── regenerate-style/    # Quick AI assistant actions
│   │   │   └── invitations/         # CRUD for saved invitations
│   │   ├── create/                  # 6-Step AI Creation Wizard
│   │   ├── dashboard/               # Overview, Invitations Library, Settings
│   │   ├── editor/[id]/             # Live Studio & Editor
│   │   ├── invite/[id]/             # Public shareable invitation page
│   │   ├── login/                   # Authentication sign in
│   │   ├── register/                # User registration
│   │   ├── forgot-password/         # Password recovery
│   │   ├── globals.css              # Wedly theme tokens & typography
│   │   ├── layout.js                # Root layout with Google Fonts
│   │   └── page.js                  # Landing page (8 curated sections)
│   ├── components/
│   │   ├── dashboard/               # Dashboard layout & views
│   │   ├── editor/                  # Studio controls & canvas
│   │   ├── invitation-templates/    # 5 Reusable templates & SVG decorations
│   │   ├── landing/                 # 8 Landing page sections
│   │   ├── public-invite/           # Public invitation component
│   │   └── wizard/                  # 6-Step Creation Wizard
│   ├── context/
│   │   └── AuthContext.js           # Firebase Auth & demo account session
│   └── lib/
│       ├── exportUtils.js           # 300 DPI PNG & 5x7 PDF export
│       ├── firebase/                # Client config & Admin token verification
│       ├── gemini/                  # Google Gemini API & fallback engine
│       ├── schemas/                 # Zod validation schemas
│       └── supabase/                # Supabase client & server operations
├── supabase-schema.sql              # Complete PostgreSQL schema & RLS policies
├── .env.example                     # Environment variables reference
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your credentials:
- **Firebase**: Create a project in [Firebase Console](https://console.firebase.google.com) and enable Email/Password & Google sign-in.
- **Supabase**: Create a project in [Supabase](https://supabase.com) and copy `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- **Gemini**: Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com).

*(Note: Wedly AI includes a built-in development fallback engine so you can test all features, preview cards, edit designs, and test the dashboard even before configuring external keys!)*

### 3. Initialize Supabase Database

Run the SQL migration in `supabase-schema.sql` in the Supabase SQL Editor:
- Creates `profiles`, `invitations`, and `user_preferences` tables.
- Enables Row Level Security (RLS) policies.
- Adds indexing and auto-updating timestamp triggers.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. Under **Project Settings > Environment Variables**, add the environment variables from `.env.example`.
4. Deploy! Next.js will build with Turbopack and optimize static and dynamic pages automatically.
