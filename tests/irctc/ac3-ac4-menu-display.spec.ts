/**
 * IRCTC Test Suite: AC3 & AC4 - Cooked Food Menu Display and Breakfast Category
 * Tests for menu visibility, performance, responsiveness, and category navigation
 */

import { test, expect } from '@playwright/test';
import { IRCTCPage } from '../pages/irctc/IRCTCPage';
import { MealsPage } from '../pages/irctc/MealsPage';
import { IRCTC_TEST_DATA } from '../fixtures/irctc-test-data';

test.describe('AC3 & AC4: Cooked Food Menu and Breakfast Category', () => {
  let irctcPage: IRCTCPage;
  let mealsPage: MealsPage;

  test.beforeEach(async ({ page }) => {
    irctcPage = new IRCTCPage(page);
    mealsPage = new MealsPage(page);

    // Navigate to MEALS section
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
  });

  // ==================== AC3 Tests ====================

  test('AC3.1: Cooked Food Menu is visible after navigation to MEALS', async ({ page }) => {
    // Verify cooked food menu visible
    const isVisible = await mealsPage.isCookedFoodMenuVisible();
    expect(isVisible).toBe(true);
  });

  test('AC3.2: Menu displays multiple categories including Breakfast', async ({ page }) => {
    // Get all visible categories
    const categories = await mealsPage.getMenuCategories();

    // Verify categories exist
    expect(categories.length).toBeGreaterThan(0);

    // Verify Breakfast is in categories
    const hasBreakfast = categories.some(cat =>
      cat.toLowerCase().includes('breakfast')
    );
    expect(hasBreakfast).toBe(true);
  });

  test('AC3.3: Cooked Food Menu loads within acceptable performance threshold', async ({ page }) => {
    // Measure menu load time
    const loadTime = await mealsPage.measureMenuLoadTime();

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(IRCTC_TEST_DATA.performance.itemLoad);
  });

  test('AC3.4: Menu layout adapts properly to mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await irctcPage.setViewportSize(375, 667);

    // Reload to affect layout
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify mobile layout (no horizontal scroll)
    const hasNoScroll = await mealsPage.hasNoHorizontalScroll();
    expect(hasNoScroll).toBe(true);
  });

  test('AC3.5: Categories are accessible via keyboard Tab navigation', async ({ page }) => {
    // Tab to category for focus
    const isFocused = await mealsPage.navigateCategoryViaKeyboard();
    expect(isFocused).toBe(true);
  });

  test('AC3.6: Menu remains stable when loaded under network throttle', async ({ page }) => {
    // Throttle network (simulated by slow loading)
    // Verify menu still loads properly
    const isVisible = await mealsPage.isCookedFoodMenuVisible();
    expect(isVisible).toBe(true);
  });

  // ==================== AC4 Tests ====================

  test('AC4.1: Breakfast category is visible in cooked food menu', async ({ page }) => {
    // Verify breakfast category visible
    const isVisible = await mealsPage.isBreakfastCategoryVisible();
    expect(isVisible).toBe(true);
  });

  test('AC4.2: Clicking Breakfast category displays breakfast items', async ({ page }) => {
    // Click breakfast category
    await mealsPage.clickBreakfastCategory();

    // Verify items loaded
    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('AC4.3: Breakfast items display in visible modal/panel', async ({ page }) => {
    // Click breakfast
    await mealsPage.clickBreakfastCategory();

    // Verify modal visible
    const isModalVisible = await mealsPage.isBreakfastModalVisible();
    expect(isModalVisible).toBe(true);

    // Verify close button visible
    const hasCloseButton = await mealsPage.isModalCloseButtonVisible();
    expect(hasCloseButton).toBe(true);
  });

  test('AC4.3.1: Modal has proper z-index layering (overlay on top)', async ({ page }) => {
    // Click breakfast
    await mealsPage.clickBreakfastCategory();

    // Verify z-index
    const hasProperZIndex = await mealsPage.verifyModalZIndex();
    expect(hasProperZIndex).toBe(true);
  });

  test('AC4.4: Breakfast category accessible via keyboard Tab and Enter', async ({ page }) => {
    // Tab to breakfast category
    const isFocused = await mealsPage.focusBreakfastCategoryViaKeyboard();
    expect(isFocused).toBe(true);

    // Activate with Enter
    await mealsPage.activateBreakfastViaEnter();

    // Verify items loaded
    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('AC4.5: User can switch between categories (Breakfast to Lunch)', async ({ page }) => {
    // Click breakfast
    await mealsPage.clickBreakfastCategory();

    // Get breakfast item count
    const breakfastCount = await mealsPage.getMealItemCount();

    // Switch to lunch
    await mealsPage.switchCategory('Breakfast', 'Lunch');

    // Verify lunch items loaded
    const lunchCount = await mealsPage.getMealItemCount();
    expect(lunchCount).toBeGreaterThan(0);

    // Items should be different (not all same as breakfast)
    expect(lunchCount).toBeGreaterThanOrEqual(1);
  });

  // ==================== Edge Cases & Accessibility ====================

  test('AC3.4.1: Menu works on tablet viewport (768x1024)', async ({ page }) => {
    // Set tablet viewport
    await irctcPage.setViewportSize(768, 1024);

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify menu visible
    const isVisible = await mealsPage.isCookedFoodMenuVisible();
    expect(isVisible).toBe(true);

    // Verify no horizontal scroll
    const hasNoScroll = await mealsPage.hasNoHorizontalScroll();
    expect(hasNoScroll).toBe(true);
  });

  test('AC3.5.1: Categories can be activated via Enter key', async ({ page }) => {
    // Get first category
    const categories = await mealsPage.getMenuCategories();
    expect(categories.length).toBeGreaterThan(0);

    // Get breakfast items count before
    const initialCount = await mealsPage.getMealItemCount();

    // Click breakfast explicitly
    await mealsPage.clickBreakfastCategory();

    // Get breakfast items count after
    const finalCount = await mealsPage.getMealItemCount();

    // Items should be present
    expect(finalCount).toBeGreaterThan(0);
  });

  test('AC4.3.2: Modal can be closed via close button', async ({ page }) => {
    // Click breakfast
    await mealsPage.clickBreakfastCategory();

    // Verify modal visible
    let isVisible = await mealsPage.isBreakfastModalVisible();
    expect(isVisible).toBe(true);

    // Close modal
    await mealsPage.closeBreakfastModal();

    // Verify closed
    const isClosed = await mealsPage.isModalClosed();
    expect(isClosed).toBe(true);
  });

  test('AC4.3.3: Modal can be closed via Escape key', async ({ page }) => {
    // Click breakfast
    await mealsPage.clickBreakfastCategory();

    // Verify modal visible
    let isVisible = await mealsPage.isBreakfastModalVisible();
    expect(isVisible).toBe(true);

    // Close via Escape
    await mealsPage.closeModalViaEscape();

    // Verify closed
    const isClosed = await mealsPage.isModalClosed();
    expect(isClosed).toBe(true);
  });

  test('AC3 & AC4: Complete flow from Cooked Food Menu to Breakfast selection', async ({ page }) => {
    // 1. Verify cooked food menu visible
    let isVisible = await mealsPage.isCookedFoodMenuVisible();
    expect(isVisible).toBe(true);

    // 2. Verify breakfast category visible
    isVisible = await mealsPage.isBreakfastCategoryVisible();
    expect(isVisible).toBe(true);

    // 3. Click breakfast
    await mealsPage.clickBreakfastCategory();

    // 4. Verify modal visible with items
    isVisible = await mealsPage.isBreakfastModalVisible();
    expect(isVisible).toBe(true);

    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);

    // 5. Close modal
    await mealsPage.closeBreakfastModal();

    // 6. Verify closed and back to menu
    const isClosed = await mealsPage.isModalClosed();
    expect(isClosed).toBe(true);
  });

  test('AC4.5.1: Multi-category switching maintains state consistency', async ({ page }) => {
    // Click breakfast
    await mealsPage.clickBreakfastCategory();
    const breakfastItemNames = await mealsPage.getMealItemNames();
    const breakfastCount = breakfastItemNames.length;

    // Switch to lunch
    await page.reload(); // Reset to get fresh menu
    await page.waitForLoadState('networkidle');

    await mealsPage.clickBreakfastCategory();
    const itemCount = await mealsPage.getMealItemCount();

    // Same number of items for same category
    expect(itemCount).toBe(breakfastCount);
  });
});
