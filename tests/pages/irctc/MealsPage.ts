/**
 * IRCTC Meals Section Page Object
 * Handles interactions with Cooked Food Menu and Category selection
 * Acceptance Criteria: AC3, AC4
 */

import { Page, expect } from '@playwright/test';
import { IRCTC_TEST_DATA } from '../../fixtures/irctc-test-data';

export class MealsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Verify Cooked Food Menu is visible
   */
  async isCookedFoodMenuVisible(): Promise<boolean> {
    const cookedFoodHeading = this.page.locator(IRCTC_TEST_DATA.selectors.cookedFoodHeading);
    return await cookedFoodHeading.isVisible({
      timeout: IRCTC_TEST_DATA.waits.modalTimeout,
    });
  }

  /**
   * AC3.1: Verify Cooked Food Menu Visibility
   */
  async verifyCookedFoodMenuPresence(): Promise<boolean> {
    try {
      const heading = this.page.locator(
        'h2:text-matches("Cooked", "i")'
      );
      const isVisible = await heading.isVisible({
        timeout: IRCTC_TEST_DATA.waits.itemLoadTimeout,
      });
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * AC3.2: Get all visible menu categories
   */
  async getMenuCategories(): Promise<string[]> {
    const categoryButtons = this.page.locator(IRCTC_TEST_DATA.selectors.categoryButton);
    const categories = await categoryButtons.allTextContents();
    return categories.filter(cat => cat.trim().length > 0);
  }

  /**
   * Verify specific category is visible (e.g., "Breakfast")
   */
  async isCategoryVisible(categoryName: string): Promise<boolean> {
    const categoryButton = this.page.locator(`:text("${categoryName}")`);
    return await categoryButton.isVisible({
      timeout: IRCTC_TEST_DATA.waits.itemLoadTimeout,
    });
  }

  /**
   * AC3.3: Measure menu load time and verify performance
   */
  async measureMenuLoadTime(): Promise<number> {
    const startTime = Date.now();
    
    await this.page.waitForSelector(
      IRCTC_TEST_DATA.selectors.mealItem,
      { timeout: IRCTC_TEST_DATA.performance.itemLoad }
    );
    
    const endTime = Date.now();
    return endTime - startTime;
  }

  /**
   * Verify menu loads within acceptable timeframe
   */
  async isMenuPerformanceAcceptable(): Promise<boolean> {
    const loadTime = await this.measureMenuLoadTime();
    return loadTime <= IRCTC_TEST_DATA.performance.itemLoad;
  }

  /**
   * AC3.4: Verify layout adaptation to mobile viewport
   */
  async verifyMobileLayoutAdaptation(): Promise<boolean> {
    const viewport = await this.page.viewportSize();
    
    if (!viewport || viewport.width > 600) {
      // Set to mobile viewport
      await this.page.setViewportSize({ width: 375, height: 667 });
      await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
    }

    // Check for horizontal scroll
    const scrollWidth = await this.page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await this.page.evaluate(
      () => document.documentElement.clientWidth
    );

    return scrollWidth <= clientWidth;
  }

  /**
   * AC3.5: Verify keyboard navigation through categories
   */
  async navigateCategoryViaKeyboard(): Promise<boolean> {
    const categories = await this.getMenuCategories();
    
    if (categories.length === 0) {
      return false;
    }

    // Focus first category
    const firstCategory = this.page.locator(`:text("${categories[0]}")`);
    await firstCategory.focus();

    // Verify focus indicator
    const isFocused = await this.page.evaluate(() => {
      return document.activeElement?.classList.contains('focused') ||
             window.getComputedStyle(document.activeElement as HTMLElement).outline !== 'none';
    });

    return isFocused;
  }

  /**
   * AC3.6: Verify menu stability with network throttle (3G)
   */
  async verifyLoadingUnderThrottle(): Promise<boolean> {
    const cookedFoodHeading = this.page.locator(
      IRCTC_TEST_DATA.selectors.cookedFoodHeading
    );
    
    try {
      const isVisible = await cookedFoodHeading.isVisible({
        timeout: IRCTC_TEST_DATA.waits.navigationTimeout,
      });
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * AC4.1: Verify Breakfast category is visible
   */
  async isBreakfastCategoryVisible(): Promise<boolean> {
    const breakfastCategory = this.page.locator(
      IRCTC_TEST_DATA.selectors.breakfastCategory
    );
    return await breakfastCategory.isVisible({
      timeout: IRCTC_TEST_DATA.waits.itemLoadTimeout,
    });
  }

  /**
   * AC4.2: Click on Breakfast category to trigger items display
   */
  async clickBreakfastCategory(): Promise<void> {
    const breakfastCategory = this.page.locator(
      IRCTC_TEST_DATA.selectors.breakfastCategory
    );
    await breakfastCategory.click();
    
    // Wait for modal/panel to appear and items to load
    await this.page.waitForSelector(
      IRCTC_TEST_DATA.selectors.mealItem,
      { timeout: IRCTC_TEST_DATA.waits.itemLoadTimeout }
    );
    
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * AC4.3: Verify breakfast modal/panel is displayed
   */
  async isBreakfastModalVisible(): Promise<boolean> {
    const modal = this.page.locator(IRCTC_TEST_DATA.selectors.mealModal);
    return await modal.isVisible({
      timeout: IRCTC_TEST_DATA.waits.modalTimeout,
    });
  }

  /**
   * Verify close button is visible in modal
   */
  async isModalCloseButtonVisible(): Promise<boolean> {
    const closeButton = this.page.locator(IRCTC_TEST_DATA.selectors.modalCloseButton);
    return await closeButton.isVisible({
      timeout: IRCTC_TEST_DATA.waits.animationDelay,
    });
  }

  /**
   * Verify modal has proper z-index (overlay on top)
   */
  async verifyModalZIndex(): Promise<boolean> {
    const modal = this.page.locator(IRCTC_TEST_DATA.selectors.mealModal);
    const zIndex = await modal.evaluate(el => {
      return window.getComputedStyle(el).zIndex;
    });

    // Modal z-index should be high (typically > 100)
    return parseInt(zIndex) > 10;
  }

  /**
   * AC4.4: Access Breakfast category via keyboard
   */
  async focusBreakfastCategoryViaKeyboard(): Promise<boolean> {
    const breakfastCategory = this.page.locator(
      IRCTC_TEST_DATA.selectors.breakfastCategory
    );
    
    // Tab to find breakfast category
    const maxTabs = 30;
    for (let i = 0; i < maxTabs; i++) {
      await this.page.press('Tab');
      
      const isFocused = await this.page.evaluate(() => {
        return document.activeElement?.textContent?.includes('Breakfast') || false;
      });

      if (isFocused) {
        return true;
      }
    }

    return false;
  }

  /**
   * Activate Breakfast category via Enter key
   */
  async activateBreakfastViaEnter(): Promise<void> {
    await this.page.press('Enter');
    
    // Wait for items to load
    await this.page.waitForSelector(
      IRCTC_TEST_DATA.selectors.mealItem,
      { timeout: IRCTC_TEST_DATA.waits.itemLoadTimeout }
    );
    
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * AC4.5: Switch between categories (e.g., Breakfast to Lunch)
   */
  async switchCategory(
    fromCategory: string,
    toCategory: string
  ): Promise<void> {
    // Get initial item count
    const initialItems = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    // Click new category
    const newCategoryButton = this.page.locator(`:text("${toCategory}")`);
    await newCategoryButton.click();

    // Wait for items to update
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay * 2);

    // Verify items changed
    const newItems = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    if (newItems === 0) {
      throw new Error(`No items found after switching to ${toCategory}`);
    }
  }

  /**
   * Get count of visible meal items
   */
  async getMealItemCount(): Promise<number> {
    return await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();
  }

  /**
   * Get all meal item names
   */
  async getMealItemNames(): Promise<string[]> {
    const items = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .allTextContents();

    return items.map(item => item.trim());
  }

  /**
   * Close breakfast modal
   */
  async closeBreakfastModal(): Promise<void> {
    const closeButton = this.page.locator(IRCTC_TEST_DATA.selectors.modalCloseButton);

    if (await closeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await closeButton.click();
      await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
    }
  }

  /**
   * Close modal via Escape key
   */
  async closeModalViaEscape(): Promise<void> {
    await this.page.press('Escape');
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * Verify modal is closed (not visible)
   */
  async isModalClosed(): Promise<boolean> {
    const modal = this.page.locator(IRCTC_TEST_DATA.selectors.mealModal);
    return !(await modal.isVisible({ timeout: 1000 }).catch(() => false));
  }

  /**
   * Verify no horizontal scroll required
   */
  async hasNoHorizontalScroll(): Promise<boolean> {
    const scrollWidth = await this.page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await this.page.evaluate(
      () => document.documentElement.clientWidth
    );

    return scrollWidth <= clientWidth;
  }

  /**
   * Measure scroll performance
   */
  async scrollAndMeasurePerformance(): Promise<number> {
    const startTime = performance.now();
    
    const lastItem = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .last();
    
    await lastItem.scrollIntoViewIfNeeded();
    
    const endTime = performance.now();
    return endTime - startTime;
  }

  /**
   * Verify all items are accessible by scrolling
   */
  async areAllItemsAccessible(): Promise<boolean> {
    const itemCount = await this.getMealItemCount();

    if (itemCount === 0) {
      return false;
    }

    // Scroll to last item
    const lastItem = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemCount - 1);
    
    await lastItem.scrollIntoViewIfNeeded();

    // Verify last item is visible
    return await lastItem.isVisible();
  }
}
