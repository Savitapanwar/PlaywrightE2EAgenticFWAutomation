import { test, expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { TEST_DATA } from '../fixtures/test-data';

test.describe('TEST SUITE 6: Edge Cases', () => {
  let amazonSearch: AmazonSearchPage;

  test('EC1: Mobile viewport search (375x667)', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
    
    // Verify search is accessible on mobile
    expect(await amazonSearch.verifySearchBarVisible()).toBeTruthy();
    
    // Perform search
    await amazonSearch.searchFor(TEST_DATA.searchTerms.valid);
    
    // Verify results load on mobile
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Verify products are visible
    const productCount = await amazonSearch.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('EC2: Search immediately after page load (before all assets loaded)', async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    
    // Navigate but don't wait for full load
    await page.goto(TEST_DATA.baseUrl);
    
    // Immediately search (within < 1 second)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const searchInput = await page.locator('input[id="twotabsearchtextbox"]');
    
    // Search should still work
    await searchInput.fill(TEST_DATA.searchTerms.valid);
    await searchInput.press('Enter');
    
    // Results should eventually load
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('k=');
  });

  test('EC3: Single character search', async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
    
    // Search for single character
    await amazonSearch.searchFor(TEST_DATA.searchTerms.singleChar);
    
    // Results should load (may be large result set)
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Products should be found
    const productCount = await amazonSearch.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('EC4: Numeric-only search', async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
    
    // Search for numeric value
    await amazonSearch.searchFor(TEST_DATA.searchTerms.numeric);
    
    // Results should load
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Should find products with these numbers
    const productCount = await amazonSearch.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});
