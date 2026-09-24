# Mobile Birthday Card Microsite 🤍

A mobile-first, interactive, animated birthday card microsite built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **canvas-confetti**. Designed to feel warm, handmade, tactile, and emotional.

---

## 🎨 Features & Experience Flow

1. **Cover & Gatefold Landing**:
   - High-resolution kraft paper cover gatefold (`/public/cover.jpeg`) split at the ~51% seam into two 3D swinging doors.
   - Soft pulsing glow on the wax seal and faint shimmer on the baby's breath.
   - Parallax 3D tilt driven by touch or device orientation.
   - Typewriter "Tap to open" hint.

2. **2.5s Open Sequence**:
   - Haptic vibration feedback (where supported) & wax seal press animation.
   - Red wax cracking effect: 11 red wax fragments burst outward with gravity physics.
   - 3D perspective gatefold door opening with inner shadow gradients.
   - Inner card scaling reveal with warm background lighting.
   - Opening confetti cannon burst angled from bottom corners.

3. **Letter Reveal & Progression**:
   - Text appears section-by-section with staggered line-by-line fade-ins.
   - Touch anywhere, swipe up/left, or tap the next arrow to advance.
   - Viewport constraint: all pages fit within `100dvh`.
   - Subtle progress dots at the bottom.

4. **Special Confetti Effects**:
   - **Page 8**: Mid-letter golden sparkle confetti burst on *"Allah aapko Arsh ke rang lagaye"*.
   - **Final Hero Page**: Grand hero title presentation with a 3-wave finale confetti celebration (side cannons, 5s top-down rain, and heart burst).
   - **Interactive Taps**: Tapping the card fires mini confetti bursts from the exact touch coordinates.
   - **Replay**: Resets card back to sealed state.

---

## 🛠️ How to Customize

### 1. Swapping Images
- **Cover Image**: Replace `/public/cover.jpeg` with your kraft paper gatefold image.
- **Inner Card Image**: Add `/public/inner.png`. If missing, the site automatically renders a soft cream paper card with paper grain and vignette.

### 2. Editing Text
All letter text lives in [`/content.ts`](file:///c:/Users/aafee/OneDrive/Desktop/birthdaycard/content.ts).
- Edit the `PAGES` array. Each array element represents one page section, and each string is one line.
- Punctuation, line breaks, emojis, and spelling are preserved exactly as defined.

### 3. Customizing Color Palette
In [`/content.ts`](file:///c:/Users/aafee/OneDrive/Desktop/birthdaycard/content.ts), modify the `PALETTE` array:
```ts
export const PALETTE = [
  '#B98B5E', // Kraft brown
  '#D9B382', // Burlap tan
  '#7A1226', // Wax red
  '#F5EFE6', // Cream white
  '#D4AF37', // Gold
  '#E5C158', // Light Gold
];
```

---

## 🚀 Deployment to Vercel

### Option 1: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Via GitHub Integration
1. Push this codebase to a new repository on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for birthday card microsite"
   git branch -M main
   git remote add origin https://github.com/your-username/birthday-card.git
   git push -u origin main
   ```
2. Import the repository on [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically detect Next.js 14 and deploy!

---

## 📦 Tech Stack & Dependencies
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Confetti Engine**: `canvas-confetti`
- **Icons**: `lucide-react`
- **Fonts**: `Cormorant Garamond`, `JetBrains Mono` via `next/font/google`
