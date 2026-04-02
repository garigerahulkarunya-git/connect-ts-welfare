# TGCMFC - Project Documentation & Progress Report

**Telangana Christian Minorities Finance Corporation**
**Date:** April 2, 2026 | **Version:** 1.0
Built with React + TypeScript + Tailwind CSS

---

## 1. Project Overview

The TGCMFC Web Application is a modern, responsive government welfare platform built for the Telangana Christian Minorities Finance Corporation. It serves over 4,46,077 citizens by providing access to welfare schemes, application submission, grievance tracking, and organizational information.

### Key Objectives
- Clean, accessible, mobile-first design
- Fast performance with optimized components
- Easy scheme discovery with search and filters
- Guided multi-step application flow
- Grievance tracking system with ticket management
- District-level contact directory
- News, media, and organizational information

---

## 2. Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 with TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Routing | React Router DOM v6 |
| State | React useState/useMemo hooks |
| Icons | Lucide React |
| Charts | Recharts (available) |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Playwright |
| Font | Noto Sans (Google Fonts) |

---

## 3. Design System

### Color Palette
- **Primary (Crimson):** `#8B0000` — Headers, CTA buttons, accents
- **Secondary (Orange):** `#D35400` — Secondary actions, highlights
- **Accent (Gold):** `#F39C12` — Badges, emphasis, warm accents
- **Background:** `#FAFAFA` — Light neutral background
- **Foreground:** `#262626` — Primary text color

### Typography
- Primary: **Noto Sans** (Google Fonts) with `system-ui` fallback
- Headings: extrabold (800), Body: regular (400) / medium (500)

### Component Library
40+ shadcn/ui components with custom variants including Button, Card, Input, Select, Checkbox, Textarea, Badge, Accordion, Dialog, Tabs, Tooltip, and more.

---

## 4. Pages Completed

### 4.1 Homepage (`/`)
Fully redesigned to match Figma reference:
- Split hero layout with community illustration and trust badge
- Stats bar with icons (Beneficiaries, Active Schemes, Districts, Funds)
- Essential Services cards (Apply, Track, Grievance, Eligibility)
- Financial & Welfare Schemes grid with status badges
- Eligibility Checker CTA section
- Latest News & Announcements
- Leading the Vision — Officials with quotes
- Lives Transformed — Testimonial section
- Quick Links bar and floating chatbot button

### 4.2 Schemes Listing (`/schemes`)
Completely redesigned with Figma-matching UI:
- Breadcrumb navigation
- Hero with bold title and description
- Stats row (13+ Active, 05 Open, 02 Closing Soon, ₹500Cr+)
- Search bar with Category, Eligibility, and Status filter dropdowns
- Flagship Initiatives — 3 featured cards with icons, tags, Apply Now
- All Welfare Schemes — 6 compact cards with status dots
- Scheme recommendation CTA with form

### 4.3 Scheme Detail (`/schemes/:id`)
- Dynamic routing with scheme ID parameter
- Title, description, status badge, deadline
- Apply Now CTA, eligibility criteria, documents, steps
- FAQ accordion, related schemes

### 4.4 Apply Flow (`/apply`)
Completely redesigned 4-step application flow:
- **Step 1 — Eligibility Check:** Yes/No toggle, age/income dropdowns, live eligibility result
- **Step 2 — Personal Details:** Full name, mobile + VERIFY, Aadhaar, address, district, DOB, auto-save indicator
- **Step 3 — Document Upload:** Drag & drop zones (Aadhaar, Income Cert, Community Cert, Photo), status indicators
- **Step 4 — Review & Submit:** Summary with EDIT buttons, masked Aadhaar, documents list, certification checkbox
- **Success Screen:** Reference number with copy, Track/Download buttons, Email/Verification/SMS info cards
- Right sidebar Trustee Guide, sticky bottom nav bar

### 4.5 Grievance Portal (`/grievance`)
- Tabs: Submit, Track, Dashboard
- Ticket ID generation, status tracking
- Dashboard stats (total, resolved, pending)
- Search by ticket ID or mobile number

### 4.6 About Page (`/about`)
- Organization overview, Mission & Vision cards
- Officials section, organizational structure
- Reports & RTI links

### 4.7 Contact Page (`/contact`)
- Searchable district directory
- District cards with officer details, click-to-call
- Head office section

### 4.8 Media Page (`/media`)
- Tabs: News, Events, Success Stories, Gallery
- Card layout with category filters

---

## 5. Components Built

### Layout Components
- **Header** — Sticky with government top bar, branding, nav, mobile menu
- **Footer** — 4-column with links, contact info, copyright
- **Layout** — Wrapper combining Header + main + Footer

### Shared Components
- **SchemeCard** — Reusable scheme listing card
- **StatCounter** — Animated counter with prefix/suffix

### UI Components
40+ shadcn/ui components (Accordion, Badge, Button, Card, Checkbox, Dialog, Input, Select, Tabs, Toast, etc.)

---

## 6. Features Implemented

| Feature | Description |
|---------|------------|
| Responsive Design | Mobile-first with breakpoints at 320/768/1024/1440px |
| Client-side Routing | React Router with 8+ routes and dynamic pages |
| Search & Filtering | Real-time search with category/eligibility/status filters |
| Multi-step Form | 4-step guided application with validation |
| File Upload UI | Drag & drop with file type validation |
| Eligibility Checker | Interactive Yes/No + dropdown verification |
| Grievance Tracking | Ticket generation, status tracking, dashboard |
| Animated Counters | Smooth number animation for stats |
| Accessibility | Semantic HTML, ARIA labels, keyboard navigation |
| Design Tokens | HSL CSS custom properties for theming |
| Dark Mode Ready | CSS variables configured (not yet toggled) |

---

## 7. Data & Mock Backend

All data in `src/data/mockData.ts` with TypeScript interfaces:
- **9 welfare schemes** (3 flagship, 6 regular) across Education, Enterprise, Skill Development, Welfare, Health
- **3 officials** with designations and quotes
- **10 district offices** with officer details
- **6 news items** across news, events, success stories
- **3 sample grievance tickets**
- **Stats:** 4,46,077 beneficiaries, 13+ schemes, ₹850 Cr disbursed, 33 districts

---

## 8. Progress Summary

| Page | Status |
|------|--------|
| Homepage (`/`) | ✅ Complete — Redesigned to match Figma |
| Schemes (`/schemes`) | ✅ Complete — Redesigned with flagship + all schemes |
| Scheme Detail (`/schemes/:id`) | ✅ Complete — Dynamic detail page |
| Apply Flow (`/apply`) | ✅ Complete — 4-step flow redesigned |
| Grievance (`/grievance`) | ✅ Complete — Submit, Track, Dashboard |
| About (`/about`) | ✅ Complete |
| Contact (`/contact`) | ✅ Complete — District directory |
| Media (`/media`) | ✅ Complete — Tabbed layout |
| 404 Page | ✅ Complete |

---

## 9. Remaining Work & Roadmap

### High Priority
1. Backend Integration — Connect Lovable Cloud for database and auth
2. User Authentication — Login/signup with OTP verification
3. Real Image Assets — Hero, news, officials, gallery images
4. Form Validation — Zod schemas with error messages
5. Grievance Page Redesign — Match Figma design system

### Medium Priority
1. Header/Footer Redesign — Match Figma navigation
2. Telugu Language Support — Bilingual toggle
3. Dark Mode Toggle — Activate pre-configured CSS
4. PDF Downloads — Application forms and receipts
5. Chatbot Integration — FAQ chatbot

### Future Enhancements
1. Admin Dashboard — Manage schemes, applications, grievances
2. Email/SMS Notifications — Status updates
3. Analytics Dashboard — Metrics and engagement
4. Accessibility Audit — WCAG 2.1 AA
5. Performance Optimization — Lazy loading, code splitting
6. SEO Enhancement — Meta tags, JSON-LD, sitemap

---

## 10. How to Run

### Prerequisites
- Node.js 18+
- npm or bun

### Setup
```bash
git clone <repository-url>
cd tgcmfc-website
npm install
npm run dev
npm run test
```

### Project Structure
```
src/pages/           — Page components (Index, Schemes, Apply, etc.)
src/components/layout/ — Header, Footer, Layout
src/components/shared/ — SchemeCard, StatCounter
src/components/ui/   — shadcn/ui (40+ components)
src/data/mockData.ts — Mock data with TypeScript interfaces
src/index.css        — Design tokens and utilities
tailwind.config.ts   — Tailwind theme configuration
```
