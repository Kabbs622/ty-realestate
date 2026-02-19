# Ty Real Estate - Prescott, AZ

**Live Site:** https://kabbs622.github.io/ty-realestate/

A modern, dark-themed real estate website for Ty, showcasing new construction and resale homes in Prescott, Arizona.

---

## 🎯 Quick Reference for AI Agents

| Task | Command/File |
|------|--------------|
| Local dev server | `python -m http.server 8000` |
| Main entry point | `index.html` |
| Contact form | FormSubmit.co (currently: kabbott622@gmail.com) |
| Deploy | Push to `main` → GitHub Pages auto-deploys |
| Strategy docs | `strategy.md`, `ty-realestate-research.md` |

---

## About

Ty is a real estate agent specializing in:
- **New construction homes** through Capstone Homes and ĒCCO Homes partnerships
- **Resale properties** in the Prescott area
- **Relocation assistance** for buyers moving from Utah, Phoenix, LA, and beyond
- **Social media marketing** and modern real estate approach

---

## 🚀 Quick Start

```bash
# Serve locally
python -m http.server 8000

# Open http://localhost:8000
```

---

## Website Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark Theme**: Modern cinematic aesthetic with warm gold accents (#D4A853)
- **Community Showcase**: Detailed information about 6 active communities
- **Filterable Communities**: Sort by builder (Capstone/ĒCCO/All)
- **Quick Move-In Homes**: Ready-to-move homes with real availability data
- **Contact Form**: Integrated with FormSubmit.co for lead capture
- **SEO Optimized**: Meta tags for Prescott AZ real estate searches

---

## Communities Featured

### Capstone Homes
| Community | Price Range | Location | Key Features |
|-----------|-------------|----------|--------------|
| Granite Dells Estates | $949,900+ | Prescott | Gated luxury |
| Hidden Hills | $949,900+ | Prescott | National Forest views |
| Jasper 3B | $934,900+ | Prescott Valley | Estate lots |
| Jasper 8 | $794,900+ | Prescott Valley | Near regional park |

### ĒCCO Homes
| Community | Price Range | Location | Key Features |
|-----------|-------------|----------|--------------|
| Jasper 7 | $459,900+ | Prescott Valley | Energy-efficient modern |
| Skyview | $508,900+ | Prescott Valley | RV garage options |

---

## Project Structure

```
ty-realestate/
├── index.html              # Main website (single file, inline CSS/JS)
├── pitch-deck.html         # Investor/partner pitch deck
├── pitch-deck-ty.html      # Ty-specific pitch deck
├── strategy.md             # Marketing strategy document
├── ty-realestate-research.md  # Market research
├── README.md               # This file
├── .gitignore              # Git ignore rules
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── C41-Marketing-Proposal-Ty.pdf  # PDF proposal
└── images/                 # Community photos, headshots
    ├── ty-headshot.jpg
    ├── granite-dells/
    ├── hidden-hills/
    ├── jasper-3b/
    ├── jasper-7/
    ├── jasper-8/
    └── skyview/
```

---

## Technical Details

- **Architecture**: Single-file HTML with inline CSS/JS
- **Dependencies**: Google Fonts (Inter) only
- **Hosting**: Static site ready for GitHub Pages
- **Form Handling**: FormSubmit.co
- **Animations**: Intersection Observer for scroll animations
- **Layout**: CSS Grid and Flexbox for responsive layouts

---

## 🎨 Design System

### Colors
| Name | Value | Usage |
|------|-------|-------|
| Background | #0a0a0a | Main background |
| Secondary | #1a1a1a, #2a2a2a | Cards, sections |
| Accent | #D4A853 | Warm gold - CTAs, highlights |
| Text | #ffffff | Primary text |
| Borders | #333333 | Dividers, outlines |

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

---

## Deployment

### GitHub Pages (Current)
1. Push to `main` branch
2. Auto-deploys to https://kabbs622.github.io/ty-realestate/

### Custom Domain (Recommended)
1. Purchase domain (e.g., typrescott.com)
2. Add CNAME file with domain name
3. Configure DNS A records to GitHub Pages IPs
4. Enable HTTPS in repo settings

---

## 📝 TODO Before Launch

### Critical
- [ ] **Replace placeholder email** in contact form (line with FormSubmit.co)
  - Currently: `kabbott622@gmail.com`
  - Should be: Ty's actual email

- [ ] **Add photos** - Replace CSS gradient placeholders with community photos:
  - [ ] Granite Dells Estates
  - [ ] Hidden Hills
  - [ ] Jasper 3B
  - [ ] Jasper 7
  - [ ] Jasper 8
  - [ ] Skyview

### Important
- [ ] **Update social links** - Verify Instagram handle and add other platforms
- [ ] **Domain setup** - Point custom domain to hosting provider
- [ ] **Analytics** - Add Google Analytics or Plausible tracking
- [ ] **SEO** - Submit sitemap to Google Search Console

### Nice to Have
- [ ] **Testimonials** - Add client reviews
- [ ] **Blog** - Add content marketing section
- [ ] **Mortgage calculator** - Embed calculator widget
- [ ] **Live chat** - Add chat widget for leads

---

## 🔧 Important Notes for AI Agents

1. **Single file architecture** - All CSS and JS is inline in index.html
2. **No build step** - Direct file editing, push to deploy
3. **FormSubmit.co dependency** - Free form handling, just change email
4. **Photos are critical** - Currently using gradient placeholders
5. **Research docs included** - strategy.md has full marketing plan

---

## 📊 Marketing Assets

Included in repo:
- **strategy.md** - Comprehensive marketing strategy
- **ty-realestate-research.md** - Market research and competition analysis
- **C41-Marketing-Proposal-Ty.pdf** - PDF proposal deck
- **pitch-deck.html** - HTML version of pitch deck

---

## ❓ Questions for Kyle/Ty

1. What's Ty's actual email address for the contact form?
2. Do we have high-quality photos of each community?
3. Should we set up a custom domain? (recommended: typrescott.com or similar)
4. Are the prices/square footage current? (check with Ty)
5. Any other communities to add?
6. Should we integrate with an IDX feed for MLS listings?

---

*Built for Ty Real Estate - Prescott, Arizona*
