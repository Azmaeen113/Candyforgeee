# Automium Web App - Comprehensive Frontend Design Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Design Philosophy](#design-philosophy)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Iconography](#iconography)
7. [Layout System](#layout-system)
8. [Component Design](#component-design)
9. [Animation System](#animation-system)
10. [Visual Effects](#visual-effects)
11. [Page-by-Page Design Analysis](#page-by-page-design-analysis)
12. [Responsive Design](#responsive-design)
13. [Accessibility Considerations](#accessibility-considerations)
14. [Design Tokens Reference](#design-tokens-reference)

---

## Overview

**Automium** is a Telegram Mini App (TMA) designed for cryptocurrency mining/earning gamification. The application features a dark, futuristic aesthetic with purple and gold accents, creating a premium gaming experience centered around the ATM token ecosystem.

### Target Platform
- **Primary:** Telegram Web App (Mobile)
- **Secondary:** Desktop Telegram Web App
- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom CSS

---

## Technology Stack

### Frontend Framework
```
React 18+ with TypeScript
Vite (Build Tool)
```

### Styling Technologies
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **PostCSS** | CSS processing |
| **Custom CSS** | Complex animations & specialized styles |
| **Inline Styles** | Dynamic styling (rotations, transforms) |

### UI Libraries & Dependencies
- **Swiper.js** - League slider/carousel
- **Framer Motion** - Advanced animations
- **React Icons** - Iconography (FaIcons, BiIcons, SiIcons, etc.)
- **React Hot Toast** - Notification system
- **TON Connect UI** - Wallet integration

---

## Design Philosophy

### Core Principles

1. **Dark-First Design**
   - Deep, immersive dark backgrounds
   - Reduces eye strain for extended gaming sessions
   - Creates premium, modern aesthetic

2. **Gamification-Centered**
   - Reward-focused visual hierarchy
   - Progress indicators and achievements
   - Satisfying micro-interactions

3. **Glassmorphism Elements**
   - Backdrop blur effects
   - Semi-transparent containers
   - Layered depth perception

4. **Gradient-Heavy Aesthetics**
   - Purple-to-blue gradients (primary)
   - Gold/yellow accents (rewards/value)
   - Subtle background gradients for depth

5. **Motion-Rich Experience**
   - Continuous animations (spinning, pulsing)
   - Tap feedback animations
   - Floating elements and particles

---

## Color System

### Primary Color Palette

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Deep Background** | `#1A1A1C` | `rgb(26, 26, 28)` | Main app background |
| **Card Background** | `#1a1a2e` | `rgb(26, 26, 46)` | Card/container backgrounds |
| **Secondary Background** | `#342B48` | `rgb(52, 43, 72)` | Navigation, headers |
| **Tertiary Background** | `#433754` | `rgb(67, 55, 84)` | Gradient endpoints |
| **Dark Gray** | `#16213e` | `rgb(22, 33, 62)` | Gradient midpoints |
| **Navy** | `#0f3460` | `rgb(15, 52, 96)` | Deep gradient tones |

### Accent Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Gold Primary** | `#FEE9B3` | Active states, highlights, rewards |
| **Gold Bright** | `#FFD700` | Emphasis, success states |
| **Orange Gold** | `#FFA500` | Gradient endpoints |
| **Yellow Accent** | `#F8D33A` | CTA buttons, important actions |
| **Yellow Bright** | `#fbbf24` | Glow effects |

### Purple Spectrum (Brand Colors)

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Purple Primary** | `#BF5AD2` | Primary actions, highlights |
| **Purple Dark** | `#7B4B84` | Borders, secondary elements |
| **Purple Light** | `#D395DC` | Selection states |
| **Purple Gradient Start** | `#9B59B6` | Gradient elements |
| **Violet** | `#a78bfa` | Glow effects |
| **Blue-Purple** | `#8a2be2` | Shadows, depth |

### Utility Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Text Primary** | `#FFFFFF` | Main text |
| **Text Secondary** | `#a7a5a5` | Inactive nav, secondary text |
| **Text Muted** | `#7F8082` | Labels, hints |
| **Border Gray** | `#D8D8D8` | Inactive borders |
| **Gray Background** | `#4F4F4F` | Disabled states |
| **Success Green** | `#3BAA34` | Progress, success |
| **Light Green** | `#90ef89` | Progress gradient |

### League-Specific Colors

| League | Primary Color | Glow Color |
|--------|---------------|------------|
| Wood | `#8B4513` | `#CD853F` |
| Bronze | `#CD7F32` | `#DAA520` |
| Silver | `#C0C0C0` | `#E6E8FA` |
| Gold | `#FFD700` | `#FFFACD` |
| Platinum | `#E5E4E2` | `#F5F5F5` |
| Diamond | `#B9F2FF` | `#E0FFFF` |
| Master | `#9370DB` | `#E6E6FA` |
| Elite | `#FF69B4` | `#FFB6C1` |
| Grandmaster | `#FF4500` | `#FF6347` |
| Legendary | `#FF1493` | `#FF69B4` |
| Mythic | `#9400D3` | `#DDA0DD` |

### Leaderboard Position Colors (First 10)

```javascript
const fixedColors = [
  "#2ECC71", // Green (1st)
  "#9B59B6", // Purple (2nd)
  "#8B4513", // Brown (3rd)
  "#E74C3C", // Red (4th)
  "#000000", // Black (5th)
  "#2ECC71", // Green (6th)
  "#9B59B6", // Purple (7th)
  "#8B4513", // Brown (8th)
  "#E74C3C", // Red (9th)
  "#000000"  // Black (10th)
];
```

---

## Typography

### Font Families

```css
font-family: "Roboto", sans-serif;        /* Primary - Body text */
font-family: "Roboto Condensed", sans-serif; /* Compact UI elements */
font-family: "Lemon", cursive;            /* Display/Decorative */
font-family: "Lemonada", cursive;         /* Alternative display */
font-family: "Plus Jakarta Sans", sans-serif; /* Modern sans */
font-family: "Manrope", sans-serif;       /* Clean geometric */
font-family: "Oswald", sans-serif;        /* Bold headings */
font-family: "Inter", sans-serif;         /* UI text */
font-family: "Asap", sans-serif;          /* Readable body */
```

### Tailwind Font Configuration

```javascript
fontFamily: {
  lemon: ["Lemon", "cursive"],
  robotoCondensed: ["Roboto Condensed", "sans-serif"],
  roboto: ["Roboto", "sans-serif"]
}
```

### Type Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **Hero Title** | `4.5rem` (72px) | 800 (extrabold) | Reward displays |
| **Page Title** | `3xl` (30px) | 800 (extrabold) | Main headings |
| **Section Title** | `2xl` (24px) | 700 (bold) | Section headers |
| **Card Title** | `xl` (20px) | 600 (semibold) | Card headers |
| **Body Large** | `lg` (18px) | 500 (medium) | Important body text |
| **Body** | `base` (16px) | 400 (normal) | Standard body |
| **Small** | `sm` (14px) | 400 (normal) | Secondary info |
| **Tiny** | `xs` (12px) | 400 (normal) | Labels, metadata |

### Font Weights Used

- `font-normal` (400) - Body text
- `font-medium` (500) - Slightly emphasized
- `font-semibold` (600) - Subheadings
- `font-bold` (700) - Headings
- `font-extrabold` (800) - Hero text, emphasis
- `font-black` (900) - Maximum emphasis (CTA buttons)

---

## Iconography

### Icon Libraries

| Library | Package | Usage |
|---------|---------|-------|
| **Font Awesome** | `react-icons/fa` | Social, general |
| **Font Awesome 6** | `react-icons/fa6` | Modern icons |
| **Feather Icons** | `react-icons/fi` | Minimal UI |
| **Bootstrap Icons** | `react-icons/bi` | +/- controls |
| **Simple Icons** | `react-icons/si` | Brand icons |
| **Themify** | `react-icons/tfi` | Gifts, rewards |
| **Remix Icons** | `react-icons/ri` | Wallet icons |
| **Hero Icons** | `react-icons/hi2` | Modern UI |
| **Io Icons** | `react-icons/io5` | Messaging apps |
| **Lucide** | `react-icons/lu` | Links, actions |

### Common Icon Sizes

| Context | Size | Tailwind Class |
|---------|------|----------------|
| Navigation | 20px | `size={20}` |
| Social Buttons | 19-24px | `size={19}` to `size={24}` |
| Modal Close | 34px | `size={34}` |
| Feature Icons | 22px | `text-[22px]` |
| Small Indicators | 13-16px | Various |

### Navigation Icons Mapping

```tsx
<SiTask />          // Tasks
<FaRankingStar />   // Leaderboard
<FaUserFriends />   // Friends
<RiWallet3Line />   // Wallet
<img src={logo} />  // Home (center)
```

---

## Layout System

### Screen Structure

```
┌─────────────────────────────────────┐
│            Header (fixed)            │
├─────────────────────────────────────┤
│                                     │
│                                     │
│           Main Content              │
│        (scrollable area)            │
│                                     │
│                                     │
├─────────────────────────────────────┤
│         Bottom Navigation           │
│            (fixed)                  │
└─────────────────────────────────────┘
```

### Container Constraints

```css
/* Main app container */
max-width: 507px;       /* Mobile-optimized width */
min-height: 772px;      /* Minimum viewport height */
max-height: 838px;      /* Maximum viewport height */

/* Content container */
max-width: xl (1280px); /* For wider screens */
padding: 20px;          /* Standard padding */
```

### Spacing System (Tailwind)

| Token | Value | Usage |
|-------|-------|-------|
| `p-1` | 4px | Tight padding |
| `p-2` | 8px | Small elements |
| `p-3` | 12px | Buttons, nav items |
| `p-4` | 16px | Cards, sections |
| `p-5` | 20px | Modal padding |
| `p-6` | 24px | Large sections |
| `p-8` | 32px | Hero sections |
| `gap-2` | 8px | Tight spacing |
| `gap-3` | 12px | Standard spacing |
| `gap-4` | 16px | Section spacing |
| `gap-7` | 28px | Large gaps |
| `mb-4` | 16px | Section margins |
| `mb-6` | 24px | Large margins |
| `mb-8` | 32px | Major sections |

### Grid Systems

```css
/* Shop items grid */
grid-template-columns: repeat(2, 1fr);
gap: 16px;

/* Social share buttons */
grid-template-columns: repeat(6, 1fr);
gap: 12px;

/* Daily rewards grid */
grid-template-columns: repeat(2, 1fr);
gap: 16px;
```

---

## Component Design

### 1. Button Styles

#### Primary CTA Button
```css
/* Gradient background with gold/orange tones */
background: linear-gradient(to right, #fbbf24, #f97316, #fbbf24);
color: white;
padding: 14px 16px;
border-radius: 8px;
font-weight: 700;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

/* Hover state */
transform: scale(1.05);
box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
```

#### Purple Action Button
```css
background: #BF5AD2;
color: #FFE7FF;
padding: 12px 16px;
border-radius: 8px;
font-weight: 500;

/* Hover */
background: #9333ea; /* purple-600 */
```

#### Ghost/Outline Button
```css
background: transparent;
border: 2px solid #ffffff;
color: white;
border-radius: 25px;
```

#### Gradient Pill Button
```css
background: linear-gradient(to right, #9333ea, #3b82f6);
color: white;
padding: 4px 12px;
border-radius: 9999px;
font-weight: 400;
```

### 2. Card Styles

#### Standard Card
```css
background: rgba(17, 17, 17, 0.8);  /* gray-900/80 */
backdrop-filter: blur(8px);
border: 1px solid rgba(55, 65, 81, 0.5); /* gray-700/50 */
border-radius: 12px;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

#### Glowing Card (with gradient border effect)
```css
/* Outer glow layer (absolutely positioned) */
position: absolute;
inset: -0.5px;
background: linear-gradient(to right, #9333ea, #3b82f6);
border-radius: 12px;
filter: blur(4px);
opacity: 0.3;

/* Inner content */
position: relative;
background: linear-gradient(to bottom-right, #111827, #1f2937);
border-radius: 12px;
```

#### Glassmorphism Card
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
border: 1px solid rgba(250, 204, 21, 0.2); /* yellow-400/20 */
border-radius: 16px;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### 3. Modal Design

#### Modal Overlay
```css
position: fixed;
inset: 0;
z-index: 50;
background: rgba(0, 0, 0, 0.4);  /* or rgba(0,0,0,0.9) for darker */
backdrop-filter: blur(3px);
display: flex;
align-items: center;
justify-content: center;
```

#### Modal Container
```css
width: 90%;
max-width: 448px;  /* md */
background: white;  /* Light modals */
/* OR */
background: #1f2937; /* Dark modals */
border-radius: 12px;
padding: 20px;
```

#### Toast Notification
```css
position: fixed;
top: 16px;
left: 50%;
transform: translateX(-50%);
z-index: 50;
background: #111827;
border: 1px solid #374151;
border-radius: 8px;
padding: 16px 24px;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### 4. Navigation Bar

```css
/* Container */
position: fixed;
bottom: 0;
left: 50%;
transform: translateX(-50%);
width: 100%;
max-width: xl;
background: #342B48;
border-top: 1px solid rgba(0, 0, 0, 0.15);
border-radius: 16px 16px 0 0;
z-index: 50;

/* Nav items */
display: flex;
justify-content: space-around;
padding: 12px;

/* Active state */
color: #FEE9B3;

/* Inactive state */
color: #a7a5a5;
```

### 5. Progress Bar

```css
/* Container */
height: 16px;
background: #1f2937;
border-radius: 9999px;
overflow: hidden;

/* Fill */
height: 100%;
background: linear-gradient(to right, #fbbf24, #f97316, #fbbf24);
transition: width 500ms;

/* Shine overlay */
background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
```

### 6. Input Fields

```css
/* Container */
background: #f3f4f6;  /* gray-100 */
border-radius: 8px;
padding: 16px;

/* Text input */
background: transparent;
border: none;
outline: none;
width: 100%;
color: #000000;
```

### 7. Task Item

```css
/* Container */
background: rgba(17, 17, 17, 0.8);
backdrop-filter: blur(4px);
border: 1px solid #1f2937;
border-radius: 12px;
padding: 16px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Gradient border effect */
position: absolute;
inset: -0.3px;
background: linear-gradient(to right, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3));
border-radius: 12px;
filter: blur(4px);
```

---

## Animation System

### CSS Keyframes

#### 1. Spin Animation
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 5s linear infinite;
}
```

#### 2. Float Animation (Tap Effects)
```css
@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-200px);
  }
}

.animate-float {
  animation: floatUp 1.5s ease-out forwards;
}
```

#### 3. Bounce Animation
```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce-custom {
  animation: bounce 2s infinite;
}
```

#### 4. Soft Bounce
```css
@keyframes softbounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-softbounce {
  animation: softbounce 3s ease-in-out infinite;
}
```

#### 5. Gradient Animation
```css
@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}
```

#### 6. Click/Tap Animation
```css
@keyframes click-animate {
  0% { transform: scale(1); }
  50% { transform: scale(0.85); }
  100% { transform: scale(1); }
}

.click-animate {
  animation: click-animate 2s ease-in-out infinite;
}
```

#### 7. Blink Animation
```css
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.dot {
  animation: blink 1s infinite;
}
```

#### 8. Simple Float (3D Effect)
```css
@keyframes simpleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

.play-gotem-button {
  animation: simpleFloat 3s infinite ease-in-out;
}
```

#### 9. Gradient Background Animation
```css
@keyframes gradientBackground {
  0% {
    background-image: linear-gradient(120deg, #171717, #1e2122);
  }
  50% {
    background-image: linear-gradient(120deg, #171717, #1e2122);
  }
  100% {
    background-image: linear-gradient(120deg, #171717, #1e2122);
  }
}
```

### Tailwind Animation Classes Used

| Class | Animation |
|-------|-----------|
| `animate-spin` | Standard rotation |
| `animate-pulse` | Opacity pulse |
| `animate-bounce` | Vertical bounce |
| `animate-ping` | Expanding ping effect |

### Transition Properties

```css
/* Standard transitions */
transition: all 0.3s ease;
transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
transition: colors 300ms;

/* Tailwind transition classes */
.transition-all
.transition-colors
.transition-transform
.transition-opacity

/* Duration classes */
.duration-200
.duration-300
.duration-500
```

### Interactive States

#### Tap/Click Effect (3D Tilt)
```tsx
// Dynamic style calculation
const rotateY = ((x - centerX) / centerX) * 20;
const rotateX = ((centerY - y) / centerY) * 20;

setTapStyle({
  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`,
  boxShadow: "0 0 32px 8px #fbbf24, 0 0 64px 16px #a78bfa",
  transition: "transform 120ms cubic-bezier(.4,2,.6,1), box-shadow 200ms"
});
```

#### Hover Scales
```css
.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:scale-110:hover { transform: scale(1.10); }
.active\:scale-95:active { transform: scale(0.95); }
```

---

## Visual Effects

### 1. Shadow System

#### Purple Glow Shadows
```css
.shadow-purple {
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.3);
}

.shadow-purple-small {
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.2);
}

.shadow-purple-card {
  box-shadow: 0 4px 6px -1px rgba(138, 43, 226, 0.1),
              0 2px 4px -1px rgba(138, 43, 226, 0.06);
}
```

#### Blue Glow (Top)
```css
.top-glow {
  box-shadow: 0 -26px 20px rgba(88, 185, 223, 0.3);
}
```

#### Standard Shadows
```css
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
```

### 2. Gradient Overlays

#### Background Gradient Effects
```css
/* Top gradient overlay */
.absolute.top-0 {
  background: linear-gradient(to bottom, 
    rgba(88, 28, 135, 0.2),  /* purple-900/20 */
    transparent
  );
  height: 256px;
  filter: blur(48px);
}

/* Bottom gradient overlay */
.absolute.bottom-0 {
  background: linear-gradient(to top,
    rgba(30, 58, 138, 0.2),  /* blue-900/20 */
    transparent
  );
  height: 256px;
  filter: blur(48px);
}
```

#### Card Gradient Borders
```css
/* Outer glow element */
background: linear-gradient(to right, 
  rgba(147, 51, 234, 0.3),   /* purple-600/30 */
  rgba(59, 130, 246, 0.3)    /* blue-600/30 */
);
filter: blur(4px);
opacity: 0.3;
```

### 3. Blur Effects

| Effect | Blur Amount | Usage |
|--------|-------------|-------|
| `blur-sm` | 4px | Subtle backgrounds |
| `blur` | 8px | Card backgrounds |
| `blur-lg` | 16px | Glow effects |
| `blur-xl` | 24px | Major glows |
| `blur-2xl` | 40px | Background effects |
| `blur-3xl` | 64px | Large ambient glows |
| `backdrop-blur-sm` | 4px | Modal overlays |
| `backdrop-blur-md` | 12px | Glassmorphism |

### 4. Particle System

```css
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: transform 5s ease-out, opacity 5s ease-out;
}
```

### 5. Loading Spinner

```css
.loader {
  border: 3px solid #e1bde9;
  border-top: 3px solid #bc10df;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1.5s linear infinite;
}
```

### 6. Skeleton Loading

```css
/* Skeleton card */
background: rgba(31, 41, 55, 0.7);  /* gray-800/70 */
backdrop-filter: blur(4px);
border-radius: 12px;
animation: pulse 2s infinite;

/* Skeleton line */
height: 16px;
background: #374151;  /* gray-700 */
border-radius: 4px;
```

---

## Page-by-Page Design Analysis

### 1. Loading Screen

**Visual Elements:**
- Full-screen background image with dark overlay (30% black)
- Centered logo with shadow (w-24 h-24 to w-32 h-32)
- Dual spinning rings (opposite directions)
- Floating particle effects
- Pulsing "Loading..." text

**Color Palette:**
- Background: Image with `bg-black/30` overlay
- Spinner: White, purple-400, blue-400, pink-400
- Text: White with 80% opacity for secondary

---

### 2. Home/Tap Section

**Layout:**
- Fixed header with league badge and wallet connect
- Scrollable main content
- Fixed bottom navigation

**Key Components:**
- **Balance Display:** Large ATM token count with coin icon
- **Tap Circle:** Full-width tappable coin with 3D tilt effect
- **Progress Bar:** Daily tap limit (1000 taps)
- **Daily Reward Button:** Gradient button with ping indicator

**Interactive Features:**
- 3D perspective tilt on tap
- "+1" floating animations
- Glow pulse effects

**Colors:**
- Background: `#1A1A1C`
- Balance text: White with yellow "ATM" suffix
- Progress bar: Yellow-orange gradient
- Daily reward button: Blue-to-yellow gradient

---

### 3. Header Component

**Elements:**
- League badge (left) - rounded with gradient background
- Wallet connect button (right) - matching style

**Styling:**
```css
background: linear-gradient(to right, #342B48, #433754);
border: 1px solid rgba(250, 204, 21, 0.3);
border-radius: 8px;
```

**Hover States:**
- Icon scale: 1.10
- Text color: Yellow-300
- Arrow translate: X+1

---

### 4. Tasks Page

**Layout:**
- Vertical list of task cards
- Each task with icon, title, reward, and action button

**Task Card Design:**
- Dark card with gradient border glow
- Icon container with purple border
- Reward amount in muted color
- Action button states: Go (gradient) / Claim (gradient) / ✅ (completed)

**Colors:**
- Card background: `gray-900/80`
- Border glow: `purple-600/30` to `blue-600/30`
- Icon background: Black
- Reward text: `#7F8082`
- Action button: Purple-to-blue gradient

---

### 5. Leaderboard Page

**Layout:**
- Header image with trophy
- Current user rank card (highlighted)
- Scrollable list of top users

**User Rank Card:**
- Gradient border effect (purple to blue)
- Animated gradient top bar
- Avatar with initials
- Rank badge with glow

**List Item Design:**
- Position-based color coding
- Initials avatar with gradient
- Points display with "ATM" suffix
- Medal icons for top 3

**Special Effects:**
- Top 3 positions get crown icon
- Animated gradient bar on user's own card
- Hover scale transformation (1.02)

---

### 6. Friends Page

**Layout:**
- Header with invite graphic
- Share buttons grid (6 columns)
- Friends list

**Share Button Grid:**
Platform colors:
- Telegram: `#0088cc`
- WhatsApp: `#25D366`
- Messenger: `#0084ff`
- Line: `#00B900`
- Twitter: `black`
- Copy Link: `gray`

**Friend Avatar Colors:**
```javascript
const gradients = [
  "from-purple-600 to-blue-500",
  "from-blue-500 to-teal-400",
  "from-green-500 to-emerald-400",
  "from-yellow-500 to-orange-400",
  "from-pink-500 to-rose-400",
  "from-indigo-500 to-purple-400",
];
```

---

### 7. Wallet/Airdrop Page

**Layout:**
- Header image with wallet theme
- Balance cards (ATM token)
- Wallet address management

**Balance Card:**
- Glassmorphism effect
- Token logo with gradient ring
- Large balance number
- Badge for "Reward Token"

**Features:**
- Copy wallet address functionality
- External link to blockchain explorer
- Loading skeleton states

---

### 8. League Slider

**Design:**
- Full-screen Swiper carousel
- Each league card with unique glow color
- Badge, name, description, requirements

**Card Structure:**
- Glowing background (league color)
- Dark card container
- Circular league badge with glow
- Difficulty badge

**Navigation:**
- Swiper arrows (styled at 20px)
- Dot indicators

---

### 9. Daily Reward Modal

**Layout:**
- Full-screen overlay (90% black)
- 2-column grid for days 1-6
- Special row for day 7
- Claim button at bottom

**Day Card States:**
- **Active:** Purple background with white border
- **Completed:** Checkmark icon
- **Locked:** Muted border

**Reward Display:**
- Token logo
- "+[amount]" text
- Day number label

---

### 10. Booster Modal

**Design:**
- White background modal
- Miner selection grid (3 options)
- Stats display
- Quantity selector
- Rent button

**Colors:**
- Selected border: `#D395DC`
- Unselected border: `#D8D8D8`
- Labels: `#B3B3B3`
- Price highlight: `#BF5AD2`
- CTA button: `#BF5AD2`

---

### 11. Shop Component

**Layout:**
- 2-column grid of miner cards
- White background (light mode)

**Card Design:**
- Centered miner image
- Name and description
- Price in purple
- Purchase button

**Button States:**
- Available: Purple (`#BF5AD2`)
- Purchased: Gray disabled

---

## Responsive Design

### Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| **Mobile (default)** | 0px | Primary design target |
| **sm** | 640px | Small tablets |
| **md** | 768px | Tablets, larger screens |
| **lg** | 1024px | Desktop |
| **xl** | 1280px | Large desktop |

### Mobile-First Considerations

```css
/* Circle outer - Mobile */
.circle-outer {
  width: 80vw;
  height: 80vw;
  max-width: 350px;
  max-height: 350px;
}

/* Circle outer - Desktop */
@media (min-width: 768px) {
  .circle-outer {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    margin-top: -100px;
  }
}
```

### Telegram-Specific Adjustments

```css
/* Telegram Desktop Web App */
@media (max-width: 507px) {
  .circle-outer {
    width: 70vw;
    height: 70vw;
    max-width: 250px;
    max-height: 250px;
    margin-top: -50px;
  }
}

.telegram-pc-margin {
  margin-top: -40px !important;
}

.telegram-pc-upper-margin {
  margin-top: -100px !important;
}
```

### Scrollbar Hiding

```css
.hide-scrollbar {
  overflow: auto;
  scrollbar-width: none;         /* Firefox */
  -ms-overflow-style: none;      /* IE/Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;                 /* Chrome/Safari */
}
```

---

## Accessibility Considerations

### Current Implementation

1. **Color Contrast:**
   - White text on dark backgrounds (good contrast)
   - Yellow/gold accents for emphasis

2. **Touch Targets:**
   - Navigation items: Adequate size (p-3)
   - Buttons: h-14 (56px) for CTAs
   - Social buttons: w-11 h-11 (44px)

3. **Focus States:**
   - Ring offset on buttons
   - Focus-visible outlines

4. **Semantic HTML:**
   - Proper button elements
   - Form labels (some areas)

### Recommendations for Improvement

1. Add ARIA labels to icon-only buttons
2. Ensure keyboard navigation for modals
3. Add skip links for navigation
4. Test with screen readers
5. Improve focus indicators visibility

---

## Design Tokens Reference

### Quick Reference Card

```css
/* Primary Background */
--bg-primary: #1A1A1C;
--bg-secondary: #342B48;
--bg-card: rgba(17, 17, 17, 0.8);

/* Primary Accent */
--accent-gold: #FEE9B3;
--accent-yellow: #F8D33A;
--accent-purple: #BF5AD2;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #a7a5a5;
--text-muted: #7F8082;

/* Borders */
--border-gold: rgba(250, 204, 21, 0.3);
--border-gray: #374151;

/* Gradients */
--gradient-primary: linear-gradient(to right, #9333ea, #3b82f6);
--gradient-cta: linear-gradient(to right, #fbbf24, #f97316, #fbbf24);
--gradient-bg: linear-gradient(to bottom-right, #1a1a2e, #342B48, #0f3460);

/* Shadows */
--shadow-glow: 0 0 15px rgba(138, 43, 226, 0.3);
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Radii */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* Animation Durations */
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

---

## Summary

The Automium web app features a sophisticated dark-mode gaming interface with:

- **Rich purple and gold color palette** creating a premium feel
- **Glassmorphism and gradient effects** for modern depth
- **Extensive animation system** for engaging interactions
- **Mobile-first responsive design** optimized for Telegram
- **Consistent component library** across all pages
- **Gamification-focused UI** with rewards, progress, and achievements

The design successfully creates an immersive cryptocurrency mining game experience while maintaining usability and visual appeal across different screen sizes and platforms.

---

*Document Version: 1.0*
*Last Updated: February 2026*
*Application: Automium Telegram Mini App*
