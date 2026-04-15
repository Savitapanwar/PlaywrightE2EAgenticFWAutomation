# IRCTC Meal Ordering Feature Test Plan

## Application Overview

Comprehensive test plan for the IRCTC Meal Ordering Feature (US-002) focusing on the Breakfast Selection user journey. This plan covers navigation from the IRCTC homepage through the top-right menu to the Cooked Food Menu, accessing the Breakfast category, viewing breakfast items, and selecting/deselecting items. The plan includes happy path scenarios, negative test cases, edge cases, mobile responsiveness testing, and accessibility validation across multiple browsers.

## Test Scenarios

### 1. AC1: Menu Navigation - Top Right Menu Access and Responsiveness

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-1.1: Top-Right Menu Button Visibility and Clickability on Desktop

**File:** `tests/meals/menu-navigation/top-right-menu-desktop.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/
    - expect: Page loads successfully
    - expect: IRCTC homepage is displayed with header
    - expect: Top-right menu button is visible in the banner area
  2. Locate the menu button in the top-right corner of the header (typically hamburger icon or menu icon)
    - expect: Menu button is clearly visible
    - expect: Menu button has proper contrast for accessibility
    - expect: Element is interactive with cursor=pointer
  3. Click on the top-right menu button
    - expect: Menu dropdown opens without delay
    - expect: Menu items are displayed
    - expect: Menu is responsive and no content is cut off
  4. Wait for menu to fully render (up to 3 seconds)
    - expect: All menu items are loaded
    - expect: No loading spinners or placeholders visible
    - expect: Menu is stable and ready for interaction
  5. Close the menu by clicking elsewhere on the page or pressing Escape key
    - expect: Menu closes properly
    - expect: Page returns to normal state
    - expect: Menu can be opened again

#### 1.2. TC-1.2: Top-Right Menu Button Visibility and Clickability on Mobile (375x667 viewport)

**File:** `tests/meals/menu-navigation/top-right-menu-mobile.spec.ts`

**Steps:**
  1. Set browser viewport to mobile size (375x667)
    - expect: Viewport is set correctly
    - expect: Page adjusts to mobile layout
  2. Navigate to https://www.irctc.co.in/
    - expect: IRCTC homepage loads in mobile view
    - expect: Top-right menu button is visible and appropriately sized for mobile
    - expect: Minimum touch target size is 44x44 pixels per WCAG guidelines
  3. Click on the mobile menu button
    - expect: Menu opens without delay (< 2 seconds)
    - expect: Menu items are visible and properly organized
    - expect: Menu does not obscure critical page content
  4. Verify menu responsiveness with vertical scroll if needed
    - expect: Menu is scrollable if content exceeds viewport
    - expect: All menu items remain accessible
    - expect: Scroll performance is smooth

#### 1.3. TC-1.3: Menu Button Accessibility with Keyboard Navigation

**File:** `tests/meals/menu-navigation/menu-keyboard-accessibility.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/
    - expect: HomePage loads successfully
  2. Press Tab key multiple times to navigate through focusable elements until reaching the menu button
    - expect: Menu button receives keyboard focus
    - expect: Focus indicator is visible around menu button
    - expect: Focus indicator meets WCAG contrast requirements
  3. Press Enter or Space key to activate the menu button
    - expect: Menu opens via keyboard activation
    - expect: Menu opens same way as mouse click
  4. Press Escape key to close the menu
    - expect: Menu closes
    - expect: Focus returns to menu button or previous focused element

#### 1.4. TC-1.4: Menu Button Fails to Load - Error Handling

**File:** `tests/meals/menu-navigation/menu-load-failure.spec.ts`

**Steps:**
  1. Simulate network delay or failure by opening browser DevTools and throttling network connection to 'Offline'
    - expect: Menu button is still visible and clickable
  2. Attempt to click on the menu button while offline
    - expect: Application handles the error gracefully
    - expect: Error message is displayed to user or menu shows cached content
    - expect: No JavaScript errors in console
  3. Restore network connection
    - expect: Menu becomes functional again
    - expect: User can successfully open menu

#### 1.5. TC-1.5: Menu Navigation with Multiple Rapid Clicks

**File:** `tests/meals/menu-navigation/rapid-menu-clicks.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/
    - expect: Homepage loads successfully
  2. Rapidly click the menu button 5-10 times in succession
    - expect: Menu opens and closes properly
    - expect: No duplicate menus are created
    - expect: No race condition issues
    - expect: Application remains stable
  3. Verify menu state after rapid interactions
    - expect: Menu is in expected state
    - expect: No orphaned DOM elements
    - expect: Application responsive to subsequent interactions

### 2. AC2: MEALS Section Access - Finding and Accessing MEALS Option

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC-2.1: MEALS Option Visible in Main Menu

**File:** `tests/meals/meals-section/meals-option-visibility.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/
    - expect: IRCTC homepage loads
  2. Click on the top-right menu button
    - expect: Menu opens and displays list of options including MEALS
  3. Verify MEALS option is clearly labeled in the menu
    - expect: MEALS text is visible
    - expect: MEALS option is positioned logically in the menu
    - expect: No visual obstructions covering MEALS text
  4. Verify MEALS option styling and differentiation from other menu items
    - expect: MEALS is appropriately styled
    - expect: Text color contrast meets WCAG AA standards (4.5:1)
    - expect: MEALS is distinguishable from other menu items like TRAINS, LOYALTY

#### 2.2. TC-2.2: MEALS Submenu Expansion and Item Display

**File:** `tests/meals/meals-section/meals-submenu-expansion.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/ and open the main menu
    - expect: Main menu is open
  2. Click or hover over the MEALS option to expand submenu
    - expect: MEALS submenu expands
    - expect: Submenu items appear with appropriate animation (if any)
    - expect: Submenu expands within 1-2 seconds
  3. Verify all MEALS submenu options are displayed: 'Book Food – E-Pantry', 'Order Food - E-Catering', 'Cooked Food Menu'
    - expect: All three submenu items are visible
    - expect: Each option is clickable (cursor=pointer)
    - expect: No items are cut off or hidden
  4. Verify the order and arrangement of submenu items
    - expect: Items are logically ordered
    - expect: Submenu layout is consistent across browser sizes

#### 2.3. TC-2.3: MEALS Option Click Behavior

**File:** `tests/meals/meals-section/meals-click-behavior.spec.ts`

**Steps:**
  1. Open IRCTC homepage and access main menu
    - expect: Main menu is open
  2. Click directly on the MEALS text/label
    - expect: MEALS submenu expands showing submenus
    - expect: Menu does not navigate away from current page
    - expect: Current page context is maintained
  3. Click on MEALS again to verify toggle behavior
    - expect: MEALS submenu collapses
    - expect: Submenu can be expanded again without issues

#### 2.4. TC-2.4: MEALS Section Accessibility with Screen Reader

**File:** `tests/meals/meals-section/meals-accessibility-screen-reader.spec.ts`

**Steps:**
  1. Navigate to homepage and open main menu
    - expect: Main menu is accessible via keyboard
  2. Use Tab or arrow keys to navigate to MEALS option
    - expect: MEALS option receives focus
    - expect: Focus indicator is visible
    - expect: MEALS label is announced by screen reader
  3. Press Enter to expand MEALS submenu
    - expect: Submenu expands
    - expect: Screen reader announces submenu items
    - expect: aria-expanded attribute changes to 'true'
  4. Navigate through submenu items with arrow keys
    - expect: Each submenu item receives focus
    - expect: Focus indicator moves smoothly through items
    - expect: All items are properly announced by screen reader

#### 2.5. TC-2.5: MEALS Section with Dynamic Content Loading

**File:** `tests/meals/meals-section/meals-dynamic-loading.spec.ts`

**Steps:**
  1. Open browser DevTools Network tab and monitor requests
    - expect: DevTools is open and ready
  2. Navigate to IRCTC homepage and open main menu
    - expect: Menu opens successfully
  3. Check if MEALS submenu items are loaded immediately or fetched dynamically
    - expect: Network requests are reasonable (< 2 MB total)
    - expect: No console errors related to loading MEALS content
    - expect: MEALS submenu appears within acceptable time (< 2 seconds)

### 3. AC3: Cooked Food Menu Display and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC-3.1: Cooked Food Menu Link Navigation

**File:** `tests/meals/cooked-food-menu/cooked-food-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/
    - expect: IRCTC homepage loads
  2. Open main menu and expand MEALS submenu
    - expect: MEALS submenu is expanded
  3. Click on 'Cooked Food Menu' link
    - expect: Page navigates to Cooked Food Menu page (http://menurates.irctc.co.in/)
    - expect: Page loads successfully within 3 seconds
    - expect: New page displays menu structure
  4. Verify page title and heading indicate Cooked Food Menu
    - expect: Page title contains 'Menu' or 'Cooked Food'
    - expect: Main heading on page identifies this as menu page
    - expect: IRCTC branding is visible

#### 3.2. TC-3.2: Cooked Food Menu Page Layout and Content Structure

**File:** `tests/meals/cooked-food-menu/menu-page-layout.spec.ts`

**Steps:**
  1. Navigate to Cooked Food Menu page (http://menurates.irctc.co.in/)
    - expect: Page loads successfully
  2. Verify page header with IRCTC logo and branding
    - expect: IRCTC logo is displayed
    - expect: Page title is visible
    - expect: Header layout is professional and clear
  3. Verify menu category navigation buttons are visible
    - expect: Category buttons are displayed (Mail/Express/Humsafar Menu, Rajdhani/Shatabdi, etc.)
    - expect: Buttons are clearly labeled
    - expect: Layout is organized and scannable
  4. Verify language selection and Contact Us option are accessible
    - expect: Language selector dropdown is visible
    - expect: Contact Us link is present and clickable
  5. Verify page footer if applicable
    - expect: Footer contains relevant information
    - expect: Footer is not obstructing content
    - expect: Footer links are accessible

#### 3.3. TC-3.3: Menu Category Navigation from Cooked Food Menu

**File:** `tests/meals/cooked-food-menu/menu-category-navigation.spec.ts`

**Steps:**
  1. Navigate to Cooked Food Menu page
    - expect: Menu page is loaded
  2. Identify and locate the Breakfast category button in the menu
    - expect: Breakfast button is visible among other category buttons
    - expect: Button is interactive and clickable
  3. Verify other menu categories are accessible (Beverages, Meals, A-la-Carte, etc.)
    - expect: All menu categories are displayed
    - expect: Categories are logically grouped (Mail/Express, Rajdhani, etc.)
    - expect: No categories are hidden or inaccessible
  4. Verify menu category buttons have consistent styling
    - expect: Buttons have consistent size and appearance
    - expect: Hover/focus states are visually distinct
    - expect: Button states are accessible to keyboard users

#### 3.4. TC-3.4: Cooked Food Menu Page Loading Performance

**File:** `tests/meals/cooked-food-menu/menu-page-performance.spec.ts`

**Steps:**
  1. Clear browser cache and cookies
    - expect: Cache is cleared
  2. Open browser DevTools and go to Network tab
    - expect: Network monitoring is active
  3. Navigate to http://menurates.irctc.co.in/
    - expect: Page load time is under 3 seconds (DOMContentLoaded)
    - expect: Total resource size is reasonable (< 5 MB)
    - expect: All images and resources load successfully
    - expect: No failed requests (404, 500 errors)
  4. Check page performance metrics
    - expect: Largest Contentful Paint (LCP) is under 2.5 seconds
    - expect: No layout shift issues (Cumulative Layout Shift < 0.1)
    - expect: Page is interactive (Time to Interactive < 3.5 seconds)

#### 3.5. TC-3.5: Cooked Food Menu Accessibility

**File:** `tests/meals/cooked-food-menu/menu-page-accessibility.spec.ts`

**Steps:**
  1. Navigate to Cooked Food Menu page
    - expect: Page loads successfully
  2. Use Tab key to navigate through all interactive elements on the page
    - expect: All buttons and links receive focus
    - expect: Focus order is logical and follows visual layout
    - expect: Focus indicator is visible on all elements
  3. Verify heading hierarchy (H1, H2, H3, etc.)
    - expect: Single H1 heading on page
    - expect: Headings follow logical order without skipping levels
    - expect: Heading structure accurately reflects content organization
  4. Check color contrast of text against backgrounds
    - expect: All text meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
    - expect: No text is invisible or nearly invisible
  5. Verify images have appropriate alt text
    - expect: IRCTC logo has alt text
    - expect: Category icons have descriptive alt text
    - expect: Decorative images have empty alt text

#### 3.6. TC-3.6: Cooked Food Menu Mobile Responsiveness

**File:** `tests/meals/cooked-food-menu/menu-mobile-responsive.spec.ts`

**Steps:**
  1. Set browser viewport to mobile (375x667)
    - expect: Viewport is set correctly
  2. Navigate to http://menurates.irctc.co.in/
    - expect: Page loads in mobile view
    - expect: Content is readable without horizontal scrolling
    - expect: Text size is appropriate for mobile
  3. Verify menu categories are accessible on mobile
    - expect: Category buttons are visible
    - expect: Touch targets are minimum 44x44 pixels
    - expect: Categories are not overcrowded
  4. Test with tablet viewport (768x1024)
    - expect: Page layout adjusts for tablet
    - expect: Content remains readable
    - expect: All elements are properly sized for tablet

### 4. AC4: Breakfast Menu Category Access

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC-4.1: Breakfast Category Button Visibility and Location

**File:** `tests/meals/breakfast-category/breakfast-visibility.spec.ts`

**Steps:**
  1. Navigate to http://menurates.irctc.co.in/
    - expect: Cooked Food Menu page loads
  2. Locate the Breakfast category button in the Mail/Express/Humsafar Menu section
    - expect: Breakfast button is clearly visible
    - expect: Breakfast is in the main menu categories section
    - expect: Button location is consistent with other category buttons
  3. Verify Breakfast button styling and appearance
    - expect: Button has icon representing breakfast (toast, plate, etc.)
    - expect: Button text 'Breakfast' is clearly readable
    - expect: Button styling matches other category buttons

#### 4.2. TC-4.2: Click on Breakfast Category to Load Breakfast Menu

**File:** `tests/meals/breakfast-category/breakfast-click.spec.ts`

**Steps:**
  1. Navigate to http://menurates.irctc.co.in/
    - expect: Cooked Food Menu page loads
  2. Click on the Breakfast category button
    - expect: Breakfast menu modal/panel opens within 2 seconds
    - expect: Modal displays breakfast items in a table format
    - expect: Modal is not obscuring critical page content
    - expect: Close button (X) is visible on the modal
  3. Verify breakfast menu header shows 'Breakfast'
    - expect: Modal heading displays 'Breakfast'
    - expect: Tax information is displayed (Incl. of Taxes)
    - expect: Column headers show: Item, At Station, In Train

#### 4.3. TC-4.3: Breakfast Menu Modal Display Properties

**File:** `tests/meals/breakfast-category/breakfast-modal-properties.spec.ts`

**Steps:**
  1. Click on Breakfast category to open breakfast menu modal
    - expect: Modal is displayed
  2. Verify modal dimensions and positioning
    - expect: Modal is centered on screen
    - expect: Modal dimensions are appropriate for content (not too large/small)
    - expect: Modal does not exceed viewport boundaries
  3. Verify modal backdrop/overlay behavior
    - expect: Semi-transparent overlay covers background page
    - expect: Background page is still partially visible for context
    - expect: User can identify they are still on the meals page
  4. Verify modal zIndex and layering
    - expect: Modal appears on top of page content
    - expect: No other elements overlap the modal content
    - expect: Modal header and close button are always visible

#### 4.4. TC-4.4: Breakfast Category Accessibility

**File:** `tests/meals/breakfast-category/breakfast-accessibility.spec.ts`

**Steps:**
  1. Navigate to Cooked Food Menu page
    - expect: Menu page loads
  2. Use Tab key to navigate to Breakfast category button
    - expect: Breakfast button receives keyboard focus
    - expect: Focus indicator is visible
    - expect: Button is announced by screen reader
  3. Press Enter to activate Breakfast category
    - expect: Breakfast menu modal opens
    - expect: Modal receives focus
    - expect: Screen reader announces modal content
  4. Verify modal is marked as dialog with proper ARIA attributes
    - expect: Modal has role='dialog' or similar
    - expect: Modal has aria-modal='true'
    - expect: Modal has descriptive aria-label or aria-labelledby
  5. Press Escape key to close breakfast modal
    - expect: Modal closes
    - expect: Focus returns to Breakfast button
    - expect: Page returns to normal state

#### 4.5. TC-4.5: Multiple Category Navigation - Breakfast to Another Category

**File:** `tests/meals/breakfast-category/category-switching.spec.ts`

**Steps:**
  1. Navigate to Cooked Food Menu and open Breakfast menu
    - expect: Breakfast menu modal is open
  2. Close the Breakfast menu modal by clicking the close button (X)
    - expect: Modal closes successfully
    - expect: Page returns to menu choice view
  3. Click on Beverages category button
    - expect: Beverages menu opens without errors
    - expect: Breakfast menu is completely closed
    - expect: No duplicate menus are open
  4. Go back to Breakfast category again
    - expect: Breakfast menu opens again without issues
    - expect: Menu shows same items as before
    - expect: No data persistence issues

### 5. AC5: Breakfast Item Selection - Viewing Items with Details

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC-5.1: Breakfast Items Display with Complete Details

**File:** `tests/meals/breakfast-items/items-display.spec.ts`

**Steps:**
  1. Navigate to http://menurates.irctc.co.in/ and click on Breakfast category
    - expect: Breakfast menu modal opens
  2. Verify breakfast menu table displays columns: Item, At Station, In Train
    - expect: All three columns are visible
    - expect: Column headers are clearly labeled
    - expect: Columns are properly aligned
  3. Verify first breakfast item: 'Veg Break fast (Cutlet)' with full details
    - expect: Item shows: Bread Slice (2nos) 50 gms, Veg cutlet (2nos) 100 gms, Butter 8gms, Tomato ketchup, Casserole, Napkin, Disposable spoon
    - expect: At Station price: ₹35
    - expect: In Train price: ₹40
    - expect: Veg icon is displayed
  4. Verify second item: 'Veg Break fast (Idli & Vada)' with complete details
    - expect: Item details include: Idli (2nos) 100gms, Vada (2nos) 60 gms, Chutney 50 gms, accessories
    - expect: At Station price: ₹35
    - expect: In Train price: ₹40
  5. Scroll through all breakfast items and verify each has complete information
    - expect: All items contain: item name, ingredients/components, sizes, prices
    - expect: No truncated or missing information
    - expect: All items are clearly readable

#### 5.2. TC-5.2: Veg vs Non-Veg Item Differentiation

**File:** `tests/meals/breakfast-items/veg-nonveg-differentiation.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Menu displays breakfast items
  2. Identify all vegetarian items (Veg Break fast - Cutlet, Idli & Vada, Upma & Vada, Pongal & Vada)
    - expect: Veg items are clearly marked with veg icon (green dot/leaf)
    - expect: Veg items are visually distinct from non-veg items
  3. Identify all non-vegetarian items (Egg Omelette, Fish/Meat items if present)
    - expect: Non-veg items are marked with non-veg icon (red/brown icon)
    - expect: Non-veg items are visually distinct
    - expect: Icons follow standard IRCTC convention
  4. Verify items are not mislabeled
    - expect: Veg items do not have non-veg icon
    - expect: Non-veg items do not have veg icon
    - expect: Item names match their assigned icons

#### 5.3. TC-5.3: Price Display - At Station vs In Train

**File:** `tests/meals/breakfast-items/price-display.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Breakfast items are displayed
  2. Verify 'At Station' column shows correct prices for all items
    - expect: Veg items show ₹35 at station
    - expect: Non-veg items show ₹45 at station
    - expect: Prices are clearly visible and formatted with currency symbol
  3. Verify 'In Train' column shows correct prices
    - expect: Veg items show ₹40 in train
    - expect: Non-veg items show ₹50 in train
    - expect: Prices are properly formatted
  4. Verify price differences between At Station and In Train are logical
    - expect: In Train prices are higher than At Station prices
    - expect: Price difference is consistent (₹5 for most items)
    - expect: Prices are reasonable for meal service
  5. Verify tax information is displayed at table top
    - expect: Header shows 'Incl. of Taxes'
    - expect: Users understand prices are inclusive of taxes

#### 5.4. TC-5.4: Breakfast Item Names and Descriptions Readability

**File:** `tests/meals/breakfast-items/item-names-readability.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Menu displays items
  2. Verify item name font size and contrast
    - expect: Item names are readable with good contrast (4.5:1 or higher)
    - expect: Font size is appropriate for the modal
    - expect: No text is blurry or distorted
  3. Verify ingredient/component descriptions are complete and legible
    - expect: All components are listed clearly
    - expect: Quantities are shown (gms, nos)
    - expect: No abbreviations without explanation
  4. Test with Very Long Item Name (if present)
    - expect: Text wraps properly within table cell
    - expect: No text overflow or truncation
    - expect: All content remains readable
  5. Test with different browser zoom levels (75%, 100%, 150%)
    - expect: Content remains readable at all zoom levels
    - expect: Table layout adapts appropriately
    - expect: No horizontal scrolling needed at 100% zoom for HD displays

#### 5.5. TC-5.5: Breakfast Items Type and Variety Coverage

**File:** `tests/meals/breakfast-items/item-variety.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: All breakfast items are displayed
  2. Verify at least 4 different veg breakfast options are available
    - expect: Options include: Cutlet, Idli & Vada, Upma & Vada, Pongal & Vada or similar
    - expect: Variety covers different breakfast styles/regions
  3. Verify non-veg breakfast options are available
    - expect: Egg-based options are present (Omelette, Boiled Eggs)
    - expect: At least 1 non-veg item is available
  4. Verify items are typical breakfast food items
    - expect: Items are appropriate for morning meal
    - expect: Items align with Indian railway catering standards
  5. Count total number of breakfast items displayed
    - expect: At least 5-6 items are available
    - expect: Number is reasonable for selection

#### 5.6. TC-5.6: Breakfast Items Scroll and Overflow Handling

**File:** `tests/meals/breakfast-items/items-scroll.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Modal displays items
  2. Check if all items fit within modal viewport
    - expect: All items are visible without scrolling (if few items)
    - expect: If scrolling needed, scrollbar is visible and functional
  3. If scrolling is available, scroll down through items
    - expect: Scroll is smooth and responsive
    - expect: All items become visible
    - expect: No items are cut off
  4. Verify table header remains visible while scrolling (sticky header if applicable)
    - expect: Column headers (Item, At Station, In Train) remain visible at top
    - expect: Users can always reference price columns

### 6. AC6: Breakfast Item Removal/Deselection - Cross Button Functionality

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC-6.1: Modal Close Button (X) Visibility and Location

**File:** `tests/meals/item-removal/close-button-visibility.spec.ts`

**Steps:**
  1. Navigate to Cooked Food Menu and open Breakfast menu
    - expect: Breakfast menu modal is open
  2. Locate the close button (X) in the modal header
    - expect: X button is visible in top-right corner of modal
    - expect: Button is clearly distinguishable from other elements
    - expect: X icon is standard and recognizable
  3. Verify close button styling and color
    - expect: Button has red/red-tinted background or stands out visually
    - expect: Button size is appropriate for clicking (minimum 24x24 pixels)
    - expect: Button has clear visual state (hover, focus)

#### 6.2. TC-6.2: Close Button (X) Click Functionality

**File:** `tests/meals/item-removal/close-button-click.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Modal is fully loaded and displayed
  2. Click on the X close button in modal header
    - expect: Modal closes smoothly without animation issues
    - expect: Breakfast menu disappears from view
    - expect: Page returns to Cooked Food Menu main view
  3. Verify page state after closing
    - expect: Background page is fully visible
    - expect: Menu category buttons are accessible again
    - expect: No modal remnants or overlays remaining

#### 6.3. TC-6.3: Close Button (X) Keyboard Accessibility

**File:** `tests/meals/item-removal/close-button-keyboard.spec.ts`

**Steps:**
  1. Open Breakfast menu modal using keyboard (Tab + Enter)
    - expect: Modal opens and receives focus
  2. Use Tab key to navigate to close button (X)
    - expect: Close button receives keyboard focus
    - expect: Focus indicator is visible around X button
  3. Press Enter or Space to activate close button
    - expect: Modal closes via keyboard activation
    - expect: Same result as mouse click
    - expect: Focus returns to Breakfast category button

#### 6.4. TC-6.4: Escape Key to Close Modal

**File:** `tests/meals/item-removal/escape-key-close.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Modal is displayed and in focus
  2. Press Escape key
    - expect: Modal closes immediately
    - expect: No delay in closing
    - expect: Page returns to menu view
  3. Open modal again and verify Escape key works consistently
    - expect: Escape closes modal every time
    - expect: Behavior is consistent

#### 6.5. TC-6.5: Background Click to Close Modal (Click Outside)

**File:** `tests/meals/item-removal/background-click-close.spec.ts`

**Steps:**
  1. Open Breakfast menu modal
    - expect: Modal is displayed with semi-transparent overlay
  2. Click on the semi-transparent background/overlay area
    - expect: Modal closes
    - expect: Background click closes modal (if implemented)
    - expect: User can dismiss modal without reaching close button

#### 6.6. TC-6.6: Multiple Open/Close Cycles - State Management

**File:** `tests/meals/item-removal/multiple-close-cycles.spec.ts`

**Steps:**
  1. Open Breakfast menu modal by clicking category button
    - expect: First modal opens successfully
  2. Close modal using X button
    - expect: Modal closes
  3. Open Breakfast menu again by clicking category button
    - expect: Second modal opens successfully
    - expect: Modal content is identical to first opening
    - expect: No state persistence issues
  4. Repeat open/close cycle 5 times
    - expect: Modal opens and closes reliably every time
    - expect: No memory leaks or orphaned elements
    - expect: Application remains responsive
  5. Open modal, switch to different category, and return to Breakfast
    - expect: Breakfast menu reappears with correct content
    - expect: Previous selections or state are not persisted (if applicable)

#### 6.7. TC-6.7: Close Button Behavior on Mobile (Small Viewport)

**File:** `tests/meals/item-removal/close-button-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile size (375x667)
    - expect: Mobile layout is active
  2. Navigate to Breakfast menu and open modal
    - expect: Modal opens in mobile view
  3. Verify close button (X) is properly positioned and sized for mobile
    - expect: X button is visible at top-right of modal
    - expect: Button is at least 44x44 pixels (touch target size)
    - expect: Button does not overlap modal content
  4. Tap close button on mobile device or emulator
    - expect: Modal closes smoothly
    - expect: No accidental double-closes or glitches

#### 6.8. TC-6.8: Close Button with Network Latency

**File:** `tests/meals/item-removal/close-button-latency.spec.ts`

**Steps:**
  1. Use DevTools to throttle network to Slow 3G (400 Kbps down, 400 Kbps up)
    - expect: Network throttling is applied
  2. Open Breakfast menu modal
    - expect: Modal loads even with latency
  3. Click close button (X) multiple times rapidly
    - expect: Modal closes despite network latency
    - expect: No race conditions or multiple closes
    - expect: Button click is registered immediately
  4. Verify consistency of close button behavior under slow network
    - expect: Close button responds to clicks without network impact
    - expect: Button action is client-side and not dependent on server

### 7. Additional Test Scenarios: Edge Cases and Cross-Browser

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC-7.1: Complete Happy Path - Full Navigation Flow

**File:** `tests/meals/happy-path/full-navigation-flow.spec.ts`

**Steps:**
  1. Navigate to https://www.irctc.co.in/
    - expect: IRCTC homepage loads successfully
  2. Click on top-right menu button
    - expect: Main menu opens
  3. Click on MEALS option to expand submenu
    - expect: MEALS submenu expands showing 3 options
  4. Click on 'Cooked Food Menu' link
    - expect: Navigates to http://menurates.irctc.co.in/
  5. Wait for menu page to fully load
    - expect: Page loads within 3 seconds
  6. Click on Breakfast category button
    - expect: Breakfast menu modal opens
  7. Verify all 5-6 breakfast items are displayed with prices
    - expect: Items include both veg and non-veg options
    - expect: Prices are shown for At Station and In Train
    - expect: All items are readable
  8. Review item details (components, sizes, prices)
    - expect: Complete item information is visible
  9. Close breakfast modal using X button
    - expect: Modal closes successfully
  10. Verify user can reopen Breakfast menu or access other categories
    - expect: System is stable and responsive
    - expect: Full navigation flow completes successfully

#### 7.2. TC-7.2: Empty Breakfast Menu Handling

**File:** `tests/meals/edge-cases/empty-menu-handling.spec.ts`

**Steps:**
  1. Simulate scenario where breakfast items data is not loaded or empty
    - expect: Simulation setup completes
  2. Click on Breakfast category
    - expect: Modal opens
  3. Verify application handles empty menu gracefully
    - expect: Modal displays message like 'No items available' or 'Loading...'
    - expect: No JavaScript errors in console
    - expect: Modal close button still functions
    - expect: User is informed of the situation

#### 7.3. TC-7.3: Rapid Menu Category Switching

**File:** `tests/meals/edge-cases/rapid-switching.spec.ts`

**Steps:**
  1. Open Cooked Food Menu page
    - expect: Menu page loads
  2. Rapidly click through different categories: Breakfast → Beverages → Meal Snacks → Breakfast → Beverages (3-4 cycles)
    - expect: Each category opens correctly
    - expect: No data mixing between categories
    - expect: Application remains stable
    - expect: No orphaned modals or overlays

#### 7.4. TC-7.4: Cross-Browser Testing - Firefox

**File:** `tests/meals/cross-browser/firefox-compatibility.spec.ts`

**Steps:**
  1. Open IRCTC website in Mozilla Firefox browser
    - expect: Page loads in Firefox
  2. Navigate through complete MEALS → Cooked Food Menu → Breakfast flow
    - expect: All steps work identically to Chrome
    - expect: No visual glitches or rendering issues
    - expect: Modals display correctly
  3. Test close button functionality in Firefox
    - expect: X button works reliably
    - expect: Close behavior is consistent with Chrome
  4. Verify text is readable and properly formatted in Firefox
    - expect: No font rendering issues
    - expect: Colors and contrast are correct
    - expect: Layout is responsive

#### 7.5. TC-7.5: Cross-Browser Testing - Safari

**File:** `tests/meals/cross-browser/safari-compatibility.spec.ts`

**Steps:**
  1. Open IRCTC website in Safari browser (macOS/iOS)
    - expect: Page loads in Safari
  2. Navigate through MEALS → Cooked Food Menu → Breakfast flow
    - expect: All steps work correctly in Safari
    - expect: No Safari-specific rendering issues
  3. Test modal open/close functionality
    - expect: Breakfast menu modal opens/closes correctly
    - expect: No animation glitches
    - expect: Touch events work on iOS Safari
  4. Verify price display and item information formatting
    - expect: Currency symbols display correctly
    - expect: Table layout renders properly
    - expect: No horizontal scrolling needed

#### 7.6. TC-7.6: Tablet Viewport Testing (768x1024)

**File:** `tests/meals/responsive/tablet-viewport.spec.ts`

**Steps:**
  1. Set browser viewport to tablet size (768x1024)
    - expect: Tablet layout is active
  2. Navigate to IRCTC homepage
    - expect: Page loads in tablet view
    - expect: Layout is optimized for tablet
  3. Complete MEALS → Cooked Food Menu → Breakfast navigation
    - expect: All elements are visible and properly sized
    - expect: Touch targets are adequate (44x44 minimum)
    - expect: No content is hidden or inaccessible
  4. Verify breakfast menu modal on tablet viewport
    - expect: Modal is appropriately sized
    - expect: Table columns are readable
    - expect: Close button is positioned correctly

#### 7.7. TC-7.7: Breakfast Menu with Different Item Counts

**File:** `tests/meals/edge-cases/varying-item-counts.spec.ts`

**Steps:**
  1. Verify current breakfast menu has 5-6 items
    - expect: Current count is confirmed
  2. Test if interface handles scenarios with fewer items (2-3 items)
    - expect: Modal resizes appropriately
    - expect: Table layout is still clean
    - expect: No excessive whitespace
  3. Test if interface handles scenarios with many items (10+ items)
    - expect: Scroll functionality works
    - expect: Header remains sticky
    - expect: All items are accessible

#### 7.8. TC-7.8: Item Names with Special Characters or Long Text

**File:** `tests/meals/edge-cases/special-characters-long-text.spec.ts`

**Steps:**
  1. Review all breakfast item names for special characters or very long descriptions
    - expect: Current items contain parentheses and slashes: (Cutlet), (Idli & Vada), etc.
  2. Verify items with long descriptions display correctly
    - expect: Long text wraps within table cells
    - expect: No truncation unless intentional
    - expect: Text remains readable
    - expect: No text overflow
  3. Test with browser zoom at 75%, 100%, 150%, 200%
    - expect: Items remain readable at all zoom levels
    - expect: Layout adapts without breaking
    - expect: No horizontal scrolling at 100% zoom

#### 7.9. TC-7.9: Price Format Consistency Across All Items

**File:** `tests/meals/edge-cases/price-format-consistency.spec.ts`

**Steps:**
  1. Open breakfast menu and examine all prices
    - expect: Breakfast menu displays
  2. Verify price format is consistent across all items
    - expect: All prices use ₹ symbol
    - expect: Prices are right-aligned in cells
    - expect: No missing or corrupted price data
  3. Verify decimal prices display correctly (if any)
    - expect: If prices have decimals (e.g., ₹35.50), format is consistent
    - expect: No rounding inconsistencies
  4. Verify In Train price is always higher than At Station price
    - expect: Price relationship is logical for all items

#### 7.10. TC-7.10: Modal Z-Index and Overlay Layering

**File:** `tests/meals/edge-cases/modal-layering.spec.ts`

**Steps:**
  1. Open breakfast menu modal
    - expect: Modal is displayed
  2. Verify modal appears above all other page elements
    - expect: Modal content is clearly visible
    - expect: Background page elements are behind overlay
    - expect: No elements overlap the modal
  3. Verify overlay background color and opacity
    - expect: Overlay is semi-transparent
    - expect: Background page is still visible but dimmed
    - expect: Contrast is sufficient to indicate modal is active layer
  4. Try to interact with page elements behind modal
    - expect: Page elements are not clickable through modal
    - expect: Modal has proper event handling
    - expect: Focus is trapped within modal
