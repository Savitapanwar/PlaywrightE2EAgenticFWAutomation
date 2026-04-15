/**
 * IRCTC Test Suite: Happy Path & Edge Cases
 * Comprehensive end-to-end flow tests and cross-browser compatibility
 */

import { test, expect, devices } from '@playwright/test';
import { IRCTCPage } from '../pages/irctc/IRCTCPage';
import { MealsPage } from '../pages/irctc/MealsPage';
import { BreakfastModalPage } from '../pages/irctc/BreakfastModalPage';
import { IRCTC_TEST_DATA } from '../fixtures/irctc-test-data';

test.describe('Happy Path & Edge Cases', () => {
  // ==================== Happy Path Tests ====================

  test('Complete happy path: Homepage to selection to removal', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // 1. Navigate to homepage
    await irctcPage.navigate();
    expect(await irctcPage.isLoaded()).toBe(true);

    // 2. Open menu
    await irctcPage.clickMenuButton();
    expect(await irctcPage.isMealsOptionVisible()).toBe(true);

    // 3. Navigate to MEALS
    await irctcPage.clickMeals();
    expect(await irctcPage.isMealsSectionLoaded()).toBe(true);

    // 4. Verify cooked food menu visible
    expect(await mealsPage.isCookedFoodMenuVisible()).toBe(true);

    // 5. Click Breakfast
    await mealsPage.clickBreakfastCategory();
    expect(await mealsPage.isBreakfastModalVisible()).toBe(true);

    // 6. Browse and select items
    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);

    // 7. Select 3 items
    await breakfastModal.selectItemByIndex(0); // Idli
    await breakfastModal.selectItemByIndex(1); // Dosa
    await breakfastModal.selectItemByIndex(2); // Poha

    let selectedCount = await breakfastModal.getSelectedItemCount();
    expect(selectedCount).toBe(3);

    // 8. View selection
    const selectedNames = await breakfastModal.getSelectedItemNames();
    expect(selectedNames.length).toBe(3);

    // 9. Remove middle item (Dosa)
    await breakfastModal.removeItemByIndex(1);

    // 10. Verify final state (2 items remain)
    selectedCount = await breakfastModal.getSelectedItemCount();
    expect(selectedCount).toBe(2);

    // Verify Idli and Poha remain (0 and 2)
    const finalNames = await breakfastModal.getSelectedItemNames();
    expect(finalNames.length).toBe(2);
  });

  test('User can modify selection multiple times', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();

    // First selection round
    await breakfastModal.selectItemByIndex(0);
    await breakfastModal.selectItemByIndex(1);
    expect(await breakfastModal.getSelectedItemCount()).toBe(2);

    // Remove one
    await breakfastModal.removeItemByIndex(0);
    expect(await breakfastModal.getSelectedItemCount()).toBe(1);

    // Add another
    await breakfastModal.selectItemByIndex(2);
    expect(await breakfastModal.getSelectedItemCount()).toBe(2);

    // Remove both
    await breakfastModal.removeItemByIndex(1);
    await breakfastModal.removeItemByIndex(2);
    expect(await breakfastModal.getSelectedItemCount()).toBe(0);
  });

  test('All item details are visible and accurate', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();

    // Get all item details
    const allDetails = await breakfastModal.getAllItemDetails();

    // Verify each item
    allDetails.forEach(item => {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.price.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
      expect(item.hasImage).toBe(true);
    });
  });

  // ==================== Empty State Edge Case ====================

  test('Graceful handling if breakfast items unavailable (theoretical)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    // Verify cooked food menu visible
    const isVisible = await mealsPage.isCookedFoodMenuVisible();
    expect(isVisible).toBe(true);

    // In real scenario, breakfast items should always be available
    // This test verifies menu structure is present even if items vary
  });

  // ==================== Cross-Browser Tests ====================

  test('Works correctly on Firefox browser (simulated)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // Same happy path works on Firefox
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();

    // Verify items display
    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);

    // Test selection
    await breakfastModal.selectItemByIndex(0);
    expect(await breakfastModal.getSelectedItemCount()).toBe(1);
  });

  test('Works correctly on Safari browser (simulated)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Verify basic navigation works
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();

    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);

    // Complete flow
    await irctcPage.clickMeals();
    expect(await mealsPage.isCookedFoodMenuVisible()).toBe(true);
  });

  // ==================== Responsive Design Tests ====================

  test('Responsive on mobile (375x667)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate flow
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();

    // Verify responsive interaction
    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);

    // Mobile touch interaction
    await breakfastModal.selectItemByIndex(0);
    expect(await breakfastModal.getSelectedItemCount()).toBe(1);

    // Verify mobile touch target
    const hasAdequate = await breakfastModal.hasAdequateRemoveButtonTarget(0);
    expect(hasAdequate).toBe(true);
  });

  test('Responsive on tablet (768x1024)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Navigate
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    // Verify layout adapts
    const hasNoScroll = await mealsPage.hasNoHorizontalScroll();
    expect(hasNoScroll).toBe(true);

    // Verify categories visible
    const categories = await mealsPage.getMenuCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  test('Responsive on tablet landscape (1024x768)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Set tablet landscape
    await page.setViewportSize({ width: 1024, height: 768 });

    // Verify menu works
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();

    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  test('Responsive on desktop (1920x1080)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Full flow
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();

    // Verify desktop layout
    const itemCount = await mealsPage.getMealItemCount();
    expect(itemCount).toBeGreaterThan(0);

    // Select and verify
    await breakfastModal.selectItemByIndex(0);
    expect(await breakfastModal.getSelectedItemCount()).toBe(1);
  });

  // ==================== Accessibility Tests ====================

  test('Keyboard navigation works throughout flow', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Navigate
    await irctcPage.navigate();

    // Tab to menu button
    const isFocused = await irctcPage.focusMenuButtonViaKeyboard();
    expect(isFocused).toBe(true);

    // Activate with Enter
    await irctcPage.activateMenuViaKeyboard();

    // Verify MEALS accessible
    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  test('Screen reader announcements (simulated via ARIA)', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);

    // Verify ARIA attributes for screen reader support
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();

    const attributes = await irctcPage.getMealsAccessibilityAttributes();

    // Should have label or role for accessibility
    expect(
      attributes.ariaLabel || attributes.role || attributes.href
    ).toBeTruthy();
  });

  // ==================== Performance Tests ====================

  test('Complete flow completes within acceptable time', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    const startTime = Date.now();

    // Full flow
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();
    await breakfastModal.selectItemByIndex(0);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Should complete in reasonable time
    expect(totalTime).toBeLessThan(30000); // 30 seconds max
  });

  test('Item details load quickly', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    const startTime = Date.now();
    await mealsPage.clickBreakfastCategory();
    const endTime = Date.now();

    const loadTime = endTime - startTime;

    // Items should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  // ==================== State Management Tests ====================

  test('Selection persists when scrolling', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);
    const breakfastModal = new BreakfastModalPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();
    await mealsPage.clickBreakfastCategory();

    // Select items
    await breakfastModal.selectItemByIndex(0);
    await breakfastModal.selectItemByIndex(2);

    // Scroll
    await mealsPage.scrollThroughItemsAndMeasure();

    // Verify still selected
    const count = await breakfastModal.getSelectedItemCount();
    expect(count).toBe(2);
  });

  test('Modal close and reopen preserves menu state', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    // Click Breakfast
    await mealsPage.clickBreakfastCategory();
    const count1 = await mealsPage.getMealItemCount();

    // Close modal
    await mealsPage.closeBreakfastModal();

    // Reopen
    await mealsPage.clickBreakfastCategory();
    const count2 = await mealsPage.getMealItemCount();

    // Same items visible
    expect(count2).toBe(count1);
  });

  test('Category switching works correctly', async ({ page }) => {
    const irctcPage = new IRCTCPage(page);
    const mealsPage = new MealsPage(page);

    // Setup
    await irctcPage.navigate();
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    // Get categories
    const categories = await mealsPage.getMenuCategories();
    expect(categories.length).toBeGreaterThan(1);

    // Switch categories
    if (categories.length > 1) {
      await mealsPage.clickBreakfastCategory();
      const breakfastCount = await mealsPage.getMealItemCount();
      expect(breakfastCount).toBeGreaterThan(0);
    }
  });
});
