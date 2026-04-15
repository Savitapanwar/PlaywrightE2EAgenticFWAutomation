# Amazon Product Search Comprehensive Test Plan

## Application Overview

Comprehensive E2E test plan for Amazon product search feature covering homepage navigation, search execution, results display, and error handling. Tests span happy path scenarios, negative cases, edge cases, and mobile viewport considerations.

## Test Scenarios

### 1. AC1: Homepage Navigation - Search Bar Visibility

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify search bar is visible at top of homepage

**File:** `tests/AC1-homepage-navigation/search-bar-visibility.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com homepage
    - expect: Page loads successfully
    - expect: Search bar is visible in the header area
    - expect: Search bar is positioned at top of page
  2. Identify and inspect search bar components
    - expect: Searchbox with 'Search Amazon' placeholder is present [ref=e90]
    - expect: Department selector dropdown is visible with 'All Departments' default option [ref=e87]
    - expect: Go button is visible and clickable [ref=e94]
  3. Verify search bar is accessible and interactive
    - expect: Search input field is focusable
    - expect: Department dropdown can be opened
    - expect: Go button responds to click events
  4. Verify header navigation elements
    - expect: Amazon logo link is present [ref=e70]
    - expect: Location selector 'Deliver to India' button is visible [ref=e73]
    - expect: Language selector is present [ref=e100]
    - expect: Account & Lists link is visible [ref=e108]
    - expect: Cart link shows item count [ref=e116]

#### 1.2. Verify search bar is responsive across different viewport sizes

**File:** `tests/AC1-homepage-navigation/search-bar-responsive.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com on desktop viewport (1920x1080)
    - expect: Search bar is fully visible
    - expect: All elements of search bar are accessible
  2. Resize to tablet viewport (768x1024)
    - expect: Search bar adapts to tablet width
    - expect: Search input field is still usable
    - expect: Go button remains clickable
  3. Resize to mobile viewport (375x667)
    - expect: Search bar is responsive on mobile
    - expect: Search input is accessible
    - expect: Dropdown and Go button are still functional

#### 1.3. Verify keyboard navigation for search bar

**File:** `tests/AC1-homepage-navigation/search-bar-keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Press Tab key multiple times to navigate to search input
    - expect: Search input receives focus via keyboard navigation
    - expect: Focus indicator is visible around search box
  3. Press Alt+/ keyboard shortcut (documented as 'Search' shortcut)
    - expect: Search box receives focus
    - expect: Keyboard shortcut triggers search input focus
  4. Tab to department dropdown and press Space/Enter
    - expect: Department dropdown opens
    - expect: Dropdown options are keyboard navigable

### 2. AC2: Search Execution - Enter Search Term and Redirect to Results

**Seed:** `tests/seed.spec.ts`

#### 2.1. Successfully search for 'water bottle' and verify redirect to results page

**File:** `tests/AC2-search-execution/successful-search.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Click on the search input field
    - expect: Search field is focused
    - expect: Cursor is active in input field
  3. Type 'water bottle' into the search field
    - expect: Text 'water bottle' appears in search input
    - expect: Autocomplete suggestions may appear below search box
  4. Click the 'Go' button to submit search
    - expect: Search is submitted
    - expect: Page navigates to results URL containing 'keyword=water+bottle'
    - expect: Results page loads successfully
  5. Verify URL contains search parameters
    - expect: URL matches pattern: https://www.amazon.com/s?k=water+bottle&...
    - expect: Search term is encoded in URL query parameter 'k'

#### 2.2. Search with different product categories

**File:** `tests/AC2-search-execution/search-with-categories.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Click on department dropdown (currently showing 'All Departments')
    - expect: Dropdown opens revealing category options: Electronics, Home & Kitchen, Sports & Outdoors, etc. [ref=e87]
  3. Select 'Sports & Outdoors' from the dropdown
    - expect: 'Sports & Outdoors' is selected in the dropdown
    - expect: Dropdown closes
  4. Type 'water bottle' in search field and click Go
    - expect: Search is executed with category filter
    - expect: Results are filtered to Sports & Outdoors category
    - expect: URL contains category parameter

#### 2.3. Search using keyboard Enter key instead of Go button

**File:** `tests/AC2-search-execution/search-with-enter-key.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Click search input and type 'water bottle'
    - expect: Search term is entered
    - expect: Text appears in search field
  3. Press Enter key to submit search
    - expect: Search is executed
    - expect: Page redirects to results page
    - expect: Results for 'water bottle' are displayed

#### 2.4. Search with multiple spaces in search term

**File:** `tests/AC2-search-execution/search-multiple-spaces.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Type 'water    bottle' (multiple spaces) in search field
    - expect: Multiple spaces are accepted in input field
  3. Submit search by clicking Go or pressing Enter
    - expect: Search is executed
    - expect: System normalizes spaces in search query
    - expect: Results page loads with relevant products
    - expect: URL contains normalized search parameters

### 3. AC3: Results Display - Show Product List with Name, Price, Image, Rating

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify all required product information is displayed

**File:** `tests/AC3-results-display/product-information-complete.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com and search for 'water bottle'
    - expect: Results page loads with product list
  2. Inspect first product item in results list
    - expect: Product image is displayed [ref=e227]
    - expect: Product name/title is visible as clickable link [ref=e253]
    - expect: Product price is displayed (e.g., 'INR 2,783.37') [ref=e273]
    - expect: Star rating is shown with number of reviews (e.g., '4.7 out of 5 stars') [ref=e261]
    - expect: Rating count is displayed as link (e.g., '(116.1K)') [ref=e267]
  3. Verify product image specifics
    - expect: Image is properly loaded and visible
    - expect: Image size is appropriate for thumbnail display
    - expect: Image has appropriate alt text for accessibility
  4. Verify product rating details
    - expect: Rating stars are displayed (e.g., 4.7)
    - expect: Rating can be clicked to view detailed reviews
    - expect: Review count is shown in parentheses
  5. Verify price presentation
    - expect: Currency symbol is displayed (INR)
    - expect: Price is formatted with decimal places
    - expect: Price is a clickable link to product details

#### 3.2. Verify additional product metadata displayed

**File:** `tests/AC3-results-display/product-metadata.spec.ts`

**Steps:**
  1. Search for 'water bottle' and view results page
    - expect: Results page loads successfully
  2. Inspect first product item for badges
    - expect: 'Amazon's Choice' badge is displayed if applicable [ref=e212]
    - expect: 'Best Seller' badge is displayed if applicable [ref=e315]
    - expect: Special tags like 'Top Reviewed for Temperature retention' [ref=e258]
    - expect: '20K+ bought in past month' note is shown [ref=e268]
  3. Verify color/variant options display
    - expect: Color options are shown as clickable links [ref=e230-e247]
    - expect: Color names are displayed (e.g., 'Very, Very Dark', 'All the Berries')
    - expect: Link to view more colors '+24 other colors/patterns' is present [ref=e251]
  4. Check delivery information
    - expect: Delivery cost and estimated date displayed [ref=e285]
    - expect: Shipping information shown (e.g., 'Ships to India') [ref=e286]
  5. Verify Add to Cart button visibility
    - expect: 'Add to cart' button is visible and clickable [ref=e300]
    - expect: Button is properly styled and accessible

#### 3.3. Verify multiple products display with consistent formatting

**File:** `tests/AC3-results-display/multiple-products-consistency.spec.ts`

**Steps:**
  1. Search for 'water bottle' and view results
    - expect: At least 2-3 product items are visible on the page [ref=e205, e305, e400]
  2. Check first product item formatting
    - expect: Product has image, name, rating, price, and delivery info
  3. Check second product item formatting
    - expect: Consistent layout and information display
    - expect: Second product has same information elements
  4. Check third product item formatting
    - expect: Third product maintains consistency
    - expect: All three items display same element types
  5. Verify all product links are clickable
    - expect: Product image links navigate to product detail page
    - expect: Product name links navigate to product detail page
    - expect: Price links navigate to product detail page

#### 3.4. Verify product results are relevant to search term

**File:** `tests/AC3-results-display/results-relevance.spec.ts`

**Steps:**
  1. Search for 'water bottle' on Amazon
    - expect: Results page loads with search term in title and heading
  2. Check multiple product items for relevance
    - expect: First result is 'Owala FreeSip Insulated Stainless Steel Water Bottle' - water bottle product [ref=e253]
    - expect: Second result is another water bottle variant - relevant result [ref=e348]
    - expect: Third result is 'Insulated Water Bottle with Handle' - relevant result [ref=e431]
  3. Verify search term appears in product titles or descriptions
    - expect: Most product titles contain 'water bottle' or related keywords
    - expect: Results are topically relevant to search query

### 4. AC4: Error Handling - Handle Empty and Invalid Search Terms

**Seed:** `tests/seed.spec.ts`

#### 4.1. Handle empty search submission

**File:** `tests/AC4-error-handling/empty-search.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Leave search field empty (don't type anything)
    - expect: Search field remains empty
  3. Click the 'Go' button without entering any text
    - expect: Application handles empty search gracefully
    - expect: Either: (a) No search is executed and user stays on homepage, OR (b) Search results page shows message indicating no search term provided, OR (c) Results show popular/general products
  4. Observe page state and error messages
    - expect: No JavaScript errors in browser console
    - expect: User experience is not disrupted

#### 4.2. Handle search with only whitespace

**File:** `tests/AC4-error-handling/whitespace-search.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Click search field and type only spaces '    '
    - expect: Spaces are entered in search field
  3. Submit search by clicking Go
    - expect: System recognizes whitespace-only as empty search
    - expect: Application handles gracefully (same as empty search case)
    - expect: No results or appropriate error message shown

#### 4.3. Handle search with special characters and HTML-like syntax

**File:** `tests/AC4-error-handling/special-characters.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Type XSS-like input '<script>alert(1)</script>' in search field
    - expect: Special characters are accepted (or escaped properly)
    - expect: Search field displays the input safely
  3. Submit the search
    - expect: No JavaScript execution occurs
    - expect: Characters are treated as literal search term
    - expect: No browser alerts or errors appear
    - expect: Results page loads safely
  4. Verify URL encoding
    - expect: Special characters are properly URL encoded in query parameters

#### 4.4. Handle search with very long search terms

**File:** `tests/AC4-error-handling/very-long-search-term.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Type a very long search term (500+ characters): 'water bottle this is a very long search query that contains many words and is designed to test the limits of the search functionality to see how the system handles extremely long input strings' repeated multiple times
    - expect: Search field accepts the long input (or truncates at reasonable limit)
    - expect: No application crash occurs
  3. Submit the search
    - expect: Search either succeeds with no results or succeeds with approximate matches
    - expect: Page handles long query gracefully
    - expect: No 414 (URI Too Long) error occurs

#### 4.5. Handle search with SQL injection-like inputs

**File:** `tests/AC4-error-handling/sql-injection-attempt.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Type SQL injection attempt "water bottle'; DROP TABLE products; --" in search field
    - expect: Input is accepted as literal text
  3. Submit search
    - expect: Search is processed safely
    - expect: No database errors or exposures occur
    - expect: Results page shows no results for this literal string or appropriate message
    - expect: No special privileges or unauthorized data access

#### 4.6. Handle rapid successive searches

**File:** `tests/AC4-error-handling/rapid-searches.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads successfully
  2. Search for 'water' and wait for results page
    - expect: Results page loads for 'water'
  3. Immediately update search box with 'bottle' and submit again without waiting
    - expect: New search for 'bottle' is processed
    - expect: Previous search request is cancelled or ignored
    - expect: Results update to show 'bottle' results
  4. Repeat rapid searches 3-4 times in succession
    - expect: System handles multiple rapid requests gracefully
    - expect: No race conditions or stale results appear
    - expect: Most recent search results are displayed

#### 4.7. Handle search with no network connectivity

**File:** `tests/AC4-error-handling/network-error.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com and load successfully
    - expect: Homepage displays
  2. Simulate network disconnection (offline mode)
    - expect: Network simulated as offline
  3. Type 'water bottle' and attempt to search
    - expect: Search submission fails gracefully
    - expect: Error message or indication is shown to user
    - expect: No infinite loading or hung page state
  4. Restore network connectivity
    - expect: User can retry search
    - expect: Search succeeds once connectivity restored

### 5. Happy Path - Complete Search Flow

**Seed:** `tests/seed.spec.ts`

#### 5.1. User successfully completes full search and views product details

**File:** `tests/happy-path/complete-search-flow.spec.ts`

**Steps:**
  1. User navigates to https://www.amazon.com
    - expect: Homepage loads successfully with search bar visible at top
  2. User clicks on search input field
    - expect: Search field is focused and ready for input
  3. User types 'water bottle' search term
    - expect: Text 'water bottle' appears in search input field
  4. User clicks 'Go' button to submit search
    - expect: Page redirects to search results page
    - expect: URL contains 'water+bottle' parameter
  5. Verify results page displays correctly
    - expect: Page title shows 'Amazon.com : water bottle'
    - expect: Results heading states 'Results'
    - expect: At least 10+ products are visible
  6. User inspects first product (Owala FreeSip Water Bottle)
    - expect: Product image 'Owala' bottle is visible
    - expect: Product title: 'Owala FreeSip Insulated Stainless Steel Water Bottle with Straw, BPA-Free Sports Water Bottle, Great for Travel, 24 Oz, Very, Very Dark'
    - expect: Price: 'INR 2,783.37'
    - expect: Rating: '4.7' with '116,110 ratings' link
    - expect: Amazon's Choice badge visible
  7. User clicks on product image or name to view details
    - expect: Product detail page loads
    - expect: URL contains product ASIN/ID
    - expect: Product page shows all specifications and reviews
  8. User notices delivery information and product options
    - expect: Delivery date 'Thu, Apr 30' is displayed
    - expect: Shipping details 'Ships to India' shown
    - expect: Color options available for selection
    - expect: 'Add to cart' button is ready

### 6. Edge Cases - Basic Edge Case Testing

**Seed:** `tests/seed.spec.ts`

#### 6.1. Search on mobile viewport (375x667)

**File:** `tests/edge-cases/mobile-viewport-search.spec.ts`

**Steps:**
  1. Set viewport to mobile size (375px width, 667px height)
    - expect: Mobile viewport is set
  2. Navigate to https://www.amazon.com
    - expect: Homepage loads
    - expect: Search bar is visible and responsive
    - expect: Layout adapts to mobile screen
  3. Type 'water bottle' in search field
    - expect: Mobile keyboard may appear
    - expect: Input is captured correctly
  4. Submit search by pressing Enter or tapping Go button
    - expect: Results page loads on mobile
    - expect: Search results display in mobile-optimized layout
    - expect: Products are readable on small screen
  5. Verify product information is accessible on mobile
    - expect: Product image is visible
    - expect: Product name is readable
    - expect: Price is clearly visible
    - expect: Rating information is accessible

#### 6.2. Search immediately after page load without delay

**File:** `tests/edge-cases/immediate-search.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Navigation initiated
  2. As soon as page begins loading, click search field and type 'water bottle'
    - expect: Search field is eventually focused and accepts input
  3. Submit search before page fully loads
    - expect: Search is either queued or processed gracefully
    - expect: Navigation to results succeeds
    - expect: No errors occur

#### 6.3. Search for single character term

**File:** `tests/edge-cases/single-character-search.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads
  2. Type single character 'a' in search field
    - expect: Character 'a' is entered in search field
  3. Submit search
    - expect: Search results page loads
    - expect: Results show products matching single character or products with 'a' in name/description
    - expect: No errors occur

#### 6.4. Search with numbers only

**File:** `tests/edge-cases/numeric-search.spec.ts`

**Steps:**
  1. Navigate to https://www.amazon.com
    - expect: Homepage loads
  2. Type '12345' in search field
    - expect: Numeric text is entered
  3. Submit search
    - expect: Results page loads
    - expect: Products matching numeric search or ASIN/product numbers may display
    - expect: Search processes successfully
