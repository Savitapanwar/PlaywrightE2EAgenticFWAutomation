import { test, expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { TEST_DATA } from '../fixtures/test-data';

test.describe('TEST SUITE 5: Happy Path - Complete User Journey', () => {
  test('Complete search journey: Homepage → Search → Results → Product View', async ({ page }) => {
    const amazonSearch = new AmazonSearchPage(page);
    
    // Step 1: Verify homepage loads with search bar visible
    await amazonSearch.navigate();
    expect(await amazonSearch.verifySearchBarVisible()).toBeTruthy();
    
    // Step 2: Enter search term "water bottle"
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.fill(TEST_DATA.searchTerms.valid);
    
    // Step 3: Click Go button
    const goButton = await amazonSearch.getGoButton();
    await goButton.click();
    
    // Step 4: Verify results page loads
    await page.waitForLoadState('networkidle');
    expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
    
    // Step 5: Verify results display product list
    const productCount = await amazonSearch.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    // Step 6: Get first product information
    const productInfo = await amazonSearch.getProductInformation(0);
    expect(productInfo.title).toBeTruthy();
    expect(productInfo.price).toBeTruthy();
    
    // Step 7: Click on first product (optional - demonstrates navigation)
    const firstProduct = await page.locator('[data-component-type="s-search-result"]').first();
    const productLink = await firstProduct.locator('h2 a').first();
    
    if (await productLink.isVisible()) {
      await productLink.click();
      
      // Verify product detail page loads
      await page.waitForLoadState('networkidle');
      expect(page.url()).not.toContain('/s?');
    }
    
    console.log('✅ Complete journey successful');
  });
});
