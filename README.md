# LapMart 2030 — Nexora E-Commerce Experience

> **LapMart 2030** is a next-generation, high-performance laptop and tech e-commerce platform built with Next.js 16, Tailwind CSS, Lucide Icons, and Web Audio FX. It features commercial-grade 3D studio product photography, responsive interactive collections, 60fps auto-sliding infinity loops, and real-time cart/wishlist state management.

---

## ✨ Features

- **Futuristic 3D Panoramic Hero**: Full-bleed 16:9 3D virtual showroom with floating UI portals and 3D gaming laptop spotlight.
- **Interactive Seamless Collections**: Borderless, edge-blended category banners with 100% color-matched gradients.
- **Hardware-Accelerated Infinity Carousel**: 60fps continuous horizontal drift (`requestAnimationFrame`) with smart hover/touch pause and manual `<` / `>` directional controls.
- **Realistic Studio Photography**: Hand-crafted, high-definition WebP laptop assets with floor drop shadows and natural ambient reflections.
- **Realistic Campaign Banners**: Summer Refresh Sale campaign card matching reference aesthetics.
- **Interactive Audio Feedback**: Custom synthesized Web Audio effects for clicks, cards, cart interactions, and navigation.
- **Comprehensive Catalog & Filters**: Full `/shop` experience with brand, processor, price range, and RAM filtering.
- **Mobile-First Responsive Layout**: Built with Tailwind CSS for seamless viewing across smartphones, tablets, and 4K desktops.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context (`StoreContext.tsx`) with localStorage persistence
- **Audio Engine**: HTML5 Web Audio API Synthesizer (`utils/sound.ts`)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deepalsuranga/lapmart-2030.git
   cd lapmart-2030
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser.

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

MIT © Deepal Suranga Weerasuriya
