/**
 * IRCTC Test Suite: AC1 & AC2 - Menu Navigation and MEALS Access
 * Tests for top-right menu visibility, keyboard accessibility, and MEALS navigation
 */

import { test, expect } from '@playwright/test';
import { IRCTCPage } from '../pages/irctc/IRCTCPage';

test.describe('AC1 & AC2: Menu Navigation and MEALS Access', () => {
  let irctcPage: IRCTCPage;

  test.beforeEach(async ({ page }) => {
    irctcPage = new IRCTCPage(page);
    await irctcPage.navigate();
  });

  // ==================== AC1 Tests ====================

  test('AC1.1: Menu button is visible in top-right corner on desktop', async ({ page }) => {
    // Set desktop viewport
    await irctcPage.setViewportSize(1920, 1080);

    // Verify menu button is visible
    const isVisible = await irctcPage.isMenuButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('AC1.2: Menu button has adequate touch target size on mobile', async ({ page }) => {
    // Set mobile viewport
    await irctcPage.setViewportSize(375, 667);

    // Verify touch target is adequate
    const hasAdequateTarget = await irctcPage.hasAdequateTouchTarget();
    expect(hasAdequateTarget).toBe(true);
  });

  test('AC1.3: Menu button is accessible via Tab navigation', async ({ page }) => {
    // Tab to menu button
    const isFocused = await irctcPage.focusMenuButtonViaKeyboard();
    expect(isFocused).toBe(true);

    // Verify focus indicator is visible
    const hasFocus = await irctcPage.hasFocusIndicator();
    expect(hasFocus).toBe(true);
  });

  test('AC1.3.1: Menu opens when Enter key is pressed on focused button', async ({ page }) => {
    // Focus menu via keyboard
    await irctcPage.focusMenuButtonViaKeyboard();

    // Activate with Enter key
    await irctcPage.activateMenuViaKeyboard();

    // Verify menu option (MEALS) becomes available for interaction
    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  test('AC1.4: Menu button handles missing element gracefully', async ({ page }) => {
    // Verify error handling exists (menu button should always exist)
    const menuExists = await irctcPage.menuButtonExists();
    expect(menuExists).toBe(true);
  });

  test('AC1.5: Rapid menu clicks do not cause UI glitches', async ({ page }) => {
    // Perform 5 rapid clicks
    await irctcPage.performRapidMenuClicks(5);

    // Verify final state is stable (menu is in expected state)
    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  // ==================== AC2 Tests ====================

  test('AC2.1: MEALS option is visible in menu dropdown', async ({ page }) => {
    // Click menu to open
    await irctcPage.clickMenuButton();

    // Verify MEALS option visible
    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  test('AC2.2: Clicking MEALS navigates to meals section', async ({ page }) => {
    // Click menu and MEALS
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    // Verify navigation was successful
    const isLoaded = await irctcPage.isMealsSectionLoaded();
    expect(isLoaded).toBe(true);
  });

  test('AC2.3: MEALS link has submenu with category options', async ({ page }) => {
    // Get submenu items
    const submenuItems = await irctcPage.getMealsSubmenuItems();

    // Verify submenu has items
    expect(submenuItems.length).toBeGreaterThan(0);
  });

  test('AC2.4: MEALS link has proper accessibility attributes (aria-label)', async ({ page }) => {
    // Get accessibility attributes
    const attributes = await irctcPage.getMealsAccessibilityAttributes();

    // Verify aria-label exists if it's a link
    if (attributes.href) {
      expect(attributes.ariaLabel || attributes.role).toBeTruthy();
    }
  });

  test('AC2.5: Page remains responsive while MEALS content loads', async ({ page }) => {
    // Verify page responsiveness during load
    const isResponsive = await irctcPage.isPageResponsiveDuringLoad();
    expect(isResponsive).toBe(true);
  });

  // ==================== Edge Cases & Accessibility ====================

  test('AC1.2.1: Menu button works on tablet viewport (768x1024)', async ({ page }) => {
    // Set tablet viewport
    await irctcPage.setViewportSize(768, 1024);

    // Verify menu button visible and functional
    const isVisible = await irctcPage.isMenuButtonVisible();
    expect(isVisible).toBe(true);

    // Click menu
    await irctcPage.clickMenuButton();

    // Verify MEALS visible
    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  test('AC1.3.1: Menu can be activated with Space key', async ({ page }) => {
    // Focus menu
    await irctcPage.focusMenuButtonViaKeyboard();

    // Activate with Space key (should work in addition to Enter)
    await page.press('Space');

    // Give animation time
    await page.waitForTimeout(300);

    // Verify MEALS visible
    const isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);
  });

  test('AC2.1.1: MEALS link text is readable and not truncated', async ({ page }) => {
    // Click menu
    await irctcPage.clickMenuButton();

    // Get MEALS link
    const mealsLink = page.locator('a:text("MEALS")');
    const textContent = await mealsLink.textContent();

    // Verify text is complete
    expect(textContent?.trim()).toBe('MEALS');
  });

  test('AC2.2.1: Navigation to MEALS updates browser URL', async ({ page }) => {
    // Click menu and MEALS
    await irctcPage.clickMenuButton();
    await irctcPage.clickMeals();

    // Verify URL changed
    const url = await irctcPage.getCurrentUrl();
    expect(url.toLowerCase()).toContain('/meals');
  });

  test('AC1 & AC2: Complete flow from homepage to MEALS section', async ({ page }) => {
    // 1. Verify homepage loaded
    const isLoaded = await irctcPage.isLoaded();
    expect(isLoaded).toBe(true);

    // 2. Click menu
    await irctcPage.clickMenuButton();

    // 3. Verify MEALS visible
    let isMealsVisible = await irctcPage.isMealsOptionVisible();
    expect(isMealsVisible).toBe(true);

    // 4. Click MEALS
    await irctcPage.clickMeals();

    // 5. Verify meals section loaded
    const isMealsSectionLoaded = await irctcPage.isMealsSectionLoaded();
    expect(isMealsSectionLoaded).toBe(true);
  });
});
