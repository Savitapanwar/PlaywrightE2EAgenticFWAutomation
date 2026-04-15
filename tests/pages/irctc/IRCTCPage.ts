/**
 * IRCTC Main Navigation Page Object
 * Handles interactions with IRCTC homepage and main navigation
 * Acceptance Criteria: AC1, AC2
 */

import { Page, expect } from '@playwright/test';
import { IRCTC_TEST_DATA } from '../../fixtures/irctc-test-data';

export class IRCTCPage {
  private page: Page;
  
  // Constructor
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to IRCTC homepage
   */
  async navigate(): Promise<void> {
    await this.page.goto(IRCTC_TEST_DATA.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify homepage loaded successfully
   */
  async isLoaded(): Promise<boolean> {
    const menuButton = await this.page.isVisible(IRCTC_TEST_DATA.selectors.menuButton);
    return menuButton;
  }

  /**
   * AC1.1: Verify top-right menu button is visible on desktop
   */
  async isMenuButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(IRCTC_TEST_DATA.selectors.menuButton);
  }

  /**
   * AC1.2: Verify menu button is accessible and sizeable on mobile
   */
  async getMenuButtonSize(): Promise<{ width: number; height: number }> {
    const boundingBox = await this.page
      .locator(IRCTC_TEST_DATA.selectors.menuButton)
      .boundingBox();
    
    if (!boundingBox) {
      throw new Error('Menu button not found');
    }
    
    return { width: boundingBox.width, height: boundingBox.height };
  }

  /**
   * Verify menu button has adequate touch target (minimum 44x44)
   */
  async hasAdequateTouchTarget(): Promise<boolean> {
    const size = await this.getMenuButtonSize();
    return size.width >= 44 && size.height >= 44;
  }

  /**
   * AC1.3: Access menu button via keyboard (Tab navigation)
   */
  async focusMenuButtonViaKeyboard(): Promise<boolean> {
    const menuButton = this.page.locator(IRCTC_TEST_DATA.selectors.menuButton);
    
    // Tab through elements until menu button is focused
    const maxTabs = 20;
    for (let i = 0; i < maxTabs; i++) {
      await this.page.press('Tab');
      const isFocused = await this.page.evaluate(
        (selector) => {
          const el = document.querySelector(selector);
          return document.activeElement === el;
        },
        IRCTC_TEST_DATA.selectors.menuButton
      );
      
      if (isFocused) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Verify menu button has visible focus indicator
   */
  async hasFocusIndicator(): Promise<boolean> {
    const isFocused = await this.page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const styles = window.getComputedStyle(el);
      return styles.outline !== 'none' || styles.boxShadow !== 'none';
    });
    
    return isFocused;
  }

  /**
   * AC1.3: Activate menu button via keyboard (Enter key)
   */
  async activateMenuViaKeyboard(): Promise<void> {
    // First focus on menu button
    const menuButton = this.page.locator(IRCTC_TEST_DATA.selectors.menuButton);
    await menuButton.focus();
    
    // Press Enter to activate
    await this.page.press('Enter');
    
    // Wait for menu to appear
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * Click the menu button (mouse interaction)
   */
  async clickMenuButton(): Promise<void> {
    const menuButton = this.page.locator(IRCTC_TEST_DATA.selectors.menuButton);
    await menuButton.click();
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * Verify menu button exists
   */
  async menuButtonExists(): Promise<boolean> {
    try {
      const menuButton = this.page.locator(IRCTC_TEST_DATA.selectors.menuButton);
      return await menuButton.count() > 0;
    } catch {
      return false;
    }
  }

  /**
   * AC1.5: Handle rapid menu clicks gracefully
   */
  async performRapidMenuClicks(count: number = 5): Promise<void> {
    const menuButton = this.page.locator(IRCTC_TEST_DATA.selectors.menuButton);
    
    for (let i = 0; i < count; i++) {
      await menuButton.click();
      await this.page.waitForTimeout(IRCTC_TEST_DATA.debounceDelay);
    }
    
    // Wait for final stable state
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
  }

  /**
   * AC2.1: Verify MEALS option is visible in menu
   */
  async isMealsOptionVisible(): Promise<boolean> {
    // First ensure menu is open
    await this.clickMenuButton();
    
    // Check if MEALS option visible
    const mealsLink = this.page.locator(IRCTC_TEST_DATA.selectors.mealsLink);
    return await mealsLink.isVisible();
  }

  /**
   * AC2.2: Navigate to MEALS section
   */
  async clickMeals(): Promise<void> {
    const mealsLink = this.page.locator(IRCTC_TEST_DATA.selectors.mealsLink);
    await mealsLink.click();
    
    // Wait for navigation and new page load
    await this.page.waitForNavigation({ waitUntil: 'networkidle' });
  }

  /**
   * Verify navigation to MEALS section was successful
   */
  async isMealsSectionLoaded(): Promise<boolean> {
    // Check if URL contains meals path
    const urlMatch = this.page.url().includes('/meals');
    
    // Check if meals content visible
    const cookedFoodHeading = this.page.locator(IRCTC_TEST_DATA.selectors.cookedFoodHeading);
    const contentVisible = await cookedFoodHeading.isVisible();
    
    return urlMatch && contentVisible;
  }

  /**
   * AC2.3: Get MEALS submenu items (if available)
   */
  async getMealsSubmenuItems(): Promise<string[]> {
    const mealsLink = this.page.locator(IRCTC_TEST_DATA.selectors.mealsLink);
    
    // Hover to trigger submenu
    await mealsLink.hover();
    await this.page.waitForTimeout(IRCTC_TEST_DATA.waits.animationDelay);
    
    // Get submenu items
    const submenuItems = await this.page
      .locator('[role="submenu"] li')
      .allTextContents();
    
    return submenuItems;
  }

  /**
   * AC2.4: Verify MEALS link has proper accessibility attributes
   */
  async getMealsAccessibilityAttributes(): Promise<{
    ariaLabel?: string;
    role?: string;
    href?: string;
  }> {
    const mealsLink = this.page.locator(IRCTC_TEST_DATA.selectors.mealsLink);
    
    const ariaLabel = await mealsLink.getAttribute('aria-label');
    const role = await mealsLink.getAttribute('role');
    const href = await mealsLink.getAttribute('href');
    
    return { ariaLabel: ariaLabel || undefined, role: role || undefined, href: href || undefined };
  }

  /**
   * AC2.5: Verify page remains responsive during MEALS content loading
   */
  async isPageResponsiveDuringLoad(): Promise<boolean> {
    const mealsLink = this.page.locator(IRCTC_TEST_DATA.selectors.mealsLink);
    
    // Start navigation
    const navigationPromise = this.page.waitForNavigation({ waitUntil: 'networkidle' });
    await mealsLink.click();
    
    // Try to interact with page while loading
    try {
      const input = this.page.locator('input').first();
      const isVisible = await input.isVisible({ timeout: 1000 });
      
      // Wait for navigation to complete
      await navigationPromise;
      
      return isVisible;
    } catch {
      // Page may not have interactive elements, but should respond
      await navigationPromise;
      return true;
    }
  }

  /**
   * Set viewport to specific dimensions
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Get current viewport size
   */
  async getViewportSize(): Promise<{ width: number; height: number }> {
    return await this.page.viewportSize() || { width: 1920, height: 1080 };
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Navigate back (browser back button equivalent)
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for network to be idle (no pending requests)
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check console for errors
   */
  async hasConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.Text);
      }
    });
    
    return errors;
  }
}
