# IRCTC Meal Ordering - Test Plan (US-002)
**Plan ID:** plan002_IRCTC  
**Feature:** IRCTC Meal Ordering - Breakfast Selection  
**User Story:** US-002  
**Created:** April 15, 2026  
**Coverage:** 39 Test Scenarios across 7 test suites

---

## TEST SUITE 1: AC1 - Menu Navigation (5 tests)

### Scenario 1.1: Top-Right Menu Visibility on Desktop
**Purpose:** Verify menu button is visible and properly positioned on desktop  
**Pre-conditions:** User is on IRCTC homepage (https://www.irctc.co.in/)  
**Steps:**
1. Load IRCTC homepage on desktop (1920x1080 viewport)
2. Locate top-right corner of page
3. Verify menu button/icon presence
4. Verify menu positioning and visibility

**Expected Results:**
- Menu button is visible in top-right corner
- Menu button is clearly identifiable
- Menu button has sufficient size for clicking
- No layout overlap or cutoff

**Test Data:** None required

---

### Scenario 1.2: Menu Button Responsiveness on Mobile
**Purpose:** Verify menu is accessible and properly sized on mobile  
**Pre-conditions:** User is on IRCTC homepage  
**Steps:**
1. Set viewport to mobile (375x667)
2. Reload page
3. Locate menu button in top-right
4. Verify touch target size (minimum 44x44 pixels)
5. Click menu button

**Expected Results:**
- Menu button visible on mobile viewport
- Button has adequate touch target size
- Menu opens/expands on click
- No mobile-specific layout issues

**Test Data:** Mobile viewport dimensions: 375x667

---

### Scenario 1.3: Menu Keyboard Accessibility
**Purpose:** Verify menu can be accessed via keyboard navigation  
**Pre-conditions:** User is on IRCTC homepage  
**Steps:**
1. Press Tab key to navigate elements
2. Focus on menu button
3. Press Enter key to activate menu
4. Observe menu state

**Expected Results:**
- Menu button receives focus indicator
- Enter key activates menu
- Menu expands without page reload
- Tab order follows logical flow

**Test Data:** Keyboard: Tab, Enter

---

### Scenario 1.4: Menu Error Handling - Element Not Found
**Purpose:** Verify graceful handling if menu button fails to load  
**Pre-conditions:** User is on IRCTC homepage  
**Steps:**
1. Inspect page load
2. Check if menu button exists
3. Attempt to interact with page without menu

**Expected Results:**
- If menu unavailable, error message displayed
- Alternative navigation available
- Page remains usable
- No JavaScript errors

**Test Data:** None

---

### Scenario 1.5: Rapid Menu Clicks Handling
**Purpose:** Verify stability with rapid successive menu interactions  
**Pre-conditions:** User is on IRCTC homepage  
**Steps:**
1. Click menu button rapidly (5 times in 2 seconds)
2. Observe menu state
3. Verify final stable state

**Expected Results:**
- Menu doesn't get stuck or malfunction
- No duplicate menus or overlays
- Final state is stable
- No error messages

**Test Data:** Rapid click simulation

---

## TEST SUITE 2: AC2 - MEALS Section Access (5 tests)

### Scenario 2.1: MEALS Option Visibility in Menu
**Purpose:** Verify MEALS option is visible when menu is open  
**Pre-conditions:** User has opened the top-right menu  
**Steps:**
1. Click menu button
2. Wait for menu to fully load
3. Scan menu items for "MEALS" option
4. Verify position and formatting

**Expected Results:**
- MEALS option visible in menu dropdown
- Text is readable and clearly labeled
- Menu items properly formatted
- No truncation of "MEALS" text

**Test Data:** Menu item: "MEALS"

---

### Scenario 2.2: MEALS Section Navigation
**Purpose:** Verify clicking MEALS navigates to meals section  
**Pre-conditions:** Menu is open and MEALS is visible  
**Steps:**
1. Click on "MEALS" option
2. Wait for page load
3. Verify URL/page change
4. Check page title and content

**Expected Results:**
- Navigation occurs without reload lag
- URL changes to meals section
- Page title indicates meals content
- Previous state cleared

**Test Data:** MEALS menu item

---

### Scenario 2.3: MEALS Submenu Expansion
**Purpose:** Verify MEALS option has submenu or direct navigation  
**Pre-conditions:** Menu is open  
**Steps:**
1. Hover over MEALS option (if submenu exists)
2. Verify submenu appearance
3. Check submenu items
4. Verify navigation behavior

**Expected Results:**
- Submenu appears if available
- Items listed clearly
- Click behavior is consistent
- Submenu properly formatted

**Test Data:** MEALS menu item

---

### Scenario 2.4: Accessibility - Screen Reader Support
**Purpose:** Verify MEALS option is properly announced to screen readers  
**Pre-conditions:** Menu is open  
**Steps:**
1. Activate screen reader
2. Navigate to MEALS option
3. Verify announcement content
4. Check aria-labels and semantic markup

**Expected Results:**
- MEALS option announced clearly
- Menu structure understood
- No missing labels
- Semantic HTML used

**Test Data:** Screen reader: NVDA/JAWS simulation

---

### Scenario 2.5: Dynamic Content Loading - MEALS
**Purpose:** Verify MEALS loads without blocking other page elements  
**Pre-conditions:** User has clicked on MEALS option  
**Steps:**
1. Monitor network tab for requests
2. Verify page responsiveness during load
3. Check scroll behavior
4. Verify element interaction during load

**Expected Results:**
- Page remains responsive
- No blocking loaders
- Partial content loads incrementally
- User can interact while loading

**Test Data:** Network monitoring enabled

---

## TEST SUITE 3: AC3 - Cooked Food Menu Display (6 tests)

### Scenario 3.1: Cooked Food Menu Visibility
**Purpose:** Verify cooked food menu is accessible after clicking MEALS  
**Pre-conditions:** User is in MEALS section  
**Steps:**
1. Navigate to MEALS section
2. Look for "Cooked Food Menu" option
3. Verify menu visibility
4. Check menu organization

**Expected Results:**
- Cooked Food Menu option is visible
- Menu items clearly labeled
- No scroll overflow issues
- Menu well-formatted

**Test Data:** Expected menu labels: "Cooked Food Menu"

---

### Scenario 3.2: Menu Category Structure
**Purpose:** Verify menu displays categories properly  
**Pre-conditions:** Cooked Food Menu is displayed  
**Steps:**
1. Inspect visible categories
2. Count number of categories
3. Verify each category has icon/label
4. Check for "Breakfast" category

**Expected Results:**
- Multiple categories visible
- Each category clearly labeled
- Icons displayed (if applicable)
- "Breakfast" category present

**Test Data:** Expected categories: Breakfast, Lunch, Dinner, etc.

---

### Scenario 3.3: Cooked Food Menu Performance
**Purpose:** Verify menu loads within acceptable time  
**Pre-conditions:** User is navigating to MEALS  
**Steps:**
1. Start timer when clicking MEALS
2. Measure time to full menu load
3. Monitor CPU/memory usage
4. Check for lag or freezing

**Expected Results:**
- Menu loads within 3 seconds
- No noticeable lag
- Smooth scrolling
- CPU usage normal

**Test Data:** Performance threshold: 3s

---

### Scenario 3.4: Menu Mobile Responsiveness
**Purpose:** Verify menu adapts to mobile layout  
**Pre-conditions:** Mobile viewport (375x667)  
**Steps:**
1. Set mobile viewport
2. Navigate to MEALS section
3. Verify menu layout
4. Test touch interactions

**Expected Results:**
- Menu adapts to mobile width
- Items stack vertically if needed
- Touch targets are adequate
- No horizontal scroll required

**Test Data:** Mobile viewport: 375x667

---

### Scenario 3.5: Menu Accessibility - Keyboard Navigation
**Purpose:** Verify keyboard navigation through menu  
**Pre-conditions:** Cooked Food Menu displayed  
**Steps:**
1. Press Tab to navigate menu items
2. Verify focus indicators
3. Press Enter to select items
4. Check navigation order

**Expected Results:**
- Clear focus indicators on items
- Tab moves to next item
- Enter activates selection
- Logical tab order maintained

**Test Data:** Keyboard: Tab, Enter

---

### Scenario 3.6: Menu Under Poor Network Conditions
**Purpose:** Verify menu handles slow network  
**Pre-conditions:** Throttled network connection  
**Steps:**
1. Set network throttle (3G/2G)
2. Navigate to MEALS
3. Monitor load behavior
4. Check for timeout/error handling

**Expected Results:**
- Menu still loads
- Partial content displays
- Loading indicator shown
- No undefined states

**Test Data:** Network: 3G throttle (400ms latency)

---

## TEST SUITE 4: AC4 - Breakfast Category (5 tests)

### Scenario 4.1: Breakfast Category Visibility
**Purpose:** Verify Breakfast category is visible in cooked food menu  
**Pre-conditions:** Cooked Food Menu is displayed  
**Steps:**
1. Inspect menu categories
2. Find "Breakfast" category
3. Verify visibility and positioning
4. Check for icon/label clarity

**Expected Results:**
- Breakfast category is visible
- Category name clearly displayed
- Positioned logically in menu
- Takes up appropriate space

**Test Data:** Category: "Breakfast"

---

### Scenario 4.2: Breakfast Category Selection
**Purpose:** Verify clicking Breakfast reveals breakfast items  
**Pre-conditions:** Breakfast category is visible  
**Steps:**
1. Click on Breakfast category
2. Wait for items to load
3. Verify display of breakfast items
4. Check layout and formatting

**Expected Results:**
- Breakfast items appear
- Items properly formatted
- Layout doesn't break
- Loading completes smoothly

**Test Data:** Breakfast category click

---

### Scenario 4.3: Breakfast Modal/Panel Display
**Purpose:** Verify breakfast items display in modal or panel  
**Pre-conditions:** Breakfast category clicked  
**Steps:**
1. Observe whether modal or panel opens
2. Check overlay/backdrop (if modal)
3. Verify close button presence
4. Check z-index layering

**Expected Results:**
- Display area is clear and readable
- Overlay doesn't prevent interaction
- Close option available
- Proper z-index (modal on top)

**Test Data:** None

---

### Scenario 4.4: Keyboard Navigation - Breakfast Category
**Purpose:** Verify keyboard can select Breakfast category  
**Pre-conditions:** Cooked Food Menu displayed  
**Steps:**
1. Press Tab to navigate categories
2. Focus on Breakfast item
3. Press Enter to select
4. Verify items display

**Expected Results:**
- Breakfast gains focus
- Enter key triggers display
- Items appear as with mouse click
- Tab order correct

**Test Data:** Keyboard: Tab, Enter

---

### Scenario 4.5: Multi-Category Switching
**Purpose:** Verify user can switch between categories  
**Pre-conditions:** Breakfast items displayed  
**Steps:**
1. Click different category (e.g., Lunch)
2. Verify items change
3. Go back to Breakfast
4. Verify items reload correctly

**Expected Results:**
- Category switch is instant
- Previous items cleared
- New items properly displayed
- State management correct

**Test Data:** Multiple categories: Breakfast, Lunch, Dinner

---

## TEST SUITE 5: AC5 - Breakfast Item Selection (6 tests)

### Scenario 5.1: Breakfast Items Display - Complete Details
**Purpose:** Verify breakfast items show name, price, image, description  
**Pre-conditions:** Breakfast category displayed  
**Steps:**
1. Inspect each breakfast item card
2. Verify presence of: name, price, image, description
3. Check data accuracy
4. Verify formatting and readability

**Expected Results:**
- All 4 details visible (name, price, image, description)
- Text is readable
- Images load properly
- No missing data

**Test Data:** Sample items: Idli, Dosa, Poha, Paratha

---

### Scenario 5.2: Veg/Non-Veg Differentiation
**Purpose:** Verify veg/non-veg indicator is shown  
**Pre-conditions:** Breakfast items displayed  
**Steps:**
1. Look for veg/non-veg indicators
2. Verify icon or label presence
3. Check color coding (if applicable)
4. Verify accuracy for each item

**Expected Results:**
- Indicator visible for each item
- Color or icon clearly differentiates
- Veg: Green, Non-veg: Red (standard)
- No ambiguity

**Test Data:** Veg items: Idli, Dosa; Non-veg: Egg-based items

---

### Scenario 5.3: Price Display Accuracy
**Purpose:** Verify prices are displayed correctly  
**Pre-conditions:** Breakfast items visible  
**Steps:**
1. Inspect each item's price
2. Verify currency symbol (₹)
3. Check decimal places (if applicable)
4. Verify no price is negative/zero

**Expected Results:**
- Currency symbol present
- Prices are positive values
- Consistent formatting
- No display errors

**Test Data:** Expected format: ₹XX or ₹XX.XX

---

### Scenario 5.4: Item Selection - Click Interaction
**Purpose:** Verify clicking item selects it (or adds to cart)  
**Pre-conditions:** Breakfast items displayed  
**Steps:**
1. Click on first breakfast item
2. Verify item is marked as selected
3. Check for visual indicator (highlight, checkbox, etc.)
4. Verify quantity controls appear (if applicable)

**Expected Results:**
- Item is selected/highlighted
- Visual feedback provided
- Quantity can be adjusted
- Multiple items can be selected

**Test Data:** Item: Idli

---

### Scenario 5.5: Item Text Overflow Handling
**Purpose:** Verify long item names don't break layout  
**Pre-conditions:** Breakfast items displayed  
**Steps:**
1. Look for items with long names
2. Inspect text wrapping
3. Check for truncation
4. Verify readability

**Expected Results:**
- Long names handled gracefully
- Text wraps to multiple lines if needed
- No layout break
- Full text visible or accessible (tooltip)

**Test Data:** Long name example: "Paneer Masala Dosa with Extra Ghee and Chutney"

---

### Scenario 5.6: Scroll Handling - Many Items
**Purpose:** Verify scrolling through many breakfast items works smoothly  
**Pre-conditions:** Multiple breakfast items displayed  
**Steps:**
1. Scroll down through items
2. Check scroll smoothness
3. Verify lazy loading (if applicable)
4. Check bottom item visibility

**Expected Results:**
- Smooth scroll without jank
- All items accessible
- No content loss during scroll
- Performance maintained

**Test Data:** Multiple items: 10+

---

## TEST SUITE 6: AC6 - Item Removal/Deselection (8 tests)

### Scenario 6.1: Close Button (X) Visibility
**Purpose:** Verify close/remove button is visible on selected items  
**Pre-conditions:** Breakfast item selected  
**Steps:**
1. Select a breakfast item
2. Locate remove/close button (usually X icon)
3. Verify button visibility
4. Check button positioning

**Expected Results:**
- X/Close button visible on item
- Button positioned clearly (usually top-right)
- Button size adequate for clicking
- Hover state shows interactivity

**Test Data:** Selected item: Idli

---

### Scenario 6.2: Item Removal - Click Functionality
**Purpose:** Verify clicking X button removes item  
**Pre-conditions:** Breakfast item selected with close button visible  
**Steps:**
1. Click X button
2. Verify item is removed/deselected
3. Check visual state change
4. Verify cart/selection updates

**Expected Results:**
- Item immediately removed
- Visual indicator disappears
- Cart count decreases
- No errors

**Test Data:** None

---

### Scenario 6.3: Keyboard Shortcut - Escape Key
**Purpose:** Verify Escape key can close/deselect item if focused  
**Pre-conditions:** Item selected or modal open  
**Steps:**
1. Focus on selected item or modal
2. Press Escape key
3. Verify item deselected
4. Check default focus position

**Expected Results:**
- Escape key deselects item
- Modal closes (if applicable)
- Focus returns to previous element
- Keyboard accessibility maintained

**Test Data:** Keyboard: Escape

---

### Scenario 6.4: Multiple Item Management
**Purpose:** Verify user can deselect one item while keeping others selected  
**Pre-conditions:** Multiple breakfast items selected  
**Steps:**
1. Select 3 breakfast items
2. Remove middle item using X button
3. Verify other items remain selected
4. Check cart reflects changes

**Expected Results:**
- Removed item gone
- Other items remain selected
- Cart count correct (decreased by 1)
- No unintended removals

**Test Data:** 3 items: Idli, Dosa, Poha

---

### Scenario 6.5: Rapid Open/Close Cycles
**Purpose:** Verify stability with rapid open/remove/reselect cycles  
**Pre-conditions:** Breakfast items available  
**Steps:**
1. Select item
2. Remove item
3. Reselect item
4. Repeat 5 times rapidly

**Expected Results:**
- No stuck states
- No UI glitches
- All cycles complete successfully
- Final state correct

**Test Data:** Rapid click simulation

---

### Scenario 6.6: Mobile Tap to Remove
**Purpose:** Verify X button works with mobile touch  
**Pre-conditions:** Mobile viewport (375x667), item selected  
**Steps:**
1. Select breakfast item on mobile
2. Tap X button
3. Verify touch response
4. Check removal success

**Expected Results:**
- Touch response immediate
- Item removed on first tap
- No accidental double-taps needed
- Touch target adequate (44x44 px min)

**Test Data:** Mobile viewport, tap interaction

---

### Scenario 6.7: Item Removal Under Network Latency
**Purpose:** Verify removal succeeds even with slow network  
**Pre-conditions:** Network throttled (3G), item selected  
**Steps:**
1. Set 3G throttle
2. Click X button
3. Monitor network requests
4. Verify successful removal

**Expected Results:**
- Removal request sent
- Loading indicator shown (if applicable)
- Removal completes successfully
- Cart eventually updates

**Test Data:** Network: 3G (400ms latency)

---

### Scenario 6.8: Undo/Re-add Functionality (if available)
**Purpose:** Verify user can restore removed item (if feature exists)  
**Pre-conditions:** Breakfast item was just removed  
**Steps:**
1. Look for undo/re-add option
2. Verify option availability
3. Click undo if available
4. Verify item restores

**Expected Results:**
- Undo option available (if implemented)
- Item restores to previous state
- Quantity matches original selection
- Cart updates correctly

**Test Data:** Item: Dosa

---

## TEST SUITE 7: Happy Path & Edge Cases (4 additional tests)

### Scenario 7.1: Complete Happy Path Flow
**Purpose:** Verify entire workflow succeeds end-to-end  
**Pre-conditions:** Clean state, IRCTC homepage ready  
**Steps:**
1. Navigate to IRCTC homepage
2. Click top-right menu
3. Select MEALS
4. Select Cooked Food Menu
5. Click Breakfast category
6. Browse breakfast items
7. Select 2-3 items
8. Verify items appear in selection
9. Remove 1 item using X button
10. Verify final selection correct

**Expected Results:**
- All steps succeed
- No errors or warnings
- Final selection matches actions
- Performance acceptable

**Test Data:** Items: Idli, Dosa, Poha

---

### Scenario 7.2: Empty Breakfast Menu
**Purpose:** Verify graceful handling if no breakfast items available  
**Pre-conditions:** Breakfast category has no items  
**Steps:**
1. Navigate to Breakfast category
2. Verify empty state
3. Check for message ("No items available")
4. Verify navigation back option

**Expected Results:**
- Empty state message displayed
- User not confused
- Navigation back available
- No errors

**Test Data:** Empty category scenario

---

### Scenario 7.3: Cross-Browser Testing - Firefox
**Purpose:** Verify feature works on Firefox browser  
**Pre-conditions:** User on Firefox browser  
**Steps:**
1. Complete happy path on Firefox
2. Verify all interactions work
3. Check for browser-specific issues
4. Verify rendering is correct

**Expected Results:**
- All features work on Firefox
- No JavaScript errors
- Layout renders correctly
- Performance acceptable

**Test Data:** Browser: Firefox latest

---

### Scenario 7.4: Tablet Viewport Responsiveness
**Purpose:** Verify feature works on tablet (768x1024)  
**Pre-conditions:** Tablet viewport set  
**Steps:**
1. Set tablet viewport
2. Complete happy path on tablet
3. Verify touch interactions
4. Check layout adaptation

**Expected Results:**
- Menu accessible on tablet
- Items display properly
- Touch targets adequate
- No layout issues

**Test Data:** Tablet viewport: 768x1024

---

## SUMMARY

| Test Suite | Scenarios | Focus Area |
|-----------|-----------|-----------|
| 1. Menu Navigation | 5 | AC1 - Top-right menu access |
| 2. MEALS Access | 5 | AC2 - MEALS section navigation |
| 3. Cooked Food Menu | 6 | AC3 - Menu display and performance |
| 4. Breakfast Category | 5 | AC4 - Breakfast category selection |
| 5. Item Selection | 6 | AC5 - Item details and selection |
| 6. Item Removal | 8 | AC6 - Deselection functionality |
| 7. Happy Path & Edge Cases | 4 | Complete workflow and edge scenarios |
| **TOTAL** | **39 scenarios** | Comprehensive coverage |

---

## AUTOMATION READINESS

**Estimated Selectors to Identify:**
- Top-right menu button: `[data-testid="menu-btn"]` or role-based
- MEALS menu item: `[data-testid="meals-option"]`
- Breakfast category: `[data-testid="breakfast-category"]`
- Item cards: `[data-testid="meal-item"]`
- Remove buttons: `[data-testid="remove-btn"]` or `.close-icon`

**Wait Strategies:**
- Menu load: `page.waitForLoadState('networkidle')`
- Category items load: `page.waitForSelector('[data-testid="meal-item"]')`
- Item selection: Immediate visual feedback

**Performance Baseline:**
- Homepage load: 2-3s
- Menu load: 1s
- Items display: 1-2s
- Total flow: 5-7s

---

**Test Plan Created:** April 15, 2026  
**Status:** Ready for Exploratory Testing & Automation  
**Version:** 1.0.0
