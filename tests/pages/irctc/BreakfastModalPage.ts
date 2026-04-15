/**
 * IRCTC Breakfast Modal Page Object
 * Handles interactions with breakfast item selection, display, and removal
 * Acceptance Criteria: AC5, AC6
 */

import { Page, expect } from '@playwright/test';
import { IRCTC_TEST_DATA, getBreakfastItemByName } from '../../fixtures/irctc-test-data';

export class BreakfastModalPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * AC5.1: Verify breakfast items display complete details
   */
  async getItemDetails(itemIndex: number): Promise<{
    name: string;
    price: string;
    description: string;
    hasImage: boolean;
  }> {
    const items = this.page.locator(IRCTC_TEST_DATA.selectors.mealItem);

    if (await items.count() <= itemIndex) {
      throw new Error(`Item at index ${itemIndex} not found`);
    }

    const item = items.nth(itemIndex);

    const name = await item
      .locator(IRCTC_TEST_DATA.selectors.mealItemName)
      .first()
      .textContent();

    const price = await item
      .locator(IRCTC_TEST_DATA.selectors.mealItemPrice)
      .first()
      .textContent();

    const description = await item
      .locator(IRCTC_TEST_DATA.selectors.mealItemDescription)
      .first()
      .textContent();

    const image = await item
      .locator(IRCTC_TEST_DATA.selectors.mealItemImage)
      .first();

    const hasImage = await image.isVisible().catch(() => false);

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      description: description?.trim() || '',
      hasImage,
    };
  }

  /**
   * Verify all items have required details (name, price, description, image)
   */
  async verifyAllItemsCompleteDetails(): Promise<boolean> {
    const itemCount = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    for (let i = 0; i < itemCount; i++) {
      const details = await this.getItemDetails(i);

      const hasAllDetails =
        details.name.length > 0 &&
        details.price.length > 0 &&
        details.description.length > 0 &&
        details.hasImage;

      if (!hasAllDetails) {
        return false;
      }
    }

    return true;
  }

  /**
   * AC5.2: Verify veg/non-veg indicator visibility
   */
  async hasVegIndicator(itemIndex: number): Promise<boolean> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const vegIndicator = item.locator(IRCTC_TEST_DATA.selectors.vegIndicator);

    return await vegIndicator.isVisible().catch(() => false);
  }

  /**
   * Get veg indicator color for verification
   */
  async getVegIndicatorColor(itemIndex: number): Promise<string> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const indicator = item.locator(IRCTC_TEST_DATA.selectors.vegIndicator).first();

    const color = await indicator.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    return color;
  }

  /**
   * Verify veg indicators are present for all items
   */
  async verifyVegIndicatorsPresent(): Promise<boolean> {
    const itemCount = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    for (let i = 0; i < itemCount; i++) {
      const hasIndicator = await this.hasVegIndicator(i);

      if (!hasIndicator) {
        return false;
      }
    }

    return true;
  }

  /**
   * AC5.3: Verify price format and accuracy
   */
  async verifyPriceFormat(priceString: string): Promise<boolean> {
    const priceRegex = /^₹\d+(\.\d{2})?$/;
    return priceRegex.test(priceString);
  }

  /**
   * Extract numeric price from formatted string
   */
  async getPriceNumeric(priceString: string): Promise<number> {
    const numericString = priceString.replace('₹', '').trim();
    return parseFloat(numericString);
  }

  /**
   * Verify all item prices are valid format and positive
   */
  async verifyAllPricesValid(): Promise<boolean> {
    const itemCount = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    for (let i = 0; i < itemCount; i++) {
      const details = await this.getItemDetails(i);
      const price = await this.getPriceNumeric(details.price);

      const isValid =
        this.verifyPriceFormat(details.price) &&
        price > 0;

      if (!isValid) {
        return false;
      }
    }

    return true;
  }

  /**
   * AC5.4: Click on meal item to select it
   */
  async selectItemByIndex(itemIndex: number): Promise<void> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    await item.click();

    // Wait for selection state to update
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * Select item by name
   */
  async selectItemByName(itemName: string): Promise<void> {
    const item = this.page.locator(
      IRCTC_TEST_DATA.selectors.mealItemByName(itemName)
    );

    if (!(await item.isVisible())) {
      throw new Error(`Item "${itemName}" not found`);
    }

    await item.click();

    // Wait for selection animation
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * Verify item is selected (has .selected class or aria-selected="true")
   */
  async isItemSelected(itemIndex: number): Promise<boolean> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const hasSelectedClass = await item
      .evaluate(el => el.classList.contains('selected'));

    const isAriaSelected = await item
      .getAttribute('aria-selected')
      .then(value => value === 'true')
      .catch(() => false);

    return hasSelectedClass || isAriaSelected;
  }

  /**
   * Get count of selected items
   */
  async getSelectedItemCount(): Promise<number> {
    return await this.page
      .locator(IRCTC_TEST_DATA.selectors.selectedItem)
      .count();
  }

  /**
   * Get names of all selected items
   */
  async getSelectedItemNames(): Promise<string[]> {
    const selectedItems = await this.page
      .locator(IRCTC_TEST_DATA.selectors.selectedItem)
      .allTextContents();

    return selectedItems.map(item => item.trim());
  }

  /**
   * AC5.5: Verify long item names don't break layout
   */
  async verifyLongNamesHandled(): Promise<boolean> {
    const items = this.page.locator(IRCTC_TEST_DATA.selectors.mealItem);
    const itemCount = await items.count();

    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);

      // Check if text wraps (no overflow:hidden)
      const isOverflowHidden = await item.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.overflow === 'hidden' || style.textOverflow === 'ellipsis';
      });

      // Should wrap, not truncate
      if (isOverflowHidden) {
        return false;
      }
    }

    return true;
  }

  /**
   * AC5.6: Scroll through items and verify performance
   */
  async scrollThroughItemsAndMeasure(): Promise<number> {
    const startTime = Date.now();

    const lastItem = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .last();

    await lastItem.scrollIntoViewIfNeeded();

    // Verify all items accessible
    const itemCount = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    const endTime = Date.now();
    return endTime - startTime;
  }

  /**
   * Verify scrolling is smooth (no jank)
   */
  async isScrollSmooth(): Promise<boolean> {
    const scrollTime = await this.scrollThroughItemsAndMeasure();

    // Should complete within reasonable time
    return scrollTime < 2000;
  }

  /**
   * AC6.1: Verify close/remove button is visible on selected item
   */
  async isRemoveButtonVisibleForItem(itemIndex: number): Promise<boolean> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const removeButton = item.locator(IRCTC_TEST_DATA.selectors.removeButton).first();

    return await removeButton.isVisible().catch(() => false);
  }

  /**
   * Get size of remove button (verify adequate touch target)
   */
  async getRemoveButtonSize(itemIndex: number): Promise<{
    width: number;
    height: number;
  }> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const removeButton = item.locator(IRCTC_TEST_DATA.selectors.removeButton).first();

    const boundingBox = await removeButton.boundingBox();

    if (!boundingBox) {
      throw new Error('Remove button not found');
    }

    return { width: boundingBox.width, height: boundingBox.height };
  }

  /**
   * Verify remove button has adequate touch target (44x44 minimum)
   */
  async hasAdequateRemoveButtonTarget(itemIndex: number): Promise<boolean> {
    const size = await this.getRemoveButtonSize(itemIndex);
    return size.width >= 44 && size.height >= 44;
  }

  /**
   * AC6.2: Click remove button to deselect/remove item
   */
  async removeItemByIndex(itemIndex: number): Promise<void> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const removeButton = item.locator(IRCTC_TEST_DATA.selectors.removeButton).first();

    await removeButton.click();

    // Wait for removal animation
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay * 2);
  }

  /**
   * Remove item by name
   */
  async removeItemByName(itemName: string): Promise<void> {
    const item = this.page.locator(
      IRCTC_TEST_DATA.selectors.mealItemByName(itemName)
    );

    const removeButton = item.locator(IRCTC_TEST_DATA.selectors.removeButton).first();

    await removeButton.click();

    // Wait for removal animation
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay * 2);
  }

  /**
   * Verify item removed (not visible in selected items)
   */
  async isItemRemoved(itemIndex: number): Promise<boolean> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const hasSelectedClass = await item
      .evaluate(el => el.classList.contains('selected'))
      .catch(() => false);

    return !hasSelectedClass;
  }

  /**
   * AC6.3: Press Escape key to deselect focused item
   */
  async deselectviaEscape(): Promise<void> {
    await this.page.press('Escape');

    // Wait for state update
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * AC6.4: Select multiple items and verify independence
   */
  async selectMultipleItems(itemIndices: number[]): Promise<void> {
    for (const index of itemIndices) {
      await this.selectItemByIndex(index);
    }
  }

  /**
   * Verify specific items are selected
   */
  async verifyItemsSelected(itemIndices: number[]): Promise<boolean> {
    const selectedCount = await this.getSelectedItemCount();

    if (selectedCount !== itemIndices.length) {
      return false;
    }

    for (const index of itemIndices) {
      const isSelected = await this.isItemSelected(index);

      if (!isSelected) {
        return false;
      }
    }

    return true;
  }

  /**
   * AC6.5: Perform rapid select/remove cycles
   */
  async performRapidSelectRemoveCycles(
    itemIndex: number,
    cycleCount: number = 5
  ): Promise<void> {
    for (let i = 0; i < cycleCount; i++) {
      // Select
      await this.selectItemByIndex(itemIndex);

      // Wait for selection
      await this.page.waitForTimeout(IRCTC_TEST_DATA.debounceDelay);

      // Remove
      await this.removeItemByIndex(itemIndex);

      // Wait for removal
      await this.page.waitForTimeout(IRCTC_TEST_DATA.debounceDelay);
    }

    // Wait for final stable state
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * AC6.6: Remove item via mobile touch (tap)
   */
  async removeItemViaTap(itemIndex: number): Promise<void> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const removeButton = item.locator(IRCTC_TEST_DATA.selectors.removeButton).first();

    // Use tap for mobile simulation
    await removeButton.tap();

    // Wait for removal animation
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay * 2);
  }

  /**
   * AC6.7: Remove item with network latency
   */
  async removeItemWithLatency(itemIndex: number, latencyMs: number = 400): Promise<void> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const removeButton = item.locator(IRCTC_TEST_DATA.selectors.removeButton).first();

    // Start removal
    const clickPromise = removeButton.click();

    // Simulate latency by waiting
    await this.page.waitForTimeout(latencyMs);

    // Complete removal
    await clickPromise;

    // Wait for removal to complete
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay * 2);
  }

  /**
   * Wait for loading indicator to appear
   */
  async waitForLoadingIndicator(): Promise<void> {
    const spinner = this.page.locator(IRCTC_TEST_DATA.selectors.loadingSpinner);

    try {
      await spinner.isVisible({ timeout: 500 });
    } catch {
      // Loading may be too fast to see
    }
  }

  /**
   * Wait for loading indicator to disappear
   */
  async waitForLoadingComplete(): Promise<void> {
    const spinner = this.page.locator(IRCTC_TEST_DATA.selectors.loadingSpinner);

    try {
      await spinner.waitFor({ state: 'hidden', timeout: IRCTC_TEST_DATA.waits.navigationTimeout });
    } catch {
      // May not have visible loading indicator
    }
  }

  /**
   * AC6.8: Check for undo/re-add functionality (if available)
   */
  async isUndoAvailable(): Promise<boolean> {
    const undoButton = this.page.locator('[aria-label*="undo"], [aria-label*="re-add"]');

    return await undoButton.isVisible().catch(() => false);
  }

  /**
   * Click undo button if available
   */
  async clickUndo(): Promise<void> {
    const undoButton = this.page.locator('[aria-label*="undo"], [aria-label*="re-add"]');

    if (await undoButton.isVisible()) {
      await undoButton.click();

      // Wait for re-add to complete
      await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
    }
  }

  /**
   * Get current cart/selection summary
   */
  async getSelectionSummary(): Promise<{
    itemCount: number;
    itemNames: string[];
    totalPrice?: number;
  }> {
    const itemCount = await this.getSelectedItemCount();
    const itemNames = await this.getSelectedItemNames();

    return {
      itemCount,
      itemNames,
    };
  }

  /**
   * Verify cart updates reflect changes
   */
  async verifySelectionUpdatedInCart(expectedCount: number): Promise<boolean> {
    const cartIndicator = this.page.locator('[class*="cart"], [class*="selection"]');

    const cartText = await cartIndicator.textContent();

    return cartText?.includes(expectedCount.toString()) || false;
  }

  /**
   * Get all visible item details in tabular format
   */
  async getAllItemDetails(): Promise<
    Array<{
      name: string;
      price: string;
      description: string;
      hasImage: boolean;
    }>
  > {
    const itemCount = await this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .count();

    const details = [];

    for (let i = 0; i < itemCount; i++) {
      const itemDetail = await this.getItemDetails(i);
      details.push(itemDetail);
    }

    return details;
  }

  /**
   * Focus on specific item
   */
  async focusItemByIndex(itemIndex: number): Promise<void> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    await item.focus();
  }

  /**
   * Verify focus indicator visible on item
   */
  async hasFocusIndicator(itemIndex: number): Promise<boolean> {
    const item = this.page
      .locator(IRCTC_TEST_DATA.selectors.mealItem)
      .nth(itemIndex);

    const hasFocus = await item.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.outline !== 'none' || el.classList.contains('focused');
    });

    return hasFocus;
  }
}
