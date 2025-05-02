# Charandeep Kapoor - Personal Portfolio - LLM Documentation

This document provides a comprehensive overview of the codebase for LLMs to understand and work with the project effectively.

## Project Overview

This is the personal portfolio website of Charandeep Kapoor, built with React, TypeScript, and Tailwind CSS, showcasing expertise in crypto, finance, and mathematics. The website is deployed at charandeepkapoor.com and features a modern, responsive design with interactive elements and animations.

## Key Components

### 1. Core Application Structure

- **App.tsx**: Main application component that sets up:
  - React Query for data fetching
  - React Router for navigation
  - UI providers (Tooltip, Toaster)
  - Main routing structure

- **Index.tsx**: Main page component that:
  - Manages SEO meta tags
  - Handles section animations
  - Implements floating particles
  - Composes all main sections

### 2. Main Sections

#### Hero Section
- Location: `src/components/Hero.tsx`
- Purpose: Landing section with main introduction
- Features:
  - Animated text
  - Background effects
  - Call-to-action elements

#### About Section
- Location: `src/components/About.tsx`
- Purpose: Professional introduction and overview
- Content: Brief bio and key expertise areas

#### Experience Section
- Location: `src/components/Experience.tsx`
- Purpose: Professional experience showcase
- Features:
  - Timeline of work experience
  - Key achievements
  - Skills and technologies

#### Academic Section
- Location: `src/components/Academic.tsx`
- Purpose: Educational background
- Content: Degrees, certifications, and academic achievements

#### Personal Section
- Location: `src/components/Personal.tsx`
- Purpose: Personal interests and projects
- Features: Hobbies, side projects, and personal achievements

#### Contact Section
- Location: `src/components/Contact.tsx`
- Purpose: Contact information and form
- Features:
  - Contact form
  - Social media links
  - Direct contact information

### 3. UI Components

#### Sidebar
- Location: `src/components/Sidebar.tsx`
- Purpose: Navigation and quick access
- Features:
  - Section navigation
  - Social media links
  - Theme toggle

#### CryptoWidget
- Location: `src/components/CryptoWidget.tsx`
- Purpose: Display crypto-related information
- Features:
  - Price information
  - Market data
  - Interactive elements

## Technical Implementation Details

### Styling System
- Uses Tailwind CSS for styling
- Custom color scheme with crypto-themed colors
- Responsive design breakpoints
- Animation classes and utilities

### State Management
- React Query for data fetching
- Local state for UI interactions
- Context for theme management

### Performance Optimizations
- Lazy loading of components
- Optimized animations using IntersectionObserver
- Efficient CSS with Tailwind's JIT compiler

### SEO Implementation
- Dynamic meta tags
- Semantic HTML structure
- Optimized content structure
- Custom domain (charandeepkapoor.com)

## Key Dependencies

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- React Router
- Radix UI

## Development Guidelines

1. **Component Structure**
   - Use functional components
   - Implement TypeScript interfaces
   - Follow atomic design principles

2. **Styling**
   - Use Tailwind CSS classes
   - Maintain consistent spacing
   - Follow the design system

3. **Performance**
   - Optimize images and assets
   - Use lazy loading where appropriate
   - Minimize re-renders

4. **Accessibility**
   - Use semantic HTML
   - Implement ARIA attributes
   - Ensure keyboard navigation

## Common Patterns

1. **Section Animation**
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );
}, []);
```

2. **Floating Particles**
```typescript
const setupBackgroundParticles = () => {
  const colors = ['#8B5CF6', '#6366F1', '#8B5CF6'];
  const count = 5;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    // Particle styling and animation setup
  }
};
```

## Best Practices

1. **Code Organization**
   - Keep components small and focused
   - Use meaningful file and component names
   - Maintain consistent file structure

2. **Type Safety**
   - Use TypeScript interfaces
   - Avoid any types
   - Implement proper type checking

3. **Performance**
   - Use React.memo for pure components
   - Implement proper cleanup in useEffect
   - Optimize re-renders

4. **Testing**
   - Write unit tests for components
   - Test user interactions
   - Ensure accessibility compliance 