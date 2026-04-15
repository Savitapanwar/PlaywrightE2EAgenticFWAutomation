import { test, expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { TEST_DATA } from '../fixtures/test-data';

test.describe('TEST SUITE 1: Homepage Navigation - AC1', () => {
  let amazonSearch: AmazonSearchPage;

  test.beforeEach(async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
  });

  test('AC1.1: Search bar visible on desktop homepage', async ({ page }) => {
    // Verify search bar is prominently displayed
    const searchInput = await amazonSearch.getSearchInput();
    expect(await searchInput.isVisible()).toBeTruthy();
    
    // Verify search bar has correct placeholder
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
    
    // Verify Go button is present and visible
    const goButton = await amazonSearch.getGoButton();
    expect(await goButton.isVisible()).toBeTruthy();
  });

  test('AC1.2: Search bar responsive across devices', async ({ page }) => {
    // Test desktop viewport (default)
    const searchInput = await amazonSearch.getSearchInput();
    expect(await searchInput.isVisible()).toBeTruthy();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    expect(await searchInput.isVisible()).toBeTruthy();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    expect(await searchInput.isVisible()).toBeTruthy();
  });

  test('AC1.3: Keyboard navigation to search bar', async ({ page }) => {
    // Focus on search input
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.focus();
    
    // Verify input is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.id);
    expect(focusedElement).toBe('twotabsearchtextbox');
  });
});
