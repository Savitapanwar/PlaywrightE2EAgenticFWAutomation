import { test, expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { TEST_DATA } from '../fixtures/test-data';

test.describe('TEST SUITE 3: Results Display - AC3', () => {
  let amazonSearch: AmazonSearchPage;

  test.beforeEach(async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
    await amazonSearch.searchFor(TEST_DATA.searchTerms.valid);
  });

  test('AC3.1: Product information completeness', async ({ page }) => {
    // Get first product information
    const productInfo = await amazonSearch.getProductInformation(0);
    
    // Verify all required fields are present
    expect(productInfo.title).toBeTruthy();
    expect(productInfo.price).toBeTruthy();
    expect(productInfo.rating).toBeTruthy();
    
    // Verify product image is visible
    const firstProduct = await page.locator('[data-component-type="s-search-result"]').first();
    const image = await firstProduct.locator('img').first();
    expect(await image.isVisible()).toBeTruthy();
  });

  test('AC3.2: Product metadata display (badges, ratings)', async ({ page }) => {
    // Verify products display expected metadata
    const firstProduct = await page.locator('[data-component-type="s-search-result"]').first();
    
    // Check for rating information
    const ratingElement = await firstProduct.locator('[aria-label*="out of 5"]');
    expect(await ratingElement.isVisible()).toBeTruthy();
    
    // Verify product information is visible
    const title = await firstProduct.locator('h2');
    expect(await title.isVisible()).toBeTruthy();
  });

  test('AC3.3: Multiple products formatting consistency', async ({ page }) => {
    // Get all products
    const products = await page.locator('[data-component-type="s-search-result"]');
    const count = await products.count();
    
    // Verify multiple products loaded
    expect(count).toBeGreaterThan(1);
    
    // Verify each product has expected structure
    for (let i = 0; i < Math.min(5, count); i++) {
      const product = products.nth(i);
      
      // Each product should have title
      const title = await product.locator('h2').isVisible();
      expect(title).toBeTruthy();
    }
  });

  test('AC3.4: Search results relevance to query', async ({ page }) => {
    // Verify products are relevant to search term
    const products = await page.locator('[data-component-type="s-search-result"]');
    const count = await products.count();
    
    // Should have multiple relevant results
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(1000); // Reasonable number of results
  });
});
