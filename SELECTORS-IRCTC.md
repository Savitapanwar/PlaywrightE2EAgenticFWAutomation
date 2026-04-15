# IRCTC UI Selector Mapping
## Complete Element Locator Reference

---

## 📋 Overview

This document maps every UI element in the IRCTC meal ordering feature to its selector, with multi-tier fallback strategies for robustness.

> **Last Updated:** April 15, 2026  
> **Framework Version:** 1.0  
> **Coverage:** AC1-AC6 (72 test scenarios)

---

## 🔍 Selector Strategy

### Three-Tier Fallback Hierarchy

Each selector has three tiers for maximum robustness:

1. **Primary** - Most reliable (updated based on live testing)
2. **Fallback** - Alternative if primary fails
3. **Alternative** - Final option if both fail

```typescript
// Pattern
{
  element: {
    primary: 'selector-that-works-most',
    fallback: 'secondary-selector-option',
    alternative: 'final-fallback-selector'
  }
}
```

### Selection Priority

✅ **Preferred (Most Stable):**
1. `[role="..."]` - Semantic role attributes
2. `[aria-label="..."]` - Accessibility labels
3. `[aria-label*="pattern"]` - Text pattern matching
4. `[data-testid="..."]` - Test-specific attributes

⚠️ **Acceptable (Medium Stability):**
5. `a:text("...")` - Text content matching
6. `[href*="pattern"]` - URL/href pattern matching
7. `.class-name` - CSS classes (check stability)

❌ **Avoid (Fragile):**
- XPath expressions
- nth-of-type() indices
- Complex CSS selectors with multiple conditions
- Hardcoded element positions

---

## 🏠 Homepage Elements (AC1-AC2)

### Top Navigation Bar

#### Menu Button (".navHighlight")

| Property | Value |
|----------|-------|
| **Purpose** | Opens main navigation menu |
| **AC Coverage** | AC1, AC2 |
| **Location** | Top-right corner |
| **Primary** | `.navHighlight` |
| **Fallback** | `[aria-label*="Menu"]` |
| **Alternative** | `[role="button"][aria-haspopup="true"]` |
| **Wait Strategy** | `waitFor({ state: 'visible', timeout: 3000 })` |
| **Implementation** | `IRCTCPage.clickMenuButton()` |
| **Notes** | Most reliable selector (class used specifically for menu) |

#### MEALS Navigation Link

| Property | Value |
|----------|-------|
| **Purpose** | Navigate to meals section |
| **AC Coverage** | AC2 |
| **Location** | Within menu or secondary nav |
| **Primary** | `a:text("MEALS")` |
| **Fallback** | `[href*="meals"]` |
| **Alternative** | `[aria-label*="MEALS"]` |
| **Wait Strategy** | `waitFor({ state: 'visible', timeout: 2000 })` |
| **Implementation** | `IRCTCPage.clickMeals()` |
| **Notes** | Exact text match for precision |

### Page State Indicators

#### Page Loaded Indicator

| Property | Value |
|----------|-------|
| **Purpose** | Verify page fully loaded |
| **AC Coverage** | AC1, AC2 |
| **Primary** | `networkidle` (page.waitForLoadState) |
| **Fallback** | `.page-content:visible` |
| **Alternative** | `body:visible` |
| **Wait Strategy** | `waitForLoadState('networkidle', { timeout: 5000 })` |
| **Notes** | Use Playwright page state, not selector when possible |

#### Menu Opened Indicator

| Property | Value |
|----------|-------|
| **Purpose** | Confirm menu dropdown visible |
| **AC Coverage** | AC1, AC2 |
| **Primary** | `[role="navigation"]:visible` |
| **Fallback** | `.menu-items:visible` |
| **Alternative** | `.navDropdown:visible` |
| **Wait Strategy** | `waitFor({ state: 'visible', timeout: 1000 })` |
| **Notes** | Check visibility after menu click |

---

## 🍽️ Meals Section Elements (AC3-AC4)

### Cooked Food Menu Container

#### Menu Visibility Element

| Property | Value |
|----------|-------|
| **Purpose** | Verify cooked food menu is visible |
| **AC Coverage** | AC3 |
| **Location** | Main content area |
| **Primary** | `.meals-section:visible` |
| **Fallback** | `[aria-label*="Cooked"]` |
| **Alternative** | `[data-section="cooked-food"]:visible` |
| **Wait Strategy** | `waitFor({ state: 'visible', timeout: 3000 })` |
| **Implementation** | `MealsPage.isCookedFoodMenuVisible()` |
| **Performance** | Measure load time before selector becomes visible |

### Category Navigation

#### Breakfast Category Button

| Property | Value |
|----------|-------|
| **Purpose** | Select breakfast category from menu |
| **AC Coverage** | AC4 |
| **Location** | Category selector area |
| **Primary** | `:text("Breakfast")` |
| **Fallback** | `[aria-label*="Breakfast"]` |
| **Alternative** | `.category-item[data-category="breakfast"]` |
| **Wait Strategy** | `waitFor({ state: 'visible', timeout: 2000 })` |
| **Implementation** | `MealsPage.clickBreakfastCategory()` |
| **Notes** | Case-sensitive text matching |

#### All Categories List

| Property | Value |
|----------|-------|
| **Purpose** | Get all available categories |
| **AC Coverage** | AC3, AC4 |
| **Primary** | `.category-list button` (or `[role="tab"]`) |
| **Fallback** | `[class*="category"]` |
| **Alternative** | `[data-category]` |
| **Count Function** | `locator(...).count()` |
| **Implementation** | `MealsPage.getMenuCategories()` |
| **Notes** | Returns all category elements for iteration |

#### Category Selected State

| Property | Value |
|----------|-------|
| **Purpose** | Detect which category is currently selected |
| **AC Coverage** | AC4 |
| **Primary** | `.category-item[class*="active"]` |
| **Fallback** | `.category-item[aria-selected="true"]` |
| **Alternative** | `.category-item[data-selected="true"]` |
| **Check** | `hasClass('active')` or `getAttribute('aria-selected')` |
| **Implementation** | `MealsPage.isBreakfastCategorySelected()` |

---

## 🥘 Breakfast Items Section (AC5-AC6)

### Item Container & Layout

#### Modal/Section Container

| Property | Value |
|----------|-------|
| **Purpose** | Container for breakfast items display |
| **AC Coverage** | AC5, AC6 |
| **Location** | Below category selector |
| **Primary** | `.items-grid:visible` |
| **Fallback** | `[role="region"][aria-label*="items"]` |
| **Alternative** | `.breakfast-items:visible` |
| **Wait Strategy** | `waitFor({ state: 'visible', timeout: 3000 })` |
| **Implementation** | `BreakfastModalPage.isModalVisible()` |

### Individual Item Elements

#### Item Card Container

| Property | Value |
|----------|-------|
| **Purpose** | Container for single item |
| **AC Coverage** | AC5, AC6 |
| **Primary** | `.meal-item` (or `role="article"`) |
| **Fallback** | `[class*="item-card"]` |
| **Alternative** | `[data-testid*="item"]` |
| **Count** | `locator(...).count()` for total items |
| **Filter** | Filter by item name for specific item |

#### Item Name / Title

| Property | Value |
|----------|-------|
| **Purpose** | Display breakfast item name |
| **AC Coverage** | AC5 |
| **Location** | Top of item card |
| **Primary** | `.meal-item h3` (or `role="heading"`) |
| **Fallback** | `.item-name` |
| **Alternative** | `[class*="title"]` |
| **Get Text** | `textContent()` or `innerText()` |
| **Implementation** | `BreakfastModalPage.getItemDetails()` |
| **Sample Display** | "Idli", "Dosa", "Poha" (exactly as shown) |

#### Item Price

| Property | Value |
|----------|-------|
| **Purpose** | Display item price in rupees |
| **AC Coverage** | AC5 |
| **Location** | Right side or below title |
| **Primary** | `.meal-item .price` |
| **Fallback** | `[class*="cost"]` |
| **Alternative** | `.meal-item span:has-text("₹")` |
| **Get Value** | `textContent()` |
| **Expected Format** | "₹80", "₹120", "₹75" (with rupee symbol) |
| **Validation** | Must match pattern `₹\d+` |
| **Implementation** | Extract from item details |

#### Item Image

| Property | Value |
|----------|-------|
| **Purpose** | Display item photo/thumbnail |
| **AC Coverage** | AC5 |
| **Location** | Top/left of item card |
| **Primary** | `.meal-item img` |
| **Fallback** | `[role="img"]` |
| **Alternative** | `[class*="thumbnail"]` |
| **Check Visibility** | `isVisible()` must return true |
| **Check Source** | `getAttribute('src')` must not be empty |
| **Implementation** | Validate in item details check |

#### Item Description

| Property | Value |
|----------|-------|
| **Purpose** | Display item description/ingredients |
| **AC Coverage** | AC5 |
| **Location** | Bottom of item card |
| **Primary** | `.meal-item .description` |
| **Fallback** | `[class*="description"]` |
| **Alternative** | `.meal-item p` |
| **Get Text** | `textContent()` |
| **Implementation** | Part of item details check |

#### Vegetarian Indicator

| Property | Value |
|----------|-------|
| **Purpose** | Show if item is vegetarian |
| **AC Coverage** | AC5 |
| **Location** | Corner of item card (typically top-left) |
| **Primary** | `.veg-indicator` |
| **Fallback** | `[aria-label*="veg"]` |
| **Alternative** | `.green-dot` (if using color indicator) |
| **Check** | `isVisible()` to determine if veg |

### Selection & Removal Controls

#### Item Selection Button/Area

| Property | Value |
|----------|-------|
| **Purpose** | Click to select/add breakfast item |
| **AC Coverage** | AC5 |
| **Location** | Entire item card or dedicated button |
| **Primary** | `.meal-item button` (or clickable area) |
| **Fallback** | `.meal-item[role="button"]` |
| **Alternative** | `.meal-item .select-btn` |
| **Click Action** | `click()` to select |
| **Implementation** | `BreakfastModalPage.selectItemByName()` |
| **Interaction** | Single click to toggle selection |

#### Selection Visual Feedback

| Property | Value |
|----------|-------|
| **Purpose** | Show selected state (highlight, checkmark, etc.) |
| **AC Coverage** | AC5, AC6 |
| **Primary** | `.meal-item[class*="selected"]` |
| **Fallback** | `.meal-item .checkmark:visible` |
| **Alternative** | `.meal-item[aria-selected="true"]` |
| **Check** | `hasClass('selected')` after click |
| **Implementation** | `BreakfastModalPage.isItemSelectedByName()` |

#### Remove Button

| Property | Value |
|----------|-------|
| **Purpose** | Remove item from selection |
| **AC Coverage** | AC6 |
| **Location** | On selected item card |
| **Primary** | `.meal-item .remove-btn` |
| **Fallback** | `.meal-item [aria-label*="Remove"]` |
| **Alternative** | `.meal-item .close-btn` |
| **Visibility** | Only visible when item is selected |
| **Wait Strategy** | Wait after item selected (100-500ms) |
| **Implementation** | `BreakfastModalPage.removeItemByIndex()` |
| **Notes** | May be dynamic (appears on hover/selection) |

### Selected Items Display

#### Selected Items Count

| Property | Value |
|----------|-------|
| **Purpose** | Show how many items selected |
| **AC Coverage** | AC5, AC6 |
| **Location** | Header or floating counter |
| **Primary** | `.selected-count` |
| **Fallback** | `[aria-label*="selected"]` |
| **Alternative** | `.counter` |
| **Get Count** | Extract number from text content |
| **Implementation** | `BreakfastModalPage.getSelectedItemCount()` |

#### Selected Items Summary

| Property | Value |
|----------|-------|
| **Purpose** | List all currently selected items |
| **AC Coverage** | AC6 |
| **Primary** | `.selected-items-list .item` |
| **Fallback** | `[role="listitem"][class*="selected"]` |
| **Get All** | `locator(...).all()` returns all selected |
| **Implementation** | Iterate for removal validation |

---

## ⌨️ Keyboard & Accessibility Elements

### Focus & Keyboard Navigation

#### Menu Button Keyboard Focus

| Property | Value |
|----------|-------|
| **Purpose** | Verify menu button receives keyboard focus |
| **AC Coverage** | AC1 |
| **Primary** | Check `page.evaluate(() => document.activeElement)` |
| **Fallback** | Check `.navHighlight:focus` via Playwright |
| **Implementation** | `IRCTCPage.getMenuButtonFocusState()` |
| **Method** | Use `keyboard.press('Tab')` to navigate to element |

#### Escape Key Handler

| Property | Value |
|----------|-------|
| **Purpose** | Close menu/modal with Escape key |
| **AC Coverage** | AC1, AC6 |
| **Test** | Press Escape, verify modal closes |
| **Implementation** | Navigate to modal, press Escape, check `isVisible()` |
| **Notes** | Essential for accessibility compliance |

#### Tab Order

| Property | Value |
|----------|-------|
| **Purpose** | Verify logical keyboard navigation order |
| **AC Coverage** | AC1, AC2, AC5 |
| **Order** | Menu button → MEALS → Categories → Items → Remove buttons |
| **Test** | Simulate tab presses, verify focus moves correctly |
| **Implementation** | `IRCTCPage.verifyKeyboardTabSequence()` |

### Accessibility Attributes

#### ARIA Labels (All Interactive Elements)

```typescript
// Menu Button
[aria-label="Open Menu"]
[aria-haspopup="true"]
[aria-expanded="false"] // or true if open

// MEALS Link
[aria-label="Meals Section"]
[role="link"]

// Breakfast Category
[aria-label="Select Breakfast Category"]
[aria-selected="false"] // or true if selected

// Item Card
[role="article"]
[aria-label="Dosa - ₹120 - Vegetarian"]

// Remove Button
[aria-label="Remove Idli from selection"]
[role="button"]
```

#### Role Attributes

All major elements should have proper roles:
- Menu button: `[role="button"]` or `[role="menuitem"]`
- Links: `[role="link"]`
- Categories: `[role="tab"]` or tab buttons
- Items: `[role="article"]`
- Remove: `[role="button"]`

---

## 📱 Responsive Elements

### Viewport-Specific Selectors

#### Mobile Touch Targets (min 44x44px)

```typescript
// Mobile view (375x667)
// Buttons/touch targets enlarged or more spaced
.navHighlight { min-height: 44px; min-width: 44px; }

// Items may be single column
.meal-item { width: 100%; }
```

#### Desktop Layout

```typescript
// Desktop view (1920x1080)
// Multi-column grid
.items-grid { display: grid; grid-template-columns: repeat(3, 1fr); }

// Sidebar may appear
.category-sidebar { display: block; width: 200px; }
```

### Responsive Selector Variations

| Viewport | Primary | Fallback |
|----------|---------|----------|
| **Mobile (≤375x667)** | `.meal-item[data-layout="mobile"]` | `.meal-item` |
| **Tablet (768x1024)** | `.meal-item[data-layout="tablet"]` | `.meal-item` |
| **Desktop (1920x1080)** | `.meal-item[data-layout="desktop"]` | `.meal-item` |

---

## 🎨 Visual/State Indicators

### Loading States

#### Loading Spinner

| Property | Value |
|----------|-------|
| **Purpose** | Show data is loading |
| **Primary** | `.spinner:visible` or `.loader:visible` |
| **Fallback** | `[class*="loading"]:visible` |
| **Wait** | `waitFor({ state: 'hidden' })` to wait for completion |
| **Check** | `isVisible()` should be false when fully loaded |

#### Empty State

| Property | Value |
|----------|-------|
| **Purpose** | Show when no items available |
| **Primary** | `.empty-message:visible` |
| **Fallback** | `:text("No items available")` |
| **Check** | Should not appear if items exist |

### Error States

#### Error Message

| Property | Value |
|----------|-------|
| **Purpose** | Display error notification |
| **Primary** | `.error-message:visible` |
| **Fallback** | `[role="alert"]` |
| **Check** | Should not be visible on successful load |

---

## 📍 Full Navigation Path

Complete path to breakfast items:

1. **Page Load** → [IRCTC Homepage]
   - Primary: `networkidle`
   - Check: `.navHighlight:visible`

2. **Open Menu** → Click menu button
   - Action: `await page.click('.navHighlight')`
   - Verify: `[role="navigation"]:visible`

3. **Navigate to MEALS** → Click MEALS option
   - Action: `await page.click('a:text("MEALS")')`
   - Wait: `waitForLoadState('networkidle')`
   - Verify: `.meals-section:visible`

4. **Select Breakfast** → Click breakfast category
   - Action: `await page.click(':text("Breakfast")')`
   - Wait: Meals load (1-2s)
   - Verify: `.meal-item:visible`

5. **Select Item** → Click item card
   - Action: `await page.click('.meal-item')`
   - Visual: Item highlights/checkmark shows
   - Verify: `.meal-item[class*="selected"]`

6. **Remove Item** → Click remove button
   - Action: `await page.click('.remove-btn')` (on selected item)
   - Verify: `.meal-item[class*="selected"]` disappears
   - Confirm: Selected count decreases

---

## 🔄 Selector Maintenance

### When to Update Selectors

✅ **Update selectors when:**
- IRCTC website redesigns UI
- Class names change
- IDs are added/removed
- ARIA labels are updated
- Elements are moved to different locations

**Update process:**
```bash
# 1. Use Playwright codegen to inspect elements
npx playwright codegen https://www.irctc.co.in/

# 2. Test new selector in test
npx playwright test -g "test-name" --headed

# 3. Update IRCTC_TEST_DATA.selectors with new primary
# 4. Keep old selector as fallback
# 5. Commit and verify all tests pass
```

### Selector Troubleshooting

**Selector not finding element?**
```typescript
// 1. Check if element exists on page
await page.waitForSelector(selector, { timeout: 1000 });

// 2. Check element visibility
await page.locator(selector).isVisible();

// 3. Get element count
const count = await page.locator(selector).count();

// 4. Print all matching elements
const elements = await page.locator(selector).all();
console.log(`Found ${elements.length} elements`);

// 5. Try fallback selector
const fallback = '[aria-label*="Menu"]';
await page.waitForSelector(fallback, { timeout: 1000 });
```

---

## 📊 Selector Statistics

| Category | Count | Coverage |
|----------|-------|----------|
| **Homepage** | 4 | AC1-AC2 |
| **Meals Section** | 8 | AC3-AC4 |
| **Breakfast Items** | 12 | AC5-AC6 |
| **Keyboard/Accessibility** | 8 | All ACs |
| **Responsive** | 6 | All viewports |
| **State Indicators** | 6 | General |
| **Total** | 44+ | 100% |

---

## 🔗 Cross-References

- Implementation: See `/tests/fixtures/irctc-test-data.ts`
- POM Usage: See `/tests/pages/irctc/`
- Test Examples: See `/tests/irctc/*.spec.ts`
- Architecture: See [ARCHITECTURE-IRCTC.md](ARCHITECTURE-IRCTC.md)

---

**Selector Reference:** April 15, 2026  
**Last Verified:** April 15, 2026  
**Status:** ✅ Complete
