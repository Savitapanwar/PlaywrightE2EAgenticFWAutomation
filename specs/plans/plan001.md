# Test Plan: Amazon Product Search (US-001)

**Plan ID:** plan001  
**Feature:** Product Search on Amazon Homepage  
**User Story:** US-001  
**Created:** April 8, 2026  
**Coverage:** 21 Test Scenarios across 6 test suites

---

## TEST SUITE 1: AC1 - Homepage Navigation (Search Bar Visibility)

### Scenario 1.1: Search bar visible on desktop homepage
**Purpose:** Verify search bar is prominently displayed on Amazon homepage  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Open browser and navigate to https://www.amazon.com
2. Wait for homepage to fully load (network idle)
3. Locate search bar element (ref: e90)
4. Check visibility and positioning

**Expected Results:**
- Search bar is visible in viewport
- Search bar is positioned at top of page header
- Search bar has placeholder text "Search Amazon"
- Element is interactive and accepts focus

**Test Data:** None required  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 1.2: Search bar responsive across devices
**Purpose:** Verify search functionality adapts to different screen sizes  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Test on Desktop viewport (1920x1080)
2. Test on Tablet viewport (768x1024)
3. Test on Mobile viewport (375x667)
4. Verify search bar visibility and accessibility on each

**Expected Results:**
- Search bar visible on desktop with full width
- Search bar adapts on tablet (hamburger menu visible)
- Search bar accessible on mobile (may be in header)
- All viewports allow search execution

**Test Data:** None required  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 1.3: Keyboard navigation to search
**Purpose:** Verify search bar can be accessed via keyboard shortcut  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Load Amazon homepage
2. Press Alt+/ (keyboard shortcut)
3. Verify search bar receives focus
4. Type search term

**Expected Results:**
- Alt+/ directs focus to search bar
- Search bar has visible focus indicator
- Cursor is in search input field

**Test Data:** None required  
**Locators:** `[ref=e90]` - Search input field

---

## TEST SUITE 2: AC2 - Search Execution

### Scenario 2.1: Successful search execution with "water bottle"
**Purpose:** Verify user can search for product and reach results page  
**Pre-conditions:** User is on https://www.amazon.com with search bar visible  
**Steps:**
1. Click on search bar (ref: e90)
2. Type "water bottle" in search input
3. Click "Go" button (ref: e94) or press Enter
4. Wait for results page to load

**Expected Results:**
- Redirect to results page occurs
- URL contains search keyword: `k=water+bottle` or similar
- Results page title reflects search: "water bottle"
- Product list loads with relevant results

**Test Data:** Search term = "water bottle"  
**Locators:** 
- Search input: `[ref=e90]`
- Go button: `[ref=e94]`

---

### Scenario 2.2: Search with category filter
**Purpose:** Verify search within specific category works  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Click department dropdown next to search bar
2. Select "Sports & Outdoors" category
3. Enter "water bottle"
4. Click Go button
5. Verify results are filtered by category

**Expected Results:**
- Category dropdown opens
- Category selection updates
- Search includes category filter
- Results page shows only Sports & Outdoors products

**Test Data:** Category = "Sports & Outdoors", Search term = "water bottle"  
**Locators:** 
- Search input: `[ref=e90]`
- Department dropdown: `[ref=e88]`

---

### Scenario 2.3: Search via Enter key
**Purpose:** Verify search executes when user presses Enter key  
**Pre-conditions:** User has clicked search bar and typed keyword  
**Steps:**
1. Click search bar (ref: e90)
2. Type "water bottle"
3. Press Enter key (no button click)
4. Wait for navigation

**Expected Results:**
- Search executes without clicking Go button
- Results page loads successfully
- Same results as button-click method

**Test Data:** Search term = "water bottle"  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 2.4: Search with multiple spaces handling
**Purpose:** Verify search normalizes whitespace in query  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Click search bar
2. Type "water    bottle" (multiple spaces)
3. Submit search
4. Compare results

**Expected Results:**
- Multiple spaces are normalized to single space
- Query becomes "water bottle" 
- Results are identical to single-space search
- Application handles input sanitization

**Test Data:** Search term = "water    bottle" (4 spaces)  
**Locators:** `[ref=e90]` - Search input field

---

## TEST SUITE 3: AC3 - Results Display

### Scenario 3.1: Product information completeness
**Purpose:** Verify each product displays all required information  
**Pre-conditions:** User has searched "water bottle" and results page loaded  
**Steps:**
1. Navigate to water bottle results page
2. Inspect first product in list
3. Verify presence of: image, name, price, rating

**Expected Results:**
- Product image is visible
- Product name/title is displayed
- Price is shown (may have currency symbol)
- Customer rating (stars) is visible
- Rating count displayed (e.g., "1,234 ratings")

**Test Data:** Search results for "water bottle"  
**Locators:** Product result items on results page

---

### Scenario 3.2: Product metadata display
**Purpose:** Verify display of Amazon badges and additional metadata  
**Pre-conditions:** User viewing water bottle search results  
**Steps:**
1. Inspect first few products
2. Check for "Amazon's Choice" badge
3. Check for "Best Seller" badge
4. Verify color/variant options
5. Check delivery information

**Expected Results:**
- "Amazon's Choice" badge visible on qualifying products
- "Best Seller" indicator on top sellers
- Variant options displayed (colors, sizes)
- Delivery date/options shown
- Prime eligibility indicated

**Test Data:** Search results for "water bottle"  
**Locators:** Product metadata elements in result items

---

### Scenario 3.3: Multiple products formatting consistency
**Purpose:** Verify all products have consistent display formatting  
**Pre-conditions:** Water bottle search results loaded  
**Steps:**
1. View first 10 products on results page
2. Compare formatting of each item
3. Verify alignment, spacing, typography
4. Scroll down to load more results
5. Compare new products to earlier ones

**Expected Results:**
- All products have identical layout structure
- Spacing and alignment is consistent
- Font sizes match across all products
- New results maintain same formatting
- Image aspect ratios are consistent

**Test Data:** Search results for "water bottle"  
**Locators:** Product result container elements

---

### Scenario 3.4: Search results relevance
**Purpose:** Verify results match search intent  
**Pre-conditions:** Water bottle results page loaded  
**Steps:**
1. Review product titles and descriptions
2. Check that products are water bottles (not random items)
3. Verify no completely irrelevant results
4. Note any sponsored/ads vs. organic results

**Expected Results:**
- All products are actual water bottles
- Product names contain "water" or "bottle"
- Results are relevant to search query
- Sponsored products clearly marked
- No spam or completely off-topic results

**Test Data:** Search results for "water bottle"  
**Locators:** Product title and description elements

---

## TEST SUITE 4: AC4 - Error Handling

### Scenario 4.1: Empty search submission
**Purpose:** Verify application handles empty search gracefully  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Click search bar
2. Leave it empty (don't type anything)
3. Click Go button or press Enter
4. Observe application behavior

**Expected Results:**
- Application does not navigate to blank results
- Either: shows error message OR returns to homepage OR shows all products
- No application error/crash occurs
- User can still interact with page

**Test Data:** Empty string  
**Locators:** `[ref=e90]` - Search input, `[ref=e94]` - Go button

---

### Scenario 4.2: Whitespace-only search
**Purpose:** Verify application handles whitespace-only input  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Click search bar
2. Type only spaces: "    " (4 spaces)
3. Submit search
4. Observe response

**Expected Results:**
- Application treats as empty input
- Shows appropriate message (no results, try again)
- Whitespace is trimmed/validated
- User is not taken to broken results page

**Test Data:** Whitespace only: "    "  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 4.3: Special characters in search
**Purpose:** Verify search handles special characters safely  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Enter search: "water bottle & <script>alert('xss')</script>"
2. Submit search
3. Check page renders correctly
4. Verify no XSS attack occurred

**Expected Results:**
- Page renders without javascript execution
- Search query is properly escaped
- Results page loads safely
- Special characters are treated as literal text
- No security vulnerability

**Test Data:** "water bottle & <script>alert('xss')</script>"  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 4.4: Very long search term
**Purpose:** Verify application handles extremely long input  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Enter very long search (500+ characters)
2. Submit search
3. Check results page loads
4. Verify URL is properly encoded

**Expected Results:**
- Application accepts long input
- Search executes without hanging
- Results load (may be "no results" which is acceptable)
- URL is properly formatted (no corruption)
- Page remains responsive

**Test Data:** Search = "a" repeated 500 times  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 4.5: SQL injection-like input
**Purpose:** Verify backend is protected against SQL injection attempts  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Enter: water bottle' OR '1'='1
2. Submit search
3. Observe results

**Expected Results:**
- Input is treated as literal search string
- No unauthorized database access
- Results show legitimate product search for that string
- No error messages revealing backend structure

**Test Data:** "water bottle' OR '1'='1"  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 4.6: Rapid successive searches
**Purpose:** Verify application handles rapid user searches  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Enter first search "water bottle"
2. Submit immediately
3. While loading, enter second search "coffee mug"
4. Submit second search
5. Verify final results are correct

**Expected Results:**
- Second search cancels first (or first completes, then second runs)
- Final results show "coffee mug" products
- No mixed results or corruption
- UI remains responsive
- No errors in console

**Test Data:** Two searches: "water bottle" then "coffee mug"  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 4.7: Network connectivity error
**Purpose:** Verify graceful handling of network failures  
**Pre-conditions:** User is on https://www.amazon.com  
**Steps:**
1. Open DevTools Network tab
2. Set network to "Offline"
3. Perform search for "water bottle"
4. Observe error handling

**Expected Results:**
- Network error is caught
- User sees error message ("No internet", "Cannot reach Amazon", etc.)
- Page doesn't crash or hang indefinitely
- User can retry after connection restored
- Retry button/link available

**Test Data:** Search term = "water bottle" (under offline conditions)  
**Locators:** `[ref=e90]` - Search input field

---

## TEST SUITE 5: Happy Path - Complete User Journey

### Scenario 5.1: Complete search journey
**Purpose:** Verify full user journey from homepage to product purchase  
**Pre-conditions:** User is on https://www.amazon.com (not logged in)  
**Steps:**
1. Verify homepage loads with search bar visible
2. Enter "water bottle" in search
3. Click Go button
4. Wait for results page
5. Verify results display product list
6. Click on first product to view details
7. Verify product detail page loads
8. Add product to cart

**Expected Results:**
- Each step completes successfully
- Page transitions are smooth
- No errors encountered
- User can complete purchase flow
- Cart updates correctly

**Test Data:** Search term = "water bottle", Product selection = first result  
**Locators:** `[ref=e90]` - Search input, `[ref=e94]` - Go button, Product items

---

## TEST SUITE 6: Edge Cases

### Scenario 6.1: Mobile viewport search
**Purpose:** Verify search works on mobile screen size  
**Pre-conditions:** Browser viewport set to 375x667 (mobile)  
**Steps:**
1. Set viewport to mobile size
2. Navigate to Amazon.com
3. Locate search functionality
4. Perform search for "water bottle"
5. Verify results load

**Expected Results:**
- Search bar is accessible on mobile
- Mobile layout displays correctly
- Search executes successfully
- Results are mobile-optimized
- No horizontal scrolling needed

**Test Data:** Viewport = 375x667, Search = "water bottle"  
**Locators:** Mobile-responsive search elements

---

### Scenario 6.2: Search immediately after page load
**Purpose:** Verify search works before all page assets are loaded  
**Pre-conditions:** Browser is loading Amazon.com  
**Steps:**
1. Navigate to Amazon.com
2. Immediately (after <1s) click search bar
3. Type search term
4. Submit search
5. Observe navigation

**Expected Results:**
- Search bar is functional even during page load
- Search executes without waiting for all assets
- Page navigates to results
- No "page not ready" errors

**Test Data:** Search immediately after navigation, term = "water bottle"  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 6.3: Single character search
**Purpose:** Verify search accepts minimal input  
**Pre-conditions:** User is on Amazon.com  
**Steps:**
1. Click search bar
2. Type single character: "w"
3. Submit search
4. Check results

**Expected Results:**
- Search executes
- Results load (may be large result set)
- Application doesn't throw validation error
- Results include products matching "w"

**Test Data:** Single character = "w"  
**Locators:** `[ref=e90]` - Search input field

---

### Scenario 6.4: Numeric-only search
**Purpose:** Verify search handles numeric input  
**Pre-conditions:** User is on Amazon.com  
**Steps:**
1. Click search bar
2. Enter numeric search: "1000"
3. Submit search
4. Check results

**Expected Results:**
- Search executes
- Results show products with "1000" (likely capacity or model numbers)
- Application handles numeric-only queries
- Results are legitimate products

**Test Data:** Numeric search = "1000"  
**Locators:** `[ref=e90]` - Search input field

---

## SUMMARY

| Test Suite | Scenarios | Focus Area |
|-----------|-----------|-----------|
| 1. Homepage Navigation | 3 | Search bar visibility and accessibility |
| 2. Search Execution | 4 | Basic search functionality |
| 3. Results Display | 4 | Product information completeness |
| 4. Error Handling | 7 | Robustness and security |
| 5. Happy Path | 1 | Complete user journey |
| 6. Edge Cases | 4 | Boundary conditions |
| **TOTAL** | **21 scenarios** | Comprehensive coverage |

---

## AUTOMATION READINESS

**Identified Page Elements:**
- Search Input Field: `[ref=e90]`
- Department Dropdown: `[ref=e88]`
- Go Button: `[ref=e94]`
- Product Items: Search results container
- Product Image: Image element in result item
- Product Title: Heading element in result item
- Product Price: Price display element
- Product Rating: Stars/rating element

**Wait Strategies:**
- Page Load: `page.waitForLoadState('networkidle')`
- Search Results: `page.waitForSelector('div[data-component-type="s-search-result"]')`
- Dynamic Content: Use Playwright auto-wait with reasonable timeouts

**Recommended Locator Strategy:**
1. Use role-based locators: `getByRole('button', { name: 'Go' })`
2. Use labels: `getByLabel()`
3. Use test IDs if available
4. Fallback to CSS selectors with unique identifiers

---

**Plan Created:** April 8, 2026  
**Status:** Ready for Exploratory Testing & Automation
