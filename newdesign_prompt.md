# Candy Forge - Modern UI/UX Design Transformation

## Executive Vision

Transform the existing Automium dark-themed mining app into **Candy Forge** - a vibrant, playful, and modern candy-themed gaming experience that captures the joy and excitement of popular match-3 games while maintaining professional polish and smooth interactions.

---

## Overall Design Philosophy

### Core Principles

1. **Candy Paradise Aesthetic**
   - Bright, saturated colors that pop
   - Playful gradients with multiple color stops
   - Glossy, sugar-coated visual elements
   - Sparkling particle effects everywhere
   - Bouncy, delightful animations

2. **Modern Premium Feel**
   - Clean geometric shapes with rounded corners
   - Smooth gradient transitions
   - Layered depth with subtle shadows
   - Glass-morphism with candy tints
   - Professional typography hierarchy

3. **Dynamic & Alive**
   - Constantly moving background elements
   - Floating candy particles
   - Breathing glow effects
   - Interactive micro-animations
   - Smooth page transitions

4. **Mobile-First Perfection**
   - Finger-friendly touch targets
   - Swipe-friendly navigation
   - Performance-optimized animations
   - Telegram Mini App optimized

---

## Color Palette (Inspired by MegaSwap Logo)

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Cyan Primary** | `#00F5FF` | Primary brand color, buttons, highlights |
| **Hot Pink** | `#FF10F0` | Secondary brand color, accents, rewards |
| **Electric Purple** | `#B026FF` | Tertiary color, gradients, borders |
| **Neon Blue** | `#0099FF` | Cool accents, interactive states |
| **Sunshine Yellow** | `#FFE500` | Rewards, success states, coins |
| **Mint Green** | `#00FFB3` | Progress, success indicators |

### Background Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Deep Purple** | `#1A0B2E` | Primary background base |
| **Royal Purple** | `#2D1B4E` | Secondary background layers |
| **Dark Navy** | `#0A0E27` | Gradient endpoints |
| **Midnight Blue** | `#16213E` | Card backgrounds |

### Candy-Specific Colors

| Candy Type | Color 1 | Color 2 | Usage |
|------------|---------|---------|-------|
| **Cotton Candy** | `#FFB3E6` | `#FF69EB` | Pink candies, rewards |
| **Blueberry** | `#00D9FF` | `#0099FF` | Blue candies, coins |
| **Lemon Drop** | `#FFED4E` | `#FFC600` | Gold elements, currency |
| **Mint** | `#00FFB3` | `#00E6A8` | Success states, progress |
| **Grape** | `#D896FF` | `#B026FF` | Premium features |
| **Orange Fizz** | `#FFB366` | `#FF8C00` | Energy, boosts |

### Gradient Presets

```css
/* Primary Brand Gradient */
linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)

/* Candy Button Gradient */
linear-gradient(180deg, #FF10F0 0%, #B026FF 100%)

/* Background Gradient */
linear-gradient(160deg, #1A0B2E 0%, #2D1B4E 40%, #0A0E27 100%)

/* Reward Glow Gradient */
radial-gradient(circle, #FFE500 0%, #FF10F0 50%, transparent 70%)

/* Card Gradient */
linear-gradient(145deg, rgba(0,245,255,0.1) 0%, rgba(255,16,240,0.1) 100%)
```

---

## Typography System

### Font Families

**Primary Font:** "Poppins" (Modern, Friendly, Rounded)
- Headings, UI elements, buttons

**Secondary Font:** "Fredoka" (Playful, Bubbly)
- Display numbers, candy labels, fun elements

**Accent Font:** "Baloo 2" (Soft, Rounded)
- Special announcements, rewards

**Body Font:** "Inter" (Clean, Readable)
- Descriptions, body text

### Type Scale

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| **Hero Numbers** | Fredoka | 64px | 700 | Gradient |
| **Page Title** | Poppins | 32px | 700 | White |
| **Section Title** | Poppins | 24px | 600 | Cyan |
| **Card Title** | Poppins | 18px | 600 | White |
| **Body Large** | Inter | 16px | 500 | White/90 |
| **Body** | Inter | 14px | 400 | White/80 |
| **Small** | Inter | 12px | 400 | White/70 |
| **Tiny** | Inter | 10px | 500 | Cyan |

### Text Effects

- **Stroke outline** for important numbers (1px cyan or pink)
- **Drop shadow** for depth (0 2px 8px rgba(0,0,0,0.4))
- **Gradient text** for special elements
- **Glow effect** on hover states

---

## Dynamic Background System

### Multi-Layer Background

**Layer 1: Base Gradient**
- Deep purple to navy gradient (160deg)
- Animated color shift (subtle, 10s cycle)

**Layer 2: Floating Orbs**
- 5-7 large blurred circles
- Colors: cyan, pink, purple (low opacity 0.15)
- Slow floating animation (20-40s per orb)
- Different directions for each orb
- Blur: 120px

**Layer 3: Candy Particles**
- 20-30 small candy shapes
- Random positions
- Floating up animation (5-8s)
- Fade in/out effect
- Rotation during float
- Respawn at bottom when reaching top

**Layer 4: Sparkle Grid**
- Subtle dot pattern (2px dots)
- Cyan/pink dots with low opacity (0.05)
- Slight twinkle animation

**Layer 5: Gradient Overlay**
- Radial gradient from center
- Cyan to transparent (very subtle)
- Pulsing opacity (0.05 to 0.15, 8s cycle)

### Interactive Background

- Mouse/touch position creates subtle gradient shift
- Parallax effect on scroll (slight movement of orbs)
- Tap creates temporary sparkle burst at touch point
- Page transitions animate background elements

---

## Component Design System

### 1. Buttons

#### Primary CTA (Large)
```
Size: 56px height, full-width or min 200px
Background: Gradient (Candy Button Gradient)
Border: None
Border Radius: 28px (pill shape)
Shadow: 0 8px 24px rgba(255,16,240,0.4)
Text: White, 16px, 600 weight, Poppins
Icon: Optional left or right, 20px

Hover State:
- Scale: 1.05
- Shadow: 0 12px 32px rgba(255,16,240,0.6)
- Slight glow pulse

Active State:
- Scale: 0.98
- Haptic feedback (if supported)

Loading State:
- Spinning candy icon
- Text "Loading..."
```

#### Secondary Button
```
Size: 48px height
Background: Transparent
Border: 2px solid cyan gradient
Border Radius: 24px
Text: Cyan gradient, 14px, 600 weight
Shadow: 0 4px 16px rgba(0,245,255,0.2)

Hover: Border glow animation
```

#### Icon Button
```
Size: 44x44px
Background: Glass-morphism (white 10%, blur 12px)
Border: 1px solid white/20
Border Radius: 22px
Icon: 20px, white or gradient
Shadow: 0 4px 12px rgba(0,0,0,0.2)

Hover: Background white/20, scale 1.1
```

#### Floating Action Button
```
Size: 64x64px
Background: Radial gradient (pink to purple)
Border Radius: 32px
Shadow: 0 8px 24px rgba(255,16,240,0.5)
Icon: 28px, white
Position: Fixed bottom-right, 20px offset

Animation: Constant soft bounce (3s cycle)
Hover: Scale 1.1, rotate 5deg
```

### 2. Cards

#### Standard Card
```
Background: Glass-morphism
- Base: rgba(255,255,255,0.08)
- Backdrop blur: 20px
Border: 1px solid white/15
Border Radius: 24px
Padding: 20px
Shadow: 0 8px 32px rgba(0,0,0,0.3)

Gradient Overlay (optional):
- Linear gradient 145deg
- Cyan/pink tints at 5% opacity

Hover State:
- Transform: translateY(-4px)
- Shadow: 0 12px 48px rgba(0,0,0,0.4)
- Border glow: Animated gradient
```

#### Feature Card (Large)
```
Min Height: 200px
Background: Layered glass-morphism
- Inner glow: Candy gradient at 8% opacity
- Glass layer
- Border gradient animation (rotating hue)
Border Radius: 32px
Padding: 32px
Shadow: 0 12px 48px rgba(0,245,255,0.2)

Top Decoration:
- Floating candy icon
- Particle effects on hover

Content Layout:
- Icon/Image top (64px)
- Title (24px)
- Description (14px, white/70)
- Action button bottom
```

#### Reward Card
```
Background: Gradient background with animated shine overlay
Border: 2px solid gradient (animated)
Border Radius: 20px
Padding: 24px

Shine Animation:
- Diagonal linear gradient overlay
- Moving from left to right (2s)
- White gradient with opacity

Content:
- Large candy icon (96px)
- Reward amount (48px, gradient text)
- Claim button (gradient)
- Sparkle particles around edges
```

### 3. Navigation Bar

#### Bottom Navigation
```
Position: Fixed bottom, full width
Height: 72px
Background: Glass-morphism
- Base: rgba(26,11,46,0.95)
- Backdrop blur: 24px
Border Top: 1px solid cyan/20
Border Radius: 24px 24px 0 0
Shadow: 0 -8px 32px rgba(0,0,0,0.4)

Layout: 5 items, evenly spaced
Padding: 12px 16px

Nav Item:
- Icon: 24px
- Label: 10px, below icon
- Active color: Gradient (cyan to pink)
- Inactive color: White/40
- Active indicator: Small dot above icon (cyan, pulsing)

Interactions:
- Tap: Scale icon 1.2, bounce animation
- Active: Constant subtle glow
- Transition: 300ms ease-out
```

#### Top Header
```
Position: Fixed top, full width
Height: 64px
Background: Glass-morphism with gradient tint
Padding: 12px 20px
Border Bottom: 1px solid white/10

Layout: Left icon, center title, right actions

Title:
- Gradient text (brand gradient)
- 20px, 700 weight
- Drop shadow

Action Buttons:
- Icon only (wallet, settings, etc.)
- Glass-morphism background
- 36x36px, rounded full
```

### 4. Modals & Overlays

#### Full Modal
```
Overlay:
- Background: rgba(0,0,0,0.85)
- Backdrop blur: 12px
- Fade in animation (200ms)

Container:
- Width: 90%, max 480px
- Background: Layered glass-morphism
  - Base: rgba(26,11,46,0.98)
  - Gradient overlay (card gradient)
- Border: 1px solid gradient (animated pulse)
- Border Radius: 32px
- Padding: 32px 24px
- Shadow: 0 24px 64px rgba(255,16,240,0.4)

Close Button:
- Position: Absolute top-right
- 40x40px icon button
- Glass-morphism

Entry Animation:
- Scale from 0.9 to 1
- Fade in opacity
- Duration: 400ms ease-out
- Slight bounce at end

Particle Effects:
- Sparkles around modal edges on open
```

#### Toast Notification
```
Position: Top center, 16px from top
Width: Auto, max 90%
Height: Auto
Background: Glass-morphism (white/10)
Border: 1px solid gradient
Border Radius: 16px
Padding: 16px 20px
Shadow: 0 8px 24px rgba(0,0,0,0.3)

Layout:
- Icon left (success: mint, error: pink, info: cyan)
- Message center (14px, white)
- Close icon right

Entry Animation:
- Slide down from top with bounce
- Fade in

Exit Animation:
- Slide up with fade out

Auto-dismiss: 4 seconds
```

### 5. Input Fields

#### Text Input
```
Height: 56px
Background: Glass-morphism (white/5)
Border: 2px solid transparent
Border Radius: 16px
Padding: 16px 20px
Font: Inter, 16px, white

Placeholder:
- Color: white/40
- Font style: normal

Focus State:
- Border: 2px solid cyan gradient
- Glow: 0 0 16px rgba(0,245,255,0.3)
- Background: white/8

Label:
- Position: Above input, 8px spacing
- 12px, cyan, 600 weight
```

#### Number Input (Candy Amount)
```
Large display style
Height: 80px
Background: Gradient background (subtle)
Border: 2px solid gradient (animated)
Border Radius: 20px
Text: Fredoka, 36px, gradient text, centered
Icon: Candy icon left side

Plus/Minus Buttons:
- Position: Absolute left/right
- 44x44px circular buttons
- Gradient background
- Icons: 20px, white
```

### 6. Progress Indicators

#### Linear Progress Bar
```
Height: 12px
Width: 100%
Background: rgba(255,255,255,0.1)
Border Radius: 6px
Overflow: hidden

Fill:
- Background: Gradient (mint to cyan)
- Height: 100%
- Border Radius: 6px
- Animation: Smooth width transition (500ms)

Shine Effect:
- Animated gradient overlay moving left to right
- White gradient (0% to 30% opacity)
- Continuous animation (2s)

Label:
- Position: Above bar, right aligned
- 12px, mint color, 600 weight
- Format: "75% Complete"
```

#### Circular Progress (Level/League)
```
Size: 120px diameter
Stroke Width: 8px
Background Circle: rgba(255,255,255,0.1)
Progress Circle: Gradient stroke (animated)

Center Content:
- Level number (32px, gradient text)
- Level icon/badge (48px)

Animation:
- Progress fill: Smooth arc animation (1s)
- Rotation: Continuous slow spin (20s)
- Glow: Pulsing outer glow
```

### 7. Avatars & Badges

#### User Avatar
```
Size: 48px (default), 64px (large), 32px (small)
Shape: Circular
Border: 3px solid gradient (animated pulse)
Background: Gradient based on user ID/color
Shadow: 0 4px 12px rgba(0,0,0,0.3)

Content:
- User initials (2 letters, white, centered)
- Or user image

Online Indicator:
- 12px circle, bottom-right corner
- Background: mint green
- Border: 2px solid background color
- Pulsing animation
```

#### League Badge
```
Size: 64x64px
Background: Gradient specific to league
Border: 3px solid metallic effect
Border Radius: 16px (soft square)
Shadow: 0 6px 20px league-color/40

Content:
- League icon/emblem (40px)
- Subtle shine animation overlay

Glow Effect:
- Outer glow matching league color
- Pulsing animation (3s cycle)
```

#### Achievement Badge
```
Size: 56x56px
Shape: Circular with star points (custom SVG)
Background: Radial gradient (gold/pink)
Border: 2px solid white/50

Content:
- Achievement icon (32px)

Unlock Animation:
- Scale from 0 with rotation
- Particle burst effect
- Bounce settle
```

### 8. Lists & Items

#### Task/Mission Item
```
Height: Auto, min 80px
Background: Glass-morphism card
Padding: 16px
Border Radius: 16px
Border: 1px solid white/10
Shadow: 0 4px 16px rgba(0,0,0,0.2)

Layout (Horizontal):
- Icon container left (48x48px, gradient background)
- Content middle (flex-1)
  - Title (16px, white, 600)
  - Description (12px, white/70)
  - Reward amount (14px, cyan, 600)
- Action button right (CTA or checkmark)

Hover/Press:
- Background: white/12
- Transform: translateX(4px)

Completed State:
- Background: mint/10
- Border: 1px solid mint/30
- Checkmark icon (green gradient)
```

#### Leaderboard Item
```
Height: 72px
Background: Glass-morphism
Padding: 12px 16px
Border Radius: 12px
Margin: 8px 0

Layout:
- Rank badge left (32px circle, gradient)
- Avatar (48px)
- Name & score middle (flex-1)
- Medal icon right (if top 3)

Top 3 Special Styling:
- Rank 1: Gold gradient background, crown icon
- Rank 2: Silver gradient background
- Rank 3: Bronze gradient background

Current User Highlight:
- Border: 2px solid cyan gradient
- Glow: Pulsing cyan glow
- Slightly larger (scale 1.05)
```

### 9. Special Components

#### Tap/Click Circle (Main Game Element)
```
Size: 80vw (max 320px)
Shape: Perfect circle
Background: Layered design
- Base: Gradient (pink to purple)
- Middle: Glass overlay with candy texture
- Top: Animated shine gradient (moving)

Border:
- 4px solid white/30
- Animated rainbow gradient border (rotating)

Shadow:
- Large glow: 0 0 60px current-color/60
- Pulsing animation (2s cycle)

Center Icon:
- Large candy logo (60% of circle size)
- Slight rotation animation

Interaction:
- Press: Scale 0.95, intense glow burst
- Release: Bounce back with overshoot
- Sparkle particles emit from tap point
- "+1" floating number animation
```

#### Candy Counter Display
```
Height: 80px
Background: Glass-morphism with gradient
Border: 2px solid gradient (animated)
Border Radius: 20px
Padding: 16px 24px

Layout:
- Candy icon left (48px)
- Amount center (Fredoka, 36px, gradient text)
- Growth indicator (small graph or percentage)

Animation:
- Number increments with smooth counting animation
- Candy icon bounces on value change
- Subtle particle effects on background
```

#### Daily Reward Calendar
```
Grid: 7 days, 1 row
Gap: 12px
Each Day Cell:
- Size: 80x100px
- Background: Glass-morphism
- Border: 2px solid white/10
- Border Radius: 16px
- Padding: 12px

Day State - Locked:
- Background: white/5
- Lock icon: white/30
- Day number: white/30

Day State - Available:
- Background: Gradient (cyan/pink tints)
- Pulsing border animation
- Candy icon: full color
- Reward amount: gradient text

Day State - Claimed:
- Background: mint/10
- Checkmark icon: mint gradient
- Day number: mint color

Special Day 7:
- Larger size (120x140px)
- Enhanced gradient background
- Particle effects
- "MEGA REWARD" label
```

---

## Animation Library

### Entrance Animations

**Fade Up**
```
From: opacity 0, translateY(20px)
To: opacity 1, translateY(0)
Duration: 400ms
Easing: ease-out
```

**Scale In**
```
From: opacity 0, scale(0.8)
To: opacity 1, scale(1)
Duration: 300ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
```

**Slide In (from sides)**
```
From: translateX(-100%) [or 100%]
To: translateX(0)
Duration: 500ms
Easing: ease-out
```

**Sparkle Entry**
```
Combined animation:
- Scale: 0 to 1 with overshoot
- Rotation: 0 to 360deg
- Opacity: 0 to 1
- Particle burst on entry
Duration: 600ms
```

### Continuous Animations

**Floating (Gentle)**
```
Keyframes:
0%, 100%: translateY(0)
50%: translateY(-12px)
Duration: 3s
Easing: ease-in-out
Iteration: infinite
```

**Rotation (Slow)**
```
From: rotate(0deg)
To: rotate(360deg)
Duration: 20s
Easing: linear
Iteration: infinite
```

**Pulse Glow**
```
Keyframes:
0%, 100%: opacity(0.6), scale(1)
50%: opacity(1), scale(1.05)
Duration: 2s
Easing: ease-in-out
Iteration: infinite
```

**Shimmer/Shine**
```
Gradient position animation:
From: left -100%
To: left 200%
Duration: 2s
Easing: linear
Iteration: infinite
Delay: Random between 0-2s
```

**Rainbow Border**
```
Hue rotation:
From: hue-rotate(0deg)
To: hue-rotate(360deg)
Duration: 6s
Easing: linear
Iteration: infinite
```

### Interaction Animations

**Button Tap**
```
Press:
- Scale: 1 to 0.95
- Duration: 100ms
- Glow intensity increase

Release:
- Scale: 0.95 to 1.05 to 1 (bounce)
- Duration: 400ms
- Particle burst
- Haptic feedback
```

**Card Hover**
```
Transform: translateY(0) to translateY(-4px)
Shadow: Increase blur and spread
Border: Glow animation
Duration: 200ms
Easing: ease-out
```

**Tap Ripple**
```
Circular element at tap point:
- Scale: 0 to 2
- Opacity: 0.6 to 0
- Duration: 600ms
- Easing: ease-out
```

**Success Celebration**
```
Combined effects:
1. Confetti particles burst
2. Flash overlay (white, quick fade)
3. Scale bounce of element
4. Sound effect (optional)
5. Success toast appears
Duration: 1200ms total
```

### Particle Systems

**Sparkle Particles**
```
Element: Small stars/diamonds
Size: 4-12px
Color: Cyan, pink, yellow (random)
Behavior:
- Emit from point
- Float up and outward
- Fade out
- Rotate during flight
Lifetime: 1.5s
Count: 8-15 per burst
```

**Candy Particles (Background)**
```
Element: Small candy shapes
Size: 12-24px
Color: All candy colors (random)
Behavior:
- Start at bottom
- Float to top
- Gentle side-to-side drift
- Rotation
- Fade in at 0%, fade out at 90%
Lifetime: 5-8s (random)
Count: 20-30 on screen
Respawn: Continuous
```

**Coin Particles (Rewards)**
```
Element: Small coin icons
Size: 16px
Color: Gold gradient
Behavior:
- Arc trajectory from source to counter
- Rotation during flight
- Magnetize towards end point
- Scale up at start, down at end
Duration: 800ms
Count: 3-7 per reward
```

### Page Transitions

**Page Change**
```
Exit:
- Fade out: opacity 1 to 0
- Slide out: translateX(0) to translateX(-20px)
- Duration: 200ms

Enter:
- Fade in: opacity 0 to 1
- Slide in: translateX(20px) to translateX(0)
- Duration: 300ms
- Slight bounce at end
```

---

## Visual Effects System

### Glow Effects

**Primary Glow (Cyan)**
```
box-shadow: 
  0 0 20px rgba(0,245,255,0.4),
  0 0 40px rgba(0,245,255,0.2),
  0 0 80px rgba(0,245,255,0.1);

Animation: Pulse between 40% and 60% opacity, 2s cycle
```

**Secondary Glow (Pink)**
```
box-shadow: 
  0 0 20px rgba(255,16,240,0.4),
  0 0 40px rgba(255,16,240,0.2);

Animation: Pulse with slight color shift
```

**Success Glow (Mint)**
```
box-shadow: 
  0 0 24px rgba(0,255,179,0.5),
  0 0 48px rgba(0,255,179,0.3);
```

### Shadow Layers

**Depth Shadow (Cards)**
```
box-shadow: 
  0 4px 6px rgba(0,0,0,0.1),
  0 8px 16px rgba(0,0,0,0.2),
  0 16px 32px rgba(0,0,0,0.15);
```

**Floating Shadow**
```
box-shadow: 
  0 12px 24px rgba(0,0,0,0.2),
  0 24px 48px rgba(0,0,0,0.15);

Animation: Y-offset moves with floating animation
```

### Glass-morphism Specifications

**Light Glass**
```
background: rgba(255,255,255,0.1);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.2);
```

**Dark Glass**
```
background: rgba(26,11,46,0.8);
backdrop-filter: blur(24px);
border: 1px solid rgba(255,255,255,0.15);
```

**Candy Tinted Glass**
```
background: linear-gradient(
  145deg,
  rgba(0,245,255,0.1),
  rgba(255,16,240,0.1)
);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.2);
```

### Gradient Border Animation

```
Border element with gradient background
Gradient: Linear, 135deg, brand colors
Animation: 
- Rotate gradient angle: 0deg to 360deg
- Duration: 4s
- Linear timing
- Infinite iteration
```

### Texture Overlays

**Subtle Noise Texture**
```
Overlay on backgrounds
Opacity: 0.03
Pattern: Fine grain noise
Blend mode: overlay
```

**Candy Texture**
```
SVG pattern with small candy shapes
Opacity: 0.05
Scale: Small (8px)
Tiling: Repeat
Colors: Multi-color candy palette
```

---

## Page-Specific Designs

### 1. Loading Screen

**Design:**
- Full-screen gradient background (brand gradient, animated)
- Large Candy Forge logo center (128px)
- Rotating candy border around logo
- Loading text below with animated dots
- Sparkle particles floating around
- Progress bar at bottom (optional)

**Animations:**
- Logo: Gentle floating + glow pulse
- Border: Continuous rotation (4s)
- Particles: Floating up from bottom
- Dots: Blink sequence (1, 2, 3 dots)

**Duration:** 2-4 seconds

### 2. Home/Main Tap Screen

**Layout:**

**Header Section:**
- Glass-morphism header bar
- League badge left (with glow)
- Balance display center (large, gradient numbers)
- Wallet connect right (icon button)

**Main Content:**
- Large tap circle center (described above)
- Energy/tap counter below circle
- Progress bar for daily limit
- "Taps remaining: 834/1000" label

**Bottom Section (Above Nav):**
- Daily reward button (gradient, pulsing if available)
- Quick boost buttons row (3 buttons: 2x Speed, +10 Energy, Auto-Tap)

**Background:**
- Multi-layer animated background
- Floating candy particles
- Subtle grid pattern

**Special Effects:**
- Tap creates sparkle burst at touch point
- "+1" numbers float up on each tap
- Circle glows intensely on tap
- Background reacts to tap (subtle color pulse)
- Confetti burst on milestone taps (100, 500, 1000)

### 3. Tasks/Missions Screen

**Layout:**

**Header:**
- Page title "Missions" (gradient text)
- Filter chips (All, Social, Partners, Special)
- Active filter has gradient background

**Task List:**
- Vertical scrolling list
- Each task item as described in components
- Grouped by category with section headers

**Task Categories:**
- Daily Tasks (refreshes daily, cyan badge)
- Social Tasks (share/follow, pink badge)
- Partner Tasks (partnerships, purple badge)
- Special Events (limited time, gold badge)

**Empty State:**
- Cute candy illustration
- "All tasks completed!" message
- "Check back tomorrow" subtitle
- Confetti animation

**Interactions:**
- Task tap opens detail modal
- Swipe to reveal quick actions (if applicable)
- Pull to refresh with candy animation
- Completed tasks fade out with celebration

### 4. Leaderboard Screen

**Layout:**

**Header:**
- Page title "Leaderboard"
- Time period tabs (Daily, Weekly, All-Time)
- Active tab has gradient underline

**Top 3 Podium:**
- Special large cards for top 3
- Arranged in 2-3-1 order (2nd, 1st, 3rd)
- 1st place: Largest, gold gradient, crown icon
- 2nd place: Silver gradient, medal icon
- 3rd place: Bronze gradient, medal icon
- Animated trophy particles around 1st place

**Current User Card:**
- Pinned at top of list (if not in top 3)
- Highlighted with glowing border
- Shows current rank and points

**Leaderboard List:**
- Scrollable list starting from rank 4
- Items as described in components
- Lazy loading for performance

**Special Features:**
- Rank change indicators (↑↓ arrows with color)
- Point difference from next rank
- Mini avatar badges for achievements
- Smooth scroll to user button

### 5. Friends/Referral Screen

**Layout:**

**Header:**
- Cute illustration of candies sharing
- "Invite Friends" title
- Referral link display (with copy button)

**Reward Info Card:**
- Glass-morphism card
- Shows rewards for inviter and invitee
- Icons for each reward type
- Animated counter for total rewards earned

**Share Section:**
- Grid of social share buttons (6 platforms)
- Each button has platform color and icon
- Telegram, WhatsApp, Facebook, Twitter, Copy Link, More
- Tap animation on each button

**Friends List:**
- Section header "Your Squad (X friends)"
- List of referred friends
- Each item shows:
  - Avatar (gradient based on ID)
  - Name/username
  - Points earned
  - Date joined
  - Bonus badge if active

**Empty State:**
- Lonely candy illustration
- "No friends yet!" message
- "Tap to invite and earn rewards" CTA

**Special Features:**
- Leaderboard of top referrers
- Monthly referral contest banner
- Copy link success animation
- Confetti on friend join notification

### 6. Wallet/Airdrop Screen

**Layout:**

**Header:**
- Wallet illustration
- "My Wallet" title
- Connect TON wallet button (if not connected)

**Balance Cards:**
- Large card for main token (CANDY)
  - Gradient background
  - Token logo center
  - Balance (large, gradient text)
  - USD value below
  - Claim/Withdraw buttons

- Smaller cards for other tokens
  - Grid layout (2 columns)
  - Similar design, condensed

**Transaction History:**
- Section header "Recent Activity"
- List of transactions
- Each shows:
  - Type icon (earn, spend, claim, withdraw)
  - Description
  - Amount (+ or -)
  - Timestamp
  - Transaction status

**Connected Wallet Info:**
- Glass-morphism card
- Wallet address (truncated, with copy)
- Network badge (TON)
- Disconnect button

**Airdrop Timer (if active):**
- Countdown display (large, animated)
- Eligibility requirements checklist
- Estimated airdrop amount
- Pulsing gradient background

**Special Features:**
- Pull to refresh for balance update
- Transaction detail modal on tap
- Copy address animation
- Withdrawal flow with confirmation

### 7. Shop Screen

**Layout:**

**Header:**
- "Candy Shop" title (playful font)
- Balance display top-right
- Filter tabs (Boosters, Miners, Specials, Bundles)

**Shop Grid:**
- 2-column grid (mobile)
- 3-column grid (tablet/desktop)

**Shop Item Card:**
- Gradient background (based on rarity)
- Item image/icon (large, centered)
- Name (16px, bold)
- Description (12px, 2 lines max)
- Price display (gradient background pill)
- Purchase button (gradient CTA)
- "Best Value" badge (if applicable)
- Discount badge (if on sale)

**Item Rarity:**
- Common: Gray gradient
- Uncommon: Green gradient
- Rare: Blue gradient
- Epic: Purple gradient
- Legendary: Gold gradient
- Special: Rainbow gradient

**Purchase Flow:**
- Tap opens detail modal
- Modal shows:
  - Large item preview
  - Full description
  - Stats/benefits
  - Quantity selector (if applicable)
  - Total price
  - Confirm purchase button
- Success animation after purchase
- Item "floats" to inventory

**Special Features:**
- Limited-time offers section at top
- Daily deals rotation
- Bundle suggestions
- Owned items show checkmark badge
- Insufficient funds shows locked state with glow

### 8. Profile/Settings Screen

**Layout:**

**Profile Header:**
- Large avatar (with editing option)
- Username (editable)
- League badge
- Join date
- Total points earned

**Stats Grid:**
- 2x2 grid of stat cards
- Each shows:
  - Icon
  - Stat name
  - Value (large, gradient)
  - Trend indicator

Stats: Total Taps, Days Active, Rank, Referrals

**Achievements Section:**
- Horizontal scrolling carousel
- Each achievement:
  - Badge icon (locked/unlocked state)
  - Name
  - Progress bar (if in progress)
  - Unlock effect on achievement

**Settings List:**
- Grouped sections
- Each item:
  - Icon left
  - Label
  - Value/toggle right
  - Chevron if navigates

Sections:
- Account (Language, Notifications)
- Game (Sound, Haptics, Animations)
- Wallet (Connected wallets, Security)
- About (Version, Privacy, Terms, Support)

**Special Features:**
- Avatar editor modal
- Username change with availability check
- Theme customization options
- Sound preview on toggle
- Sign out confirmation

### 9. League/Ranking Details Screen

**Layout:**

**League Carousel:**
- Full-width horizontal scrolling
- Each league card:
  - Large gradient background (league color)
  - League emblem center (128px)
  - League name
  - Level requirement
  - Benefits list
  - Current users count
  - Leaderboard preview (top 3)

**Current League Highlight:**
- Card has special glow and scale
- "Current" badge
- Progress bar to next league

**Navigation:**
- Swipe to browse leagues
- Dot indicators below
- Previous/next arrows

**League Benefits:**
- List with icons
- Each benefit has checkmark
- Gradient text for premium benefits

**Promotion Animation:**
- Triggered when viewing next league
- Shows requirements clearly
- Progress indicators
- "X more points needed" message

### 10. Daily Reward Modal

**Design:**
- Full-screen overlay
- Dark background (rgba(0,0,0,0.9))
- Modal content:
  - Title "Daily Rewards"
  - 7-day calendar grid (as described above)
  - Current day highlighted
  - Claim button (large, gradient)
  - Streak counter ("5 Day Streak! 🔥")

**Claiming Animation:**
- Tap day card
- Card scale up with glow
- Reward amount flies to balance counter
- Confetti burst
- Success message
- Auto-dismiss after 2s

**Streak Rewards:**
- Day 7 mega reward shows particle effects
- Streak multiplier badge
- Next reward preview

### 11. Boost/Power-up Modal

**Design:**
- Modal overlay (as described in components)
- Boost selection grid (2 or 3 columns)

**Boost Card:**
- Icon at top
- Boost name
- Duration/quantity info
- Current level
- Upgrade cost
- Activate/Upgrade button

**Boost Types:**
- 2x Speed (clock icon, cyan)
- +10 Energy (lightning, yellow)
- Auto-Tap (robot, purple)
- Lucky Bonus (clover, green)
- Mega Multiplier (star, pink)

**Active Boosts:**
- Separate section at top
- Shows remaining time
- Countdown timer
- Cancel option (if applicable)

**Purchase Flow:**
- Confirmation dialog
- Shows before/after stats
- Activate animation
- Particle effect on activation

---

## Micro-interactions Catalog

### 1. Number Counter Animation
When balance/score increases:
- Numbers roll up smoothly
- Duration: 800ms
- Easing: ease-out
- Each digit animates independently

### 2. Pull to Refresh
- Pull down gesture
- Candy spinner appears
- Spins while loading
- Bounces on release
- Success checkmark on complete

### 3. Haptic Feedback Points
- Tap on main circle: Medium impact
- Button press: Light impact
- Success action: Success notification
- Error: Error notification
- Level up: Heavy impact

### 4. Loading States
- Skeleton screens with shimmer
- Spinning candy icons
- Progress bars with candy movement
- Pulsing placeholder cards

### 5. Error States
- Shake animation for invalid input
- Red glow pulse for errors
- Error icon bounce in
- Error message fade up

### 6. Success States
- Checkmark scale in with bounce
- Green glow pulse
- Confetti burst
- Success message slide up

### 7. Empty States
- Cute illustration (candy themed)
- Descriptive message
- CTA button
- Subtle animation on illustration

### 8. Swipe Gestures
- Swipe left on task: Reveal quick actions
- Swipe right on task: Mark complete (if applicable)
- Swipe up/down on modals: Dismiss
- Smooth motion with resistance

---

## Responsive Behavior

### Mobile (320px - 479px)
- Single column layouts
- 16px side padding
- 12px gap between items
- Font size: Base scale
- Touch targets: Minimum 44x44px
- Bottom nav: Always visible
- Modals: 95% width

### Tablet (480px - 767px)
- 2-column grids where applicable
- 20px side padding
- 16px gap between items
- Slightly larger fonts (+1px)
- Same touch targets
- Bottom nav: Wider spacing

### Desktop/Telegram Desktop (768px+)
- Centered layout (max-width 507px for TMA)
- 3-column grids in shop
- 24px side padding
- Hover states fully active
- Cursor: pointer on interactive elements
- Subtle hover animations

---

## Performance Optimizations

### Animation Performance
- Use `transform` and `opacity` only (GPU accelerated)
- `will-change` property on animated elements
- Limit concurrent animations to 10
- Use `requestAnimationFrame` for custom animations
- Debounce scroll events

### Asset Loading
- Lazy load images below fold
- Use WebP format with fallbacks
- Compress images to <100KB
- Load critical CSS inline
- Defer non-critical scripts

### Rendering Performance
- Virtual scrolling for long lists (500+ items)
- Memoize React components
- Batch state updates
- Use CSS containment for cards
- Limit backdrop-blur usage to visible elements

---

## Accessibility Enhancements

### Color Contrast
- Ensure 4.5:1 contrast ratio for text
- Use patterns in addition to color for states
- Provide alternative text for icons

### Touch Targets
- Minimum 44x44px
- 8px spacing between targets
- Visible focus states

### Screen Reader Support
- Semantic HTML
- ARIA labels on icon buttons
- Status announcements for dynamic content
- Proper heading hierarchy

### Keyboard Navigation
- Tab through interactive elements
- Enter to activate
- Escape to close modals
- Arrow keys for carousels

---

## Sound Design (Optional)

### Sound Effects
- Tap: Light "pop" sound (50ms)
- Reward claim: "Ding" with echo (800ms)
- Level up: Fanfare (1500ms)
- Error: Subtle "bonk" (100ms)
- Success: Chime (300ms)
- Background: Subtle ambient music (optional, toggle)

### Implementation
- Web Audio API
- Preload critical sounds
- Volume control in settings
- Mute option
- Respect system audio settings

---

## Final Polish Checklist

- [ ] All animations run at 60fps
- [ ] No layout shift on page load
- [ ] Loading states for all async operations
- [ ] Error handling with friendly messages
- [ ] Success feedback for all actions
- [ ] Consistent spacing throughout
- [ ] All touch targets meet size requirements
- [ ] Color contrast meets WCAG AA
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Works in Telegram app
- [ ] Tested on slow networks (3G)
- [ ] Offline state handled gracefully

---

## Summary

This design system transforms your app into **Candy Forge** - a modern, vibrant, and delightful gaming experience that feels premium yet playful. The cyan and pink color scheme creates energy and excitement, while glass-morphism and smooth animations provide a contemporary feel. Every interaction is designed to bring joy and satisfaction, encouraging users to engage more with the app.

The design maintains professional polish while embracing the fun, candy-themed aesthetic. Dynamic backgrounds, particle effects, and satisfying micro-interactions create an immersive experience that stands out in the Telegram Mini App ecosystem.