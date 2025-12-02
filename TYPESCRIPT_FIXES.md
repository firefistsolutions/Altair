# TypeScript Fixes Needed

## Summary
Multiple TypeScript errors found during testing. Fixing systematically.

## Fixed ✅
1. Transform utilities updated to match actual schema
2. Search API route error handling fixed

## Remaining Fixes Needed

### 1. Search API Route (`/api/search`)
- Line 85: `product.shortDescription` → Use `product.description` (extract text from RichText)
- Line 87: `product.heroImage` → Use `product.image`
- Line 134: `project.featuredImage` → Use `project.image`
- Line 225: `post.excerpt` → Check if field exists or use description

### 2. Events Detail Page (`/events/[slug]/page.tsx`)
- Lines 81-85: `event.startDate` and `event.endDate` type handling - already Date objects from schema

### 3. Event Detail Component
- Line 107: `event.content` might be undefined - add fallback
- Line 179: `event.dateRange` doesn't exist on TransformedEvent - use `transformed.dateRange`

### 4. Event Card Component
- Line 95: `slug` not destructured from props - add to destructuring

### 5. Project Detail Component
- Line 143: `project.metrics` might be undefined - add check

### 6. Projects Listing Component
- Line 196: `year` is string, not number - convert to number for arithmetic

### 7. Featured Projects Section
- Line 96: `metrics` might be undefined - add fallback

### 8. Products Detail Page
- Lines 34, 44, 52: `product.shortDescription` doesn't exist - use `description`

### 9. Events Listing Component
- Multiple: Mock events don't have `startDate`, `status` - need to handle both transformed and mock types

