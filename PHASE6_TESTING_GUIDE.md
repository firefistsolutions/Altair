# Phase 6: Testing Guide

## Overview
This guide helps you test all Phase 6 implementations including API routes, CMS integration, and search functionality.

---

## Pre-Testing Checklist

### 1. Environment Setup
- [ ] Dev server is running (`pnpm dev`)
- [ ] Database connection is active
- [ ] Environment variables are set:
  - `DATABASE_URI`
  - `RESEND_API_KEY`
  - `FROM_EMAIL`
  - `ADMIN_EMAIL`
  - `PAYLOAD_SECRET`

### 2. CMS Data
- [ ] At least 2-3 Products created in CMS
- [ ] At least 2-3 Projects created in CMS
- [ ] At least 2-3 Events created in CMS (mix of upcoming and past)
- [ ] At least 1-2 Blog Posts created in CMS

---

## Testing Checklist

### ✅ API Routes Testing

#### 1. Contact Form API (`/api/contact`)
- [ ] Navigate to `/contact`
- [ ] Fill out the contact form
- [ ] Submit the form
- [ ] Verify success message appears
- [ ] Check Payload CMS → Leads collection for new entry
- [ ] Check admin email inbox for notification
- [ ] Check user email for confirmation

**Test Data:**
```
Name: Test User
Email: test@example.com
Phone: 1234567890
Subject: Test Subject
Message: This is a test message for contact form
```

#### 2. Quote Request API (`/api/quote`)
- [ ] Navigate to `/request-quote`
- [ ] Fill out the quote form
- [ ] Upload a test file (PDF/JPG/PNG, < 10MB)
- [ ] Submit the form
- [ ] Verify success message appears
- [ ] Check Payload CMS → Leads collection for new entry
- [ ] Check Payload CMS → Media collection for uploaded file
- [ ] Check admin email inbox for notification
- [ ] Check user email for confirmation

**Test Data:**
```
Name: Test User
Email: test@example.com
Phone: 1234567890
Organization: Test Hospital
Project Type: Modular Operation Theatre
Description: This is a test quote request with file upload
```

#### 3. Survey Request API (`/api/survey`)
- [ ] Navigate to `/request-survey`
- [ ] Fill out the survey form
- [ ] Select a future date and time
- [ ] Submit the form
- [ ] Verify success message appears
- [ ] Check Payload CMS → Leads collection for new entry
- [ ] Check admin email inbox for notification
- [ ] Check user email for confirmation with date details

**Test Data:**
```
Name: Test User
Email: test@example.com
Phone: 1234567890
Organization: Test Hospital
Location: Mumbai, Maharashtra
Preferred Date: (Select future date)
Preferred Time: 10:00 AM
Project Details: This is a test survey request
```

#### 4. Newsletter API (`/api/newsletter`)
- [ ] Navigate to homepage footer CTA section
- [ ] Enter email in newsletter subscription field
- [ ] Submit the form
- [ ] Verify success message appears
- [ ] Check Payload CMS → Leads collection for new entry (source: 'newsletter')
- [ ] Check admin email inbox for notification
- [ ] Check subscriber email for welcome email
- [ ] Try subscribing with the same email again (should handle gracefully)

**Test Data:**
```
Email: newsletter@example.com
```

---

### ✅ Frontend Integration Testing

#### 5. Products Pages
- [ ] Navigate to `/products`
- [ ] Verify products from CMS are displayed
- [ ] Test search functionality
- [ ] Test category filter
- [ ] Test featured filter
- [ ] Click on a product card
- [ ] Verify product detail page loads with CMS data
- [ ] Verify related products section shows (if available)
- [ ] Check product images load correctly
- [ ] Verify product specs are displayed

#### 6. Projects Pages
- [ ] Navigate to `/projects`
- [ ] Verify projects from CMS are displayed
- [ ] Test search functionality
- [ ] Test hospital type filter
- [ ] Test year filter
- [ ] Click on a project card
- [ ] Verify project detail page loads with CMS data
- [ ] Verify related projects section shows (if available)
- [ ] Check project images load correctly
- [ ] Verify project metrics are displayed

#### 7. Events Pages
- [ ] Navigate to `/events`
- [ ] Verify events from CMS are displayed
- [ ] Test search functionality
- [ ] Test event type filter
- [ ] Test status filter (Upcoming/Past)
- [ ] Click on an event card
- [ ] Verify event detail page loads with CMS data
- [ ] Verify related events section shows (if available)
- [ ] Check event images load correctly
- [ ] Verify event dates are formatted correctly

#### 8. Homepage Sections
- [ ] Navigate to `/` (homepage)
- [ ] Scroll to Products Carousel section
- [ ] Verify featured products from CMS are displayed
- [ ] Test carousel navigation (left/right arrows)
- [ ] Scroll to Featured Projects section
- [ ] Verify featured projects from CMS are displayed
- [ ] Scroll to Events section
- [ ] Verify upcoming events are displayed by default
- [ ] Toggle to "Past Events" tab
- [ ] Verify past events are displayed
- [ ] Toggle back to "Upcoming Events"
- [ ] Verify all sections load without errors

#### 9. Blog Pages
- [ ] Navigate to `/posts`
- [ ] Verify blog posts from CMS are displayed
- [ ] Click on a blog post
- [ ] Verify post detail page loads with CMS data
- [ ] Check post content renders correctly
- [ ] Verify related posts section (if available)

---

### ✅ Search Functionality Testing

#### 10. Search Page
- [ ] Navigate to `/search`
- [ ] Enter a search query (e.g., "operation")
- [ ] Verify results appear from multiple collections
- [ ] Test type filtering (All, Products, Projects, Events, Posts, Resources)
- [ ] Verify result cards display correctly
- [ ] Click on a search result
- [ ] Verify it navigates to the correct page
- [ ] Test empty search query
- [ ] Test search with no results
- [ ] Verify loading states work correctly

**Test Queries:**
- "operation" (should find products, projects)
- "hospital" (should find projects)
- "expo" (should find events)
- "medical" (should find multiple types)

---

### ✅ Caching & Performance Testing

#### 11. Static Generation
- [ ] Build the project: `pnpm build`
- [ ] Verify build succeeds without errors
- [ ] Check that static pages are generated:
  - Products listing page
  - Product detail pages (for each product)
  - Projects listing page
  - Project detail pages (for each project)
  - Events listing page
  - Event detail pages (for each event)
  - Homepage

#### 12. ISR (Incremental Static Regeneration)
- [ ] Start production server: `pnpm start`
- [ ] Visit a product page
- [ ] Make a change to that product in CMS
- [ ] Wait up to 1 hour (or manually trigger revalidation)
- [ ] Verify the change appears on the page

---

### ✅ Error Handling Testing

#### 13. Error Scenarios
- [ ] Submit contact form with invalid email
- [ ] Submit quote form with file > 10MB
- [ ] Submit quote form with invalid file type
- [ ] Navigate to non-existent product slug: `/products/non-existent`
- [ ] Navigate to non-existent project slug: `/projects/non-existent`
- [ ] Navigate to non-existent event slug: `/events/non-existent`
- [ ] Verify 404 pages display correctly
- [ ] Test search with special characters
- [ ] Test forms with empty required fields

---

## Quick Test Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type check
pnpm typecheck

# Lint check
pnpm lint
```

---

## Common Issues & Solutions

### Issue: Products/Projects/Events not showing
**Solution:**
1. Check if items are published in CMS (`_status: 'published'`)
2. Verify items have required fields filled
3. Check browser console for errors
4. Restart dev server

### Issue: Images not loading
**Solution:**
1. Verify images are uploaded to Media collection
2. Check image URLs in browser network tab
3. Verify `NEXT_PUBLIC_SERVER_URL` is set correctly

### Issue: API routes returning errors
**Solution:**
1. Check environment variables are set
2. Verify Resend API key is valid
3. Check server logs for detailed errors
4. Verify database connection

### Issue: Search not working
**Solution:**
1. Verify search API endpoint is accessible
2. Check browser console for errors
3. Verify CMS collections have published content
4. Test API directly: `/api/search?q=test`

---

## Test Results Template

```
Date: ___________
Tester: ___________

API Routes:
- Contact Form: [ ] Pass [ ] Fail - Notes: ___________
- Quote Request: [ ] Pass [ ] Fail - Notes: ___________
- Survey Request: [ ] Pass [ ] Fail - Notes: ___________
- Newsletter: [ ] Pass [ ] Fail - Notes: ___________

Frontend Integration:
- Products Pages: [ ] Pass [ ] Fail - Notes: ___________
- Projects Pages: [ ] Pass [ ] Fail - Notes: ___________
- Events Pages: [ ] Pass [ ] Fail - Notes: ___________
- Homepage: [ ] Pass [ ] Fail - Notes: ___________
- Blog Pages: [ ] Pass [ ] Fail - Notes: ___________

Search:
- Search Functionality: [ ] Pass [ ] Fail - Notes: ___________

Caching:
- Static Generation: [ ] Pass [ ] Fail - Notes: ___________
- ISR: [ ] Pass [ ] Fail - Notes: ___________

Overall Status: [ ] Ready for Production [ ] Needs Fixes
```

---

## Next Steps After Testing

1. Fix any identified issues
2. Document any bugs or improvements needed
3. Proceed to Phase 7: Integration & Testing (if all tests pass)

