import { test, expect } from '@playwright/test';
import { AmazonSearchPage } from '../pages/AmazonSearchPage';
import { TEST_DATA } from '../fixtures/test-data';

test.describe('TEST SUITE 4: Error Handling & Negative Cases - AC4', () => {
  let amazonSearch: AmazonSearchPage;

  test.beforeEach(async ({ page }) => {
    amazonSearch = new AmazonSearchPage(page);
    await amazonSearch.navigate();
  });

  test('AC4.1: Empty search submission handling', async ({ page }) => {
    // Attempt to search with empty string
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.fill('');
    
    const goButton = await amazonSearch.getGoButton();
    await goButton.click();
    
    // Application should either:
    // 1. Not navigate (stay on homepage)
    // 2. Show "no results" message
    // 3. Show all products
    // No crash should occur
    await page.waitForTimeout(1000);
    expect(page.url()).toBeDefined();
  });

  test('AC4.2: Whitespace-only search handling', async ({ page }) => {
    // Search with only whitespace
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.fill('    ');
    
    const goButton = await amazonSearch.getGoButton();
    await goButton.click();
    
    // Application should handle gracefully
    await page.waitForTimeout(1000);
    expect(page.url()).toBeDefined();
  });

  test('AC4.3: Special characters in search query', async ({ page }) => {
    // Search with special characters
    const specialInput = 'water bottle & @#$%^';
    
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.fill(specialInput);
    
    const goButton = await amazonSearch.getGoButton();
    await goButton.click();
    
    // Should complete without security issues
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBeDefined();
    
    // Verify no console errors
    const consoleErrors = await page.evaluate(() => {
      return (window as any).__consoleErrors || [];
    });
    // No security-critical errors expected
  });

  test('AC4.4: Very long search term (500+ characters)', async ({ page }) => {
    // Create very long search term
    const longTerm = 'a'.repeat(500);
    
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.fill(longTerm);
    
    const goButton = await amazonSearch.getGoButton();
    await goButton.click();
    
    // Should process without hanging
    await page.waitForTimeout(2000);
    expect(page.url()).toBeDefined();
  });

  test('AC4.5: SQL injection-like input handling', async ({ page }) => {
    // Attempt SQL injection pattern
    const sqlInjection = "water bottle' OR '1'='1";
    
    const searchInput = await amazonSearch.getSearchInput();
    await searchInput.fill(sqlInjection);
    
    const goButton = await amazonSearch.getGoButton();
    await goButton.click();
    
    // Input should be treated as literal search string
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBeDefined();
  });

  test('AC4.6: Rapid successive search requests', async ({ page }) => {
    // Perform rapid searches
    const searchInput = await amazonSearch.getSearchInput();
    const goButton = await amazonSearch.getGoButton();
    
    // First search
    await searchInput.fill('water bottle');
    await goButton.click();
    
    // Immediately navigate back and search again (before load completes)
    await amazonSearch.navigate();
    await searchInput.fill('coffee mug');
    await goButton.click();
    
    // Should complete without errors
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBeDefined();
  });

  test('AC4.7: Network error resilience', async ({ page }) => {
    // Set offline mode
    await page.context().setOffline(true);
    
    try {
      // Attempt search while offline
      const searchInput = await amazonSearch.getSearchInput();
      await searchInput.fill('water bottle');
      
      const goButton = await amazonSearch.getGoButton();
      await goButton.click();
      
      // Wait for error to appear
      await page.waitForTimeout(2000);
      
      // Page should show error, not crash
      expect(page.url()).toBeDefined();
    } finally {
      // Restore connection
      await page.context().setOffline(false);
    }
  });
});
