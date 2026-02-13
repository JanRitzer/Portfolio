# Developer Portfolio Design Guidelines

## Design Approach
**Style**: Dark Mode, Minimalist, Professional with Glassmorphism aesthetics  
**Color Scheme**:
- Background: Deep slate/navy (#0c1425)
- Text: Light gray/off-white
- Primary Accent: Teal/Cyan (#0d9488)
- Secondary Accent: Warm amber (#f59e0b)
- Glass effects: `backdrop-blur` with semi-transparent backgrounds

## Layout Structure

### 1. Navbar
- **Position**: Fixed top with glassmorphism effect (`backdrop-blur`)
- **Elements**: Logo/Name, Navigation links (Home, Projects, About, Contact), "Download CV" CTA button
- **Styling**: Semi-transparent background with blur, subtle border

### 2. Hero Section
- **Typography**: Large, bold headline introducing developer identity
- **CTAs**: Two buttons - "View Work" (primary) and "Watch Intro" (secondary that triggers video modal)
- **Background**: No large hero image, focus on typography and glassmorphism effects

### 3. Tech Stack Marquee
- **Layout**: Horizontal auto-scrolling band
- **Content**: Technology icons (React, Swift, Python, Node.js, etc.) using Lucide React icons
- **Animation**: Infinite smooth scroll

### 4. Projects Showcase (Critical)
- **Layout**: Responsive grid (1 column mobile, 2-3 columns desktop)
- **Card Components**:
  - High-quality thumbnail image at top
  - Project title (bold, prominent)
  - Short description text
  - Tech stack tags (#SwiftUI, #AI, etc.) as colored badges
  - Two action buttons: "Watch Demo" (opens video modal), "GitHub/Code" link
- **Hover Effects**: Slight scale-up (1.05) with elevated shadow
- **Card Styling**: Glassmorphism cards with semi-transparent backgrounds and borders

### 5. About Section
- **Layout**: Two-column split (text left, profile picture right on desktop; stacked on mobile)
- **Content**: Developer bio, skills, experience
- **Visual**: Profile picture placeholder with glassmorphism frame

### 6. Footer
- **Content**: Social links (LinkedIn, GitHub icons), copyright text
- **Styling**: Minimalist, centered or split layout

## Interactive Elements

### Video Modal Component
- **Trigger**: "Watch Intro" button in hero, "Watch Demo" buttons on project cards
- **Design**: Full-screen overlay with dark semi-transparent background
- **Player**: Standard HTML5 video or lightweight player component
- **Controls**: Close button (X) in top-right corner
- **Video sources**: Stored in centralized data file

## Typography & Spacing
- **Hierarchy**: Use distinct font sizes for headings (text-4xl to text-6xl), body (text-base to text-lg), small text (text-sm)
- **Spacing**: Consistent Tailwind spacing units (4, 6, 8, 12, 16, 24, 32) for padding and margins
- **Font**: Modern sans-serif (system fonts or Google Fonts like Inter/Poppins)

## Animation Strategy
- **Scroll Animations**: Framer Motion fade-in-up effects as elements enter viewport
- **Hover Effects**: Subtle scale and shadow transitions on cards and buttons
- **Page Transitions**: Smooth, minimal animations - avoid excessive motion
- **Marquee**: Continuous smooth scroll without jarring resets

## Data Architecture
- **Central Data File**: `constants/index.js` or `data.js`
- **Structure**: Array of project objects containing: title, description, thumbnail URL, video URL, tech tags, GitHub link
- **Benefit**: Easy content updates without touching component code

## Images
**Profile Picture**: Placeholder in About section (circular or rounded rectangle frame with glassmorphism border)  
**Project Thumbnails**: Required for each project card - high-quality screenshots/previews  
**Hero Section**: No large background image - typography-focused with glassmorphism effects

## Accessibility
- Maintain keyboard navigation for all interactive elements
- Ensure sufficient color contrast for text readability
- Include proper ARIA labels for video modals and buttons