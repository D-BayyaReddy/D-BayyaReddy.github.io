# Interactive Full-Stack Developer Portfolio | Bayya Reddy Danduri.

A premium, highly animated developer portfolio built using React, Next.js (App Router), Tailwind CSS, Framer Motion, and React Three Fiber (Three.js).

## 🚀 Key Features

* **3D Hero Graphic**: An interactive wireframe shape that floats, rotates, and warps/scales reacting directly to mouse hovers (built with WebGL using React Three Fiber).
* **Nebula Aura Particles Background**: Ambient dust stars that pulse softly and drift toward the cursor on proximity, coupled with an active sparkler trail following mouse drag vectors.
* **Interactive CLI Terminal Sandbox**: A mock shell console accepting commands (`help`, `about`, `skills`, `projects`, `contact`, `secret`, `clear`) and executing actions (such as triggers for canvas confetti).
* **Spotlight Card Hover**: Multi-colored neon background spotlights following mouse cursors on hover cards using reactive CSS variables.
* **Dark / Light Theme**: Complete dark-theme SaaS aesthetic with a switch toggle for lighter styling overrides.
* **Modular Engineering Codebase**: Fully structured sections with custom animations using Framer Motion and standard layouts.

## 🛠️ Technology Stack

* **Core**: React, Next.js 15 (App Router), TypeScript
* **Styling**: Tailwind CSS v4, Glassmorphism
* **3D Graphics**: Three.js, React Three Fiber, React Three Drei
* **Animations**: Framer Motion, Canvas Confetti
* **Icons**: Lucide React

## 📂 Project Structure

```text
D-BayyaReddy.github.io/
├── public/                  # Asset directories (favicons, manifest)
├── src/
│   ├── app/                 # Next.js page routing
│   │   ├── globals.css      # Core Tailwind styling & custom variables
│   │   ├── layout.tsx       # Metadata settings & layout wrappers
│   │   └── page.tsx         # Section compiler
│   ├── components/          # Reusable modules
│   │   ├── CanvasBackground.tsx # Particle background handler
│   │   ├── GlowCursor.tsx   # Smooth custom cursor spotlight
│   │   ├── Hero3D.tsx       # R3F WebGL Canvas mesh
│   │   ├── Terminal.tsx     # Mock console shell emulator
│   │   └── ThemeContext.tsx # Client-side theme provider state
│   └── sections/            # Visual sections
│       ├── About.tsx        # Bio & stats counter card
│       ├── Contact.tsx      # Secure email form & confetti triggers
│       ├── Education.tsx    # Academic history timelines
│       ├── Experience.tsx   # Professional career history timelines
│       ├── Footer.tsx       # Logo & social connections footer
│       ├── Github.tsx       # Heatmap grids & repo stats showcase
│       ├── Hero.tsx         # Header tags, typing loops, & CTAs
│       ├── Navbar.tsx       # Sticky responsive menu bar
│       └── Skills.tsx       # Staged skills sheets with level gauges
├── postcss.config.mjs       # CSS compiler settings
├── tsconfig.json            # TypeScript compile configurations
└── package.json             # App dependencies manifests
```

## 💻 Local Setup & Development

### 1. Prerequisite

Ensure you have Node.js (v18+) and npm installed locally.

### 2. Install Packages

Initialize local modules:
```bash
npm install
```

### 3. Launch Development Server

Run local host:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your browser.

### 4. Build for Production

Compile app bundle:
```bash
npm run build
```

---

## ⚡ Deployment Instructions for Vercel

The portfolio is fully optimized for immediate, zero-config deployment on Vercel:

### Option A: Deployment via Vercel Dashboard (Recommended)

1. **Commit and Push to GitHub**:
   Ensure your local modifications are committed and pushed to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete interactive next.js portfolio upgrade"
   git push origin main
   ```
2. **Link to Vercel**:
   - Go to [Vercel.com](https://vercel.com) and log in.
   - Click **Add New** > **Project**.
   - Import your repository: `D-BayyaReddy.github.io`.
3. **Configure Project Settings**:
   - **Framework Preset**: Next.js (detected automatically).
   - **Root Directory**: `./` (detected automatically).
   - **Build Command**: `next build` (detected automatically).
   - **Output Directory**: `.next` (detected automatically).
4. **Deploy**:
   - Click **Deploy**. Vercel will build the React pages, compile assets, and provision a live SSL URL (e.g. `https://d-bayyareddy-github-io.vercel.app`) in under 2 minutes.

### Option B: Deployment via Vercel CLI

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```
2. **Run Vercel Deploy Command**:
   Execute inside the project folder:
   ```bash
   vercel
   ```
   Follow command prompts to log in, link the project, and create a preview deployment.
3. **Promote to Production**:
   ```bash
   vercel --prod
   ```
