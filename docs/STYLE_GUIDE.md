# Style Guide

## Color Tokens
### Background Colors
- `--bg-primary`: #13171F (main background)
- `--bg-surface`: #1A1F2E (card backgrounds)
- `--bg-surface-elevated`: #212738 (elevated surfaces)

### Text Colors
- `--text-primary`: #FFFFFF (main text)
- `--text-secondary`: #B8BCC8 (secondary text)
- `--text-muted`: #9CA3AF (muted/disabled text)

### Accent Colors
- `--accent-cyan`: #00F2FE (primary accent)
- `--accent-blue`: #0A84FF (secondary accent)
- `--gradient-primary`: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)

### Border Colors
- `--border-subtle`: rgba(255, 255, 255, 0.1)
- `--border-accent`: rgba(0, 242, 254, 0.3)

### Effect Colors
- `--glow-cyan`: rgba(0, 242, 254, 0.15)
- `--glow-blue`: rgba(10, 132, 255, 0.15)

## Typography
### Font Families
- **Headings**: 'Montserrat', sans-serif
- **Body**: 'Inter', sans-serif
- **Icons**: Font Awesome 6

### Font Sizes
- 🟡 TODO - Define size scale
- **Hero Heading**: 4xl md:5xl lg:6xl
- **Section Heading**: 3xl md:4xl lg:5xl
- **Card Heading**: lg to 2xl
- **Body**: base (default)
- **Small**: sm
- **Extra Small**: xs

### Font Weights
- **Headings**: 700-900 (bold to black)
- **Subheadings**: 600 (semibold)
- **Body**: 400 (regular)
- **Light**: 300

## Spacing
### Container
- Max Width: 1200px (container class)
- Padding: 20px (px-4 on mobile)

### Section Padding
- Small: py-8 md:py-12
- Medium: py-12 md:py-16
- Large: py-16 md:py-20

### Component Spacing
- Card Padding: p-4 (small), p-6 (medium), p-8 (large)
- Form Elements: space-y-4 or space-y-6
- Grid Gaps: gap-4, gap-6, gap-8

## Border Radius
- Buttons: rounded-full (50px)
- Cards: rounded-2xl (20px)
- Inputs: rounded-lg (10px)
- Small elements: rounded (default)

## Effects
### Shadows
- Card Shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
- Hover Shadow: 0 12px 40px rgba(0, 0, 0, 0.4)
- Glow Effect: 0 0 20px var(--glow-cyan)

### Transitions
- Default: transition-all duration-300 ease
- Hover Scale: hover:scale-105
- Hover Translate: hover:-translate-y-1

### Backdrop Effects
- Blur: backdrop-blur-lg (25px)
- Saturate: saturate(200%)

## Component Styles
### Buttons
- **Primary**: gradient-primary text-white rounded-full
- **Secondary**: border-2 border-accent bg-transparent
- **Ghost**: bg-white/5 hover:bg-white/10

### Cards
- Background: gradient from surface-elevated to surface
- Border: 1px solid border-subtle
- Hover: transform + glow effect

### Forms
- Input Background: bg-white/5
- Input Border: border-white/10
- Focus State: border-cyan-400 + outline-none

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Animations
### Defined Keyframes
- `float`: Vertical floating motion
- `gentle-float`: Subtle vertical motion
- `glow-pulse`: Pulsing glow effect
- `coin-spin`: 360° Y-axis rotation

### Animation Classes
- `.float-animation`: 3s ease-in-out infinite
- `.gentle-float-animation`: 4s ease-in-out infinite
- `.glow-pulse`: 2s ease-in-out infinite

## Icons
- Size: text-xs to text-3xl
- Colors: Match accent colors or text-muted
- Source: Font Awesome 6 (free tier)

## Z-Index Scale
- 🟡 TODO - Define z-index hierarchy
- Header: z-50 (fixed)
- Modals: z-9999
- Overlays: z-40
- Dropdowns: z-30