# Portfolio — Woodland Journey

A surreal, cinematic single-page portfolio for **Swetha Holla Umashankara** — Software Engineer and Data Scientist based in Glasgow, Scotland. A white pixel-cat mascot guides visitors across six atmospheric sections in a dark woodland environment.

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | TailwindCSS v3 (custom woodland palette) |
| **Animations** | Framer Motion v11 |
| **Icons** | Lucide React v0.407 |
| **Utilities** | clsx, tailwind-merge |
| **Linting** | ESLint (next/core-web-vitals) |
| **Zero image deps** | Pixel cat is pure inline SVG |

## Prerequisites

- **Node.js** 18.17+ (Next.js 14 requirement)
- **npm** (comes with Node.js)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site hot-reloads on edits.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking (`tsc --noEmit`) |

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout — metadata, viewport, ResumeProvider, CustomCursor
│   ├── page.tsx             # Main SPA — composes 6 sections + keyboard shortcuts
│   └── globals.css          # Tailwind directives, custom fonts, CSS variables, animations
├── components/
│   ├── layout/
│   │   └── Navigation.tsx   # Sticky top nav, desktop + mobile hamburger menu, social links
│   ├── sections/
│   │   ├── HeroSection.tsx       # Moonlit forest intro, tagline, philosophy quote
│   │   ├── ExperienceSection.tsx # Stats counter + timeline with company dots
│   │   ├── ProjectsSection.tsx   # Project cards with hover thumbnails + koi pond theme
│   │   ├── AwardsSection.tsx     # Awards list with underwater/submerged theme
│   │   ├── SkillsSection.tsx     # Categorized skill tags + meadow/butterfly theme
│   │   └── EducationSection.tsx  # Education cards + Glasgow skyline silhouette footer
│   └── ui/
│       ├── Card.tsx             # Reusable animated motion card (fadeUp variants)
│       ├── CustomCursor.tsx     # Custom dot + ring cursor with lerp lag
│       ├── Fireflies.tsx        # Procedural firefly particle system
│       ├── PixelCat.tsx         # SVG pixel-art cat with 6 contextual scenes
│       └── ResyncButton.tsx     # Live data sync UI (file drop or URL)
├── data/
│   └── resume.json          # ← All resume content (name, experience, projects, skills, etc.)
├── hooks/
│   ├── useKeyboardShortcuts.ts  # Generic keyboard shortcut binder
│   └── useScrollSection.ts     # useInView + useScrollProgress intersection observers
├── lib/
│   ├── resume-context.tsx   # React context for ResumeData + sync state management
│   └── utils.ts             # cn(), fetchResumeFromUrl(), parseResumeFile(), LaTeX parser
├── types/
│   └── index.ts             # TypeScript interfaces (Project, Award, Education, Experience, ResumeData)
├── public/                  # Static assets (project thumbnails go here)
├── next.config.js           # Next.js config (remote images, optimized imports)
├── tailwind.config.js       # Custom colors (bark, moss, mist, ivory, koi, dusk), fonts, animations
├── postcss.config.js        # TailwindCSS + autoprefixer
├── tsconfig.json            # TypeScript config (@/* path alias, strict)
├── .eslintrc.json           # ESLint config
└── .gitignore
```

## Sections

| # | Section | Theme | Pixel Cat Scene |
|---|---|---|---|
| 1 | **Hero** | Moonlit forest, layered tree silhouettes | Standing forward |
| 2 | **Experience** | Branch decorations, gold stats | Sitting on branch |
| 3 | **Projects** | Koi pond with ripple animations | Sitting by pond |
| 4 | **Awards** | Underwater caustic light patterns | Half-submerged in water |
| 5 | **Skills** | Meadow dappled light spots | Mid-pounce chasing butterfly |
| 6 | **Education** | Glasgow Gothic skyline silhouette | Resting on branch |

Each section features ambient fireflies, a noise overlay texture, vignette effect, and scroll-triggered Framer Motion animations.

## Updating Content

Edit `data/resume.json` — the site updates instantly in dev mode.

| Field | Description |
|---|---|
| `name`, `role`, `tagline` | Header identity |
| `email`, `github`, `linkedin` | Social links in navigation |
| `philosophy` | Hero section quote |
| `yearsOfExperience` | Stat counter in Experience section |
| `experience[]` | Timeline entries (company, role, period, description) |
| `projects[]` | Project cards (title, description, tags, link, optional thumbnail) |
| `awards[]` | Awards list (title, issuer, date, description) |
| `skills{}` | Key = category (e.g. "Languages"), value = string array |
| `education[]` | Education cards (institution, degree, period, description) |

### Project Thumbnails

Place images at `public/projects/your-image.jpg` and reference them as `/projects/your-image.jpg` in `resume.json`.

## Resync (Live Updates, No Rebuild)

Click the **Resync** button (bottom-right corner) to update content without redeploying:

1. **Drop a JSON file** — drag & drop a `resume.json` file onto the upload zone
2. **Paste a URL** — point to a raw JSON endpoint (Overleaf raw export, GitHub Gist, your own API)

The site updates instantly via React context. On hard reload, it reverts to `data/resume.json` — persist changes by updating that file.

A `parseLatexToResumeData()` function in `lib/utils.ts` provides a starter LaTeX parser for Overleaf integration.

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `1` – `6` | Jump to section 1–6 |
| `?` | Toggle shortcut legend panel |
| `Escape` | Close panels |

## Ambient Effects

- **Fireflies** — Procedural particle system with randomized positions and glow
- **Noise overlay** — SVG fractal noise with `mix-blend-mode: overlay` on every section
- **Vignette** — Radial gradient overlay on every section
- **Custom cursor** — Ivory dot + slower lerped ring, shrinks on `<a>`/`<button>` hover
- **Custom scrollbar** — Thin gold scrollbar matching the woodland theme

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import at [vercel.com/new](https://vercel.com/new). Zero configuration required.

### Environment Variables

None required. Optional:

```
NEXT_PUBLIC_RESUME_URL=https://your-endpoint.com/resume.json
```
