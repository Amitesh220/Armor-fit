# ARMOR FIT — "Transform Sweat into Strength"

A full-stack, production-grade web application for **Armor Fit Gym**, built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and MongoDB. Faithfully reproduced from the Google Stitch design system with full database integration, admin back-office management, and mobile responsiveness.

---

## 🏛️ Features & Architecture

### 1. Public Facing Pages
- **Homepage (`/`)**:
  - High-impact brutalist/monochrome aesthetic matching Google Stitch design tokens.
  - Hero section with live CTA buttons, operating hours badge, and tagline *“Transform Sweat into Strength”*.
  - Live statistics counter, gym amenities grid, schedule timetable, and membership tier cards with direct enquiry deep-linking.
  - Interactive Google Maps embed and gym contact details.
- **Enquiry Portal (`/enquire` & `/enquiry`)**:
  - Prospective athlete intake form with validation.
  - Selection for fitness goals, training format (Gym, CrossFit, Personal Training), preferred contact channel, and membership tier.
  - Instant submission feedback and zero data loss fallback.
- **Member Feedback Form (`/feedback` & `/member-feedback`)**:
  - Dedicated facility feedback portal for active members.
  - 5-point rating selector, feedback categories (Equipment, Cleanliness, Trainers, Classes), anonymous or identified submissions, and immediate acknowledgement.
- **Contact & Location (`/contact`)**:
  - Complete location details, phone, email, operating schedule, and direct Google Maps embed.

### 2. Admin Back-Office Management (`/admin`)
- **JWT Cookie-Based Security**:
  - HTTP-only secure cookie authentication (`armor_fit_admin_token`) signed with HMAC-SHA256 (`jose`).
  - Protected API routes and admin dashboard layout.
- **Dashboard (`/admin/dashboard`)**:
  - Key performance indicators: Total Enquiries, Pending Follow-ups, Total Feedback, Average Member Rating.
  - Quick action links and real-time activity tables.
- **Athlete Enquiries Management (`/admin/enquiries`)**:
  - Search by athlete name, phone, or email.
  - Filter by lifecycle stage (`NEW`, `CONTACTED`, `CONVERTED`, `CLOSED`).
  - Inline status update dropdowns, detailed modal view, staff notes persistence, and deletion.
- **Member Feedback Management (`/admin/feedback`)**:
  - Filter by star rating and status (`NEW`, `REVIEWED`, `RESOLVED`).
  - Detailed view of member concerns, internal staff notes, and resolution tracking.

### 3. Dual Storage Engine (Resilient Persistence)
- **MongoDB Native**: Connects via Mongoose to MongoDB (`MONGODB_URI`).
- **In-Memory Zero-Config Fallback**: If MongoDB is not yet provisioned or temporarily unreachable, the application automatically falls back to an internal thread-safe in-memory store preloaded with sample data so that the website and admin dashboard continue operating seamlessly without crash.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB (optional, for persistent local database storage)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default credentials in `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/armor_fit
JWT_SECRET=armor_fit_production_jwt_secret_key_minimum_32_characters_random_string_local_dev
ADMIN_EMAIL=admin@armorfit.com
ADMIN_PASSWORD=ArmorFitStaff2025!
ADMIN_NAME=Armor Fit Staff
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Seed the Database (Optional)
To create the initial admin user in your MongoDB database:
```bash
npm run seed:admin
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Admin Login
Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with:
- **Email:** `admin@armorfit.com`
- **Password:** `ArmorFitStaff2025!`

---

## 📦 Production Build & Deployment

### Build
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

### Deployment (e.g. Vercel / Railway / Docker)
1. Push repository to GitHub or GitLab.
2. In your hosting platform (Vercel, AWS Amplify, Railway, Render), configure the environment variables:
   - `MONGODB_URI` (e.g., MongoDB Atlas connection string)
   - `JWT_SECRET` (A strong 32+ character random string)
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD` (Your production admin credentials)
   - `NEXT_PUBLIC_SITE_URL` (Your production domain, e.g., `https://armorfit.com`)
3. Deploy! Next.js will build all pages with automatic static optimization and dynamic API route handlers.

---

## 🎨 Design System & Brand Identity
- **Primary Aesthetic:** Industrial Minimalist / Heavy Monochrome
- **Colors:**
  - Background: `#050505` (Ultra Deep Black)
  - Surface: `#0e1013`, `#121417`, `#181b20`
  - Border: `#23272e`, `#2a2f38`
  - Accent / Text: `#ffffff`, `#f4f4f5`, `#a1a1aa`, `#71717a`
- **Typography:**
  - Headlines: `Montserrat` (ExtraBold & Black, uppercase, tight tracking)
  - Body: `Inter`
  - Accents / Numbers: `Space Mono`
- **Icons:** Material Symbols Outlined
