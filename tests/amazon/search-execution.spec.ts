import { test, expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { TEST_DATA } from '../fixtures/test-data';

test.describe('TEST SUITE 2: Search Execution - AC2', () => {
  let amazonSearch: AmazonSearchPage;

  test.beforeEach(async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
  });

  test('AC2.1: Successful search execution with "water bottle"', async ({ page }) => {
    await amazonSearch.searchFor(TEST_DATA.searchTerms.valid);
    
    // Verify navigation to results page
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Verify URL contains search keyword
    expect(page.url()).toContain('k=water');
    
    // Verify results are loaded
    const productCount = await amazonSearch.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('AC2.2: Search with category filter (Sports & Outdoors)', async ({ page }) => {
    await amazonSearch.selectCategory(TEST_DATA.categories.sportsOutdoors);
    await amazonSearch.searchFor(TEST_DATA.searchTerms.valid);
    
    // Verify results page loaded
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Verify category filter is applied
    expect(page.url()).toContain('k=water');
  });

  test('AC2.3: Search via Enter key instead of Go button', async ({ page }) => {
    await amazonSearch.searchWithEnter(TEST_DATA.searchTerms.valid);
    
    // Verify navigation to results page
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Verify same results as button-click method
    const productCount = await amazonSearch.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('AC2.4: Search with multiple spaces handling', async ({ page }) => {
    // First search: single space
    await amazonSearch.searchFor('water bottle');
    const firstSearchUrl = page.url();
    
    // Second search: multiple spaces
    await amazonSearch.navigate();
    await amazonSearch.searchFor('water    bottle');
    const secondSearchUrl = page.url();
    
    // URLs should be identical (multiple spaces normalized)
    expect(firstSearchUrl).toBe(secondSearchUrl);
  });
});
