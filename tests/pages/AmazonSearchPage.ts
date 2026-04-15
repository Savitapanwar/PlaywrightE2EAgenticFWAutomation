import { Page } from '@playwright/test';
import { SELECTORS, TEST_DATA } from '../fixtures/test-data';

export class AmazonSearchPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto(TEST_DATA.baseUrl, { waitUntil: 'networkidle' });
  }

  async getSearchInput() {
    return await this.page.locator(SELECTORS.searchInput);
  }

  async getGoButton() {
    return await this.page.locator(SELECTORS.goButton);
  }

  async getDepartmentDropdown() {
    return await this.page.locator(SELECTORS.departmentDropdown);
  }

  async searchFor(searchTerm: string) {
    const searchInput = await this.getSearchInput();
    await searchInput.fill(searchTerm);
    const goButton = await this.getGoButton();
    await goButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchWithEnter(searchTerm: string) {
    const searchInput = await this.getSearchInput();
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async selectCategory(category: string) {
    const dropdown = await this.getDepartmentDropdown();
    await dropdown.selectOption({ label: category });
  }

  async getProductCount() {
    const products = await this.page.locator(SELECTORS.productResult);
    return await products.count();
  }

  async verifySearchBarVisible() {
    const searchInput = await this.getSearchInput();
    return await searchInput.isVisible();
  }

  async verifyResultsPage() {
    await this.page.waitForLoadState('networkidle');
    return await this.page.url().includes('k=');
  }

  async getProductInformation(index: number = 0) {
    const products = await this.page.locator(SELECTORS.productResult);
    const product = products.nth(index);
    
    const title = await product.locator(SELECTORS.productTitle).textContent();
    const price = await product.locator(SELECTORS.productPrice).textContent();
    const rating = await product.locator(SELECTORS.productRating).getAttribute('aria-label');
    
    return { title, price, rating };
  }
}