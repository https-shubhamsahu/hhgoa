# Hacker House Goa 2026 Frame & Builder ID Generator

A client-side frame and builder identity generator created for **Hacker House Goa 2026 Task 1**.

This application enables builders and hackathon teams to generate high-resolution official Hacker House Goa 2026 passports, avatar PFMs, and combined Crew Frame graphics locally in the browser with real-time canvas rendering, customizable typography, photo cropping, dynamic QR code generation, and direct X (Twitter) sharing.

---

## 🌟 Key Features

### 1. Builder ID Passport (1024 × 1536 px)
- Official Hacker House Goa 2026 badge passport overlay (`template_final.png`).
- Dynamic Builder Class badge (`AI ENGINEER`, `FULL STACK`, `WEB3 BUILDER`, `CYPHERPUNK`, `GOA HACKER`).
- Custom name, role, tech stack, and building statement typography.
- Interactive photo positioning, panning ($X,Y$), and zoom controls.

### 2. PFP Avatar Frame (1254 × 1254 px)
- 1:1 square profile picture avatar frame overlay (`pfp_final.png`).
- High-res photo positioning with circular mask clipping.
- Optimized for Twitter/X, Discord, and Telegram profile pictures.

### 3. Combined Crew Frame (2048 × 1362 px)
- Official Hacker House Goa Crew template artwork (`template_crew.png`).
- Dynamic balanced layouts for **1 to 4 crew members** (Leader + up to 3 teammates).
- Auto-scaling Team Name typography with zero overflow.
- Individual member photo cutouts, Electric Yellow border rings, member names, and roles.
- Bottom-left reserved box encoding dynamic QR code with project/team website URL.

### 4. Client-Side Performance & Privacy
- **100% Client-Side Processing**: All canvas compositing, HEIC conversion (`heic2any`), and PNG exports happen strictly inside the browser.
- **Dynamic QR Code Engine**: Generates clean QR codes for project/team URLs.
- **X (Twitter) Sharing**: One-click sharing pre-filled with project details, team info, and `#FrameInGoa` hashtag.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (TypeScript)
- **Build System**: Vite 6
- **Styling**: Tailwind CSS + Vanilla CSS Tokens
- **Icons**: Lucide React
- **Canvas & QR**: HTML5 2D Context + `qrcode` + `canvas-confetti`
- **Image Processing**: Native HTML5 Canvas + `heic2any` (Apple HEIC/HEIF support)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/https-shubhamsahu/hhgoa.git

# Navigate to project directory
cd hhgoa

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be running at `http://localhost:3000/`.

---

## 📦 Building for Production

To create an optimized production build:

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

The production output will be generated in the `dist/` directory.

---

## 📜 License

Created for Hacker House Goa 2026.
