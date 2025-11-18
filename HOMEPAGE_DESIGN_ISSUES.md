# Homepage Design Issues Analysis

**Date:** Generated after Phase 2 completion  
**Status:** Comprehensive review of all homepage sections

---

## 🔴 CRITICAL ISSUES (Must Fix Immediately)

### 1. **Hero Section - Animation Not Working**
- **Location:** `HeroSection.tsx:25`
- **Issue:** `animate-fade-in-up` class is used but animation may not trigger on initial load
- **Impact:** Hero content may appear abruptly without smooth entrance
- **Fix:** Ensure animation triggers on mount or use `useScrollReveal` hook

### 2. **WhyAltairSection - Multiple Hook Instances in Loop**
- **Location:** `WhyAltairSection.tsx:38`
- **Issue:** `useScrollReveal` is called inside `.map()` loop, creating multiple hook instances
- **Impact:** React Hook rules violation, potential performance issues
- **Fix:** Move hook outside loop or use a single observer for all items

### 3. **ProductsCarousel - Scroll Position State Not Synced**
- **Location:** `ProductsCarousel.tsx:47-64`
- **Issue:** `scrollPosition` state doesn't sync with actual scroll position
- **Impact:** Navigation buttons may not work correctly after manual scrolling
- **Fix:** Use `onScroll` event listener to sync state with actual scroll position

### 4. **Footer CTA - Form Has No Functionality**
- **Location:** `FooterCTASection.tsx:20-55`
- **Issue:** Form has no `onSubmit` handler, no validation, no success/error states
- **Impact:** Form is non-functional, poor UX
- **Fix:** Add form submission handler, validation, loading states, success/error feedback

### 5. **Header - Logo May Not Display Properly**
- **Location:** `Header/Component.client.tsx:39`
- **Issue:** Logo uses `invert dark:invert-0` which may cause visibility issues
- **Impact:** Logo may not be visible on certain backgrounds
- **Fix:** Ensure logo has proper variants for light/dark themes

### 6. **Footer - CMSLink Dependency**
- **Location:** `Footer/Component.tsx:94`
- **Issue:** Uses `CMSLink` which requires CMS data, may break without backend
- **Impact:** Footer navigation may not work in frontend-only mode
- **Fix:** Add fallback to regular `Link` component or handle missing data gracefully

---

## 🟠 HIGH PRIORITY ISSUES (Fix Soon)

### 7. **TrustSignalsBar - Placeholder Emojis**
- **Location:** `TrustSignalsBar.tsx:15-21`
- **Issue:** Using emoji placeholders (🏥) instead of actual client logos
- **Impact:** Unprofessional appearance, doesn't build trust
- **Fix:** Replace with actual logo images or proper placeholder images

### 8. **ProductsCarousel - Navigation Button Positioning**
- **Location:** `ProductsCarousel.tsx:81-96`
- **Issue:** Navigation buttons use `absolute` positioning with negative transforms that may overlap content
- **Impact:** Buttons may be cut off or overlap carousel items on smaller screens
- **Fix:** Use relative positioning or adjust container padding to accommodate buttons

### 9. **ProductsCarousel - No Keyboard Navigation**
- **Location:** `ProductsCarousel.tsx:100-110`
- **Issue:** Carousel doesn't support keyboard navigation (arrow keys, tab)
- **Impact:** Accessibility issue, poor UX for keyboard users
- **Fix:** Add keyboard event handlers and proper ARIA attributes

### 10. **ProductsCarousel - No Touch/Swipe Support**
- **Location:** `ProductsCarousel.tsx:100-110`
- **Issue:** No touch/swipe gestures for mobile devices
- **Impact:** Poor mobile UX, users must use scrollbar
- **Fix:** Add touch event handlers or use a carousel library

### 11. **EventsSection - Featured Event Grid Layout**
- **Location:** `EventsSection.tsx:110-124` & `event-card.tsx:40`
- **Issue:** Featured event uses `md:col-span-2` which may break grid on certain screen sizes
- **Impact:** Layout may look unbalanced or break on tablet sizes
- **Fix:** Ensure grid layout handles featured items properly across all breakpoints

### 12. **EventsSection - Toggle Buttons Accessibility**
- **Location:** `EventsSection.tsx:86-107`
- **Issue:** Toggle buttons lack proper ARIA attributes (`aria-pressed`, `aria-label`)
- **Impact:** Screen reader users may not understand button states
- **Fix:** Add proper ARIA attributes and keyboard navigation

### 13. **TestimonialsSection - No Auto-play Option**
- **Location:** `TestimonialsSection.tsx:38-47`
- **Issue:** Testimonials carousel doesn't auto-advance
- **Impact:** Users may miss testimonials, less engaging
- **Fix:** Add optional auto-play with pause on hover (with user preference)

### 14. **TestimonialsSection - Navigation Accessibility**
- **Location:** `TestimonialsSection.tsx:75-105`
- **Issue:** Navigation buttons and dots lack proper ARIA labels
- **Impact:** Screen reader users can't navigate testimonials
- **Fix:** Add `aria-label`, `aria-controls`, and proper role attributes

### 15. **WhatWeDoSection - Check Mark Symbol**
- **Location:** `WhatWeDoSection.tsx:81`
- **Issue:** Uses plain text "✓" which may not render consistently
- **Impact:** May not display correctly on all browsers/devices
- **Fix:** Use icon component (e.g., `CheckCircle2` from lucide-react) or proper Unicode

### 16. **WhatWeDoSection - Stagger Animation Not Working**
- **Location:** `WhatWeDoSection.tsx:68-69`
- **Issue:** `animate-stagger-1` class with inline `animationDelay` may conflict
- **Impact:** Stagger effect may not work as intended
- **Fix:** Use consistent animation approach (either CSS class or inline style, not both)

---

## 🟡 MEDIUM PRIORITY ISSUES (Improve UX)

### 17. **Hero Section - Scroll Indicator Too Subtle**
- **Location:** `HeroSection.tsx:57-62`
- **Issue:** Scroll indicator uses low opacity and may be hard to see
- **Impact:** Users may not notice it, missing scroll affordance
- **Fix:** Increase visibility or add text hint

### 18. **Hero Section - Background Image Alt Text**
- **Location:** `HeroSection.tsx:12-18`
- **Issue:** Background image has alt text but it's decorative
- **Impact:** Screen readers will announce it unnecessarily
- **Fix:** Use `alt=""` for decorative images or `role="presentation"`

### 19. **WhyAltairSection - Image Aspect Ratios**
- **Location:** `WhyAltairSection.tsx:48-55`
- **Issue:** Images use `h-64 md:h-96` which may cause inconsistent aspect ratios
- **Impact:** Images may look stretched or cropped awkwardly
- **Fix:** Use consistent aspect ratios with `aspect-ratio` CSS or fixed dimensions

### 20. **WhyAltairSection - Reverse Layout on Mobile**
- **Location:** `WhyAltairSection.tsx:43-44`
- **Issue:** `md:flex-row-reverse` only applies on medium+ screens, mobile always shows image first
- **Impact:** May not match intended design on mobile
- **Fix:** Ensure mobile layout matches design intent

### 21. **ProductsCarousel - No Loading States**
- **Location:** `ProductsCarousel.tsx:105-109`
- **Issue:** No skeleton/loading state while images load
- **Impact:** Layout shift when images load, poor perceived performance
- **Fix:** Add skeleton loaders or image placeholders

### 22. **EventCard - Date Formatting**
- **Location:** `event-card.tsx:64-66`
- **Issue:** Date range displayed as-is without formatting
- **Impact:** May not be consistent or user-friendly
- **Fix:** Format dates consistently (e.g., "Dec 12-14, 2025")

### 23. **EventCard - Featured Badge Overlap**
- **Location:** `event-card.tsx:54-58`
- **Issue:** Featured badge and event type badge may overlap on small cards
- **Impact:** Badges may be hard to read
- **Fix:** Adjust positioning or stack badges vertically

### 24. **ProjectCard - Button in Overlay**
- **Location:** `project-card.tsx:33-38`
- **Issue:** "View Case Study" button only appears on hover
- **Impact:** Users may not discover the CTA
- **Fix:** Consider always-visible button or more prominent hover state

### 25. **ComplianceBlock - Icon Size on Mobile**
- **Location:** `ComplianceBlock.tsx:27-28`
- **Issue:** Icons are `w-16 h-16` which may be too large on mobile
- **Impact:** Grid may look cramped on small screens
- **Fix:** Use responsive sizing (e.g., `w-12 h-12 md:w-16 md:h-16`)

### 26. **ComplianceBlock - Grid Responsiveness**
- **Location:** `ComplianceBlock.tsx:21`
- **Issue:** `grid-cols-2` may be too cramped on mobile
- **Impact:** Content may be hard to read on small screens
- **Fix:** Consider single column on mobile or adjust spacing

### 27. **TestimonialsSection - Quote Icon Too Subtle**
- **Location:** `TestimonialsSection.tsx:62`
- **Issue:** Quote icon uses `opacity-20` which makes it very faint
- **Impact:** Decorative element may not be visible
- **Fix:** Increase opacity or use brand color with low opacity

### 28. **FooterCTASection - Form Field Styling**
- **Location:** `FooterCTASection.tsx:22-46`
- **Issue:** Form fields use `bg-white/10` which may have poor contrast
- **Impact:** Text may be hard to read, accessibility issue
- **Fix:** Ensure WCAG AA contrast ratio (4.5:1 for normal text)

### 29. **FooterCTASection - No Form Validation Feedback**
- **Location:** `FooterCTASection.tsx:20-55`
- **Issue:** No visual feedback for invalid fields
- **Impact:** Users don't know what's wrong with their input
- **Fix:** Add validation messages and error states

### 30. **Header - Mobile Navigation Missing**
- **Location:** `Header/Component.client.tsx:41-42`
- **Issue:** No hamburger menu or mobile navigation visible in code
- **Impact:** Navigation may not work on mobile devices
- **Fix:** Add responsive mobile menu component

### 31. **Footer - Theme Selector Placement**
- **Location:** `Footer/Component.tsx:91`
- **Issue:** Theme selector in footer may not be intuitive
- **Impact:** Users may not find theme toggle
- **Fix:** Consider moving to header or making more prominent

---

## 🟢 LOW PRIORITY ISSUES (Polish & Enhancement)

### 32. **Hero Section - CTA Button Sizes**
- **Location:** `HeroSection.tsx:36-53`
- **Issue:** Buttons use `text-lg px-8 py-6` which may be inconsistent with design system
- **Impact:** Minor visual inconsistency
- **Fix:** Use standard button sizes from design system

### 33. **TrustSignalsBar - Badge Colors**
- **Location:** `TrustSignalsBar.tsx:48`
- **Issue:** Badges use `border-deep-teal text-deep-teal` which may not match brand
- **Impact:** Minor brand consistency issue
- **Fix:** Use brand colors (navy/bronze) for consistency

### 34. **WhatWeDoSection - Icon Background**
- **Location:** `WhatWeDoSection.tsx:72`
- **Issue:** Icon background uses `bg-brand-bronze/10` which may be too subtle
- **Impact:** Icons may not stand out enough
- **Fix:** Adjust opacity or use solid background

### 35. **ProductsCarousel - Product Card Spacing**
- **Location:** `ProductsCarousel.tsx:106`
- **Issue:** Cards use `w-80` fixed width which may not be responsive
- **Impact:** May not work well on all screen sizes
- **Fix:** Use responsive width or min-width

### 36. **FeaturedProjectsSection - Header Layout**
- **Location:** `FeaturedProjectsSection.tsx:49-60`
- **Issue:** Header uses `flex justify-between` which may not work well on mobile
- **Impact:** Button may wrap awkwardly on small screens
- **Fix:** Stack vertically on mobile

### 37. **EventsSection - Empty State Missing**
- **Location:** `EventsSection.tsx:110-124`
- **Issue:** No handling for empty events array
- **Impact:** May show empty section if no events
- **Fix:** Add empty state message

### 38. **ComplianceBlock - Link Arrow**
- **Location:** `ComplianceBlock.tsx:48`
- **Issue:** Link uses `→` character which may not render consistently
- **Impact:** Minor rendering issue
- **Fix:** Use icon component or CSS arrow

### 39. **TestimonialsSection - Testimonial Length**
- **Location:** `TestimonialsSection.tsx:64-66`
- **Issue:** Long testimonials may overflow or look cramped
- **Impact:** Text may be hard to read
- **Fix:** Add max-height with scroll or truncate with "read more"

### 40. **FooterCTASection - Section Title**
- **Location:** `FooterCTASection.tsx:13-15`
- **Issue:** Title "Ready to Start Your Project?" may be too generic
- **Impact:** Less engaging than it could be
- **Fix:** Consider more specific, action-oriented copy

### 41. **General - No Error Boundaries**
- **Location:** All components
- **Issue:** No React error boundaries to catch component errors
- **Impact:** One component error can crash entire page
- **Fix:** Add error boundaries at section level

### 42. **General - No Loading States**
- **Location:** All image components
- **Issue:** Images load without loading indicators
- **Impact:** Layout shift and poor perceived performance
- **Fix:** Add skeleton loaders or blur placeholders

### 43. **General - No SEO Metadata**
- **Location:** `page.tsx`
- **Issue:** Homepage has no specific metadata
- **Impact:** Poor SEO performance
- **Fix:** Add title, description, Open Graph tags

### 44. **General - No Focus Management**
- **Location:** All interactive components
- **Issue:** No visible focus indicators or focus management
- **Impact:** Keyboard navigation may be confusing
- **Fix:** Ensure all interactive elements have visible focus states

### 45. **General - Color Contrast Issues**
- **Location:** Multiple components
- **Issue:** Some text/background combinations may not meet WCAG AA
- **Impact:** Accessibility compliance issue
- **Fix:** Audit and fix all contrast ratios (4.5:1 for normal text, 3:1 for large text)

---

## 📊 SUMMARY BY CATEGORY

### **Accessibility Issues:** 8
- Missing ARIA labels
- Keyboard navigation gaps
- Color contrast problems
- Focus management issues

### **Responsive Design Issues:** 6
- Mobile navigation missing
- Breakpoint inconsistencies
- Touch/swipe support missing
- Layout issues on small screens

### **Performance Issues:** 4
- No loading states
- Image optimization gaps
- Layout shift problems
- Animation performance

### **Functionality Issues:** 5
- Non-functional forms
- State synchronization problems
- Missing error handling
- Hook usage violations

### **Design Consistency Issues:** 7
- Brand color inconsistencies
- Spacing inconsistencies
- Typography inconsistencies
- Component variant mismatches

### **UX Issues:** 15
- Missing feedback states
- Poor discoverability
- Incomplete interactions
- Empty states missing

---

## 🎯 RECOMMENDED FIX PRIORITY

### **Week 1 (Critical)**
1. Fix React Hook violations (WhyAltairSection)
2. Add form functionality (FooterCTASection)
3. Fix scroll position sync (ProductsCarousel)
4. Add mobile navigation (Header)
5. Replace placeholder emojis (TrustSignalsBar)

### **Week 2 (High Priority)**
6. Add keyboard navigation (ProductsCarousel, EventsSection)
7. Add touch/swipe support (ProductsCarousel)
8. Fix accessibility issues (ARIA labels, focus states)
9. Add loading states (all image components)
10. Fix color contrast issues

### **Week 3 (Medium Priority)**
11. Improve responsive layouts
12. Add empty states
13. Enhance animations
14. Add error boundaries
15. Improve form validation

### **Week 4 (Polish)**
16. Design consistency fixes
17. Performance optimizations
18. SEO improvements
19. UX enhancements
20. Final accessibility audit

---

## 📝 NOTES

- All issues are fixable without major refactoring
- Most issues are isolated to specific components
- Design system is solid, just needs consistent application
- Accessibility fixes will improve overall UX
- Performance improvements will enhance user experience

---

**Total Issues Identified:** 45  
**Critical:** 6  
**High Priority:** 10  
**Medium Priority:** 15  
**Low Priority:** 14

