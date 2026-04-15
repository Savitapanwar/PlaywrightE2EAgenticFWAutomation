/**
 * IRCTC Meal Ordering Test Data (US-002)
 * This file contains all test data specific to the IRCTC meal ordering feature.
 * Separate from US-001 (Amazon) to prevent cross-contamination.
 * 
 * Data Format: Easily recognizable meal names and prices for debugging
 */

export const IRCTC_TEST_DATA = {
  // Application URLs
  baseUrl: 'https://www.irctc.co.in/',
  mealsPath: '/nget/meals',
  
  // Categories
  categories: {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
  },

  // Breakfast Menu Items (easily recognizable names with actual items)
  breakfastItems: [
    {
      id: 'idli_001',
      name: 'Idli',
      price: '₹80',
      priceNumeric: 80,
      description: 'Steamed rice cakes served with sambar and chutney',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-idli',
    },
    {
      id: 'dosa_002',
      name: 'Dosa',
      price: '₹120',
      priceNumeric: 120,
      description: 'Crispy rice crepe with potato filling',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-dosa',
    },
    {
      id: 'poha_003',
      name: 'Poha',
      price: '₹75',
      priceNumeric: 75,
      description: 'Flattened rice flakes with vegetables',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-poha',
    },
    {
      id: 'paratha_004',
      name: 'Paratha',
      price: '₹100',
      priceNumeric: 100,
      description: 'Indian bread served with butter and pickle',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-paratha',
    },
    {
      id: 'upma_005',
      name: 'Upma',
      price: '₹90',
      priceNumeric: 90,
      description: 'Semolina porridge with vegetables and cashews',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-upma',
    },
    {
      id: 'puri_006',
      name: 'Puri',
      price: '₹85',
      priceNumeric: 85,
      description: 'Deep-fried Indian bread served with curry',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-puri',
    },
    {
      id: 'wada_007',
      name: 'Vada',
      price: '₹95',
      priceNumeric: 95,
      description: 'Spiced lentil fritters served with sambar',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-wada',
    },
    {
      id: 'paneer_008',
      name: 'Paneer Masala Dosa',
      price: '₹150',
      priceNumeric: 150,
      description: 'Dosa filled with cottage cheese in spiced gravy',
      type: 'veg',
      icon: 'veg-indicator',
      testSelector: 'meal-item-paneer-dosa',
    },
  ],

  // Test Scenarios - Selection combinations
  selections: {
    single: ['idli_001'],
    twoItems: ['idli_001', 'dosa_002'],
    threeItems: ['idli_001', 'dosa_002', 'poha_003'],
    allBreakfast: ['idli_001', 'dosa_002', 'poha_003', 'paratha_004', 'upma_005', 'puri_006', 'wada_007', 'paneer_008'],
  },

  // Selectors - UI element selectors
  selectors: {
    // Navigation
    menuButton: '.navHighlight',
    menuButtonAria: '[aria-label*="Menu"][aria-label*="Toggle"]',
    
    // Meals Section
    mealsLink: 'a:text("MEALS")',
    mealsLinkAria: '[aria-label*="Meals"][aria-label*="Catering"]',
    mealsSection: 'h2:text-matches("MEALS", "i")',
    
    // Cooked Food Menu
    cookedFoodHeading: 'h2:text-matches("Cooked", "i")',
    
    // Categories
    categoryButton: '[class*="category"]',
    breakfastCategory: ':text("Breakfast")',
    lunchCategory: ':text("Lunch")',
    dinnerCategory: ':text("Dinner")',
    snacksCategory: ':text("Snacks")',
    
    // Modal/Panel
    mealModal: '[role="dialog"]',
    modalBackdrop: '[class*="backdrop"]',
    modalCloseButton: '[aria-label="Close"]',
    
    // Meal Items
    mealItem: '[class*="meal-item"]',
    mealItemByName: (name: string) => `[class*="meal-item"]:has-text("${name}")`,
    mealItemName: '[class*="meal-item"] h4, [class*="meal-item"] [class*="name"]',
    mealItemPrice: '[class*="meal-item"] [class*="price"]',
    mealItemDescription: '[class*="meal-item"] p',
    mealItemImage: '[class*="meal-item"] img',
    vegIndicator: '[class*="veg-indicator"]',
    nonVegIndicator: '[class*="non-veg-indicator"]',
    
    // Selection & Removal
    selectedItem: '[class*="selected"]',
    removeButton: '[class*="remove-btn"]',
    removeButtonAria: '[aria-label*="Remove"]',
    closeIconButton: '[class*="close-icon"]',
    
    // Quantity Controls
    quantityInput: '[class*="quantity"]',
    increaseBtn: '[aria-label*="Increase"]',
    decreaseBtn: '[aria-label*="Decrease"]',
    
    // Status/Loading
    loadingSpinner: '[class*="spinner"]',
    loadingIndicator: '[role="status"]',
    emptyStateMessage: ':text-matches("No items|temporarily unavailable", "i")',
  },

  // Waits & Timeouts
  waits: {
    navigationTimeout: 5000,
    modalTimeout: 3000,
    itemLoadTimeout: 3000,
    animationDelay: 300,
    networkIdle: 'networkidle',
  },

  // Performance Baselines
  performance: {
    homePageLoad: 3000,      // milliseconds
    menuOpen: 1000,
    mealsNavigate: 2000,
    breakfastModal: 2000,
    itemLoad: 1000,
    removalAnimation: 300,
  },

  // Accessibility Attributes
  a11y: {
    menuAriaLabel: 'Toggle navigation',
    mealsAriaLabel: 'Meals and Catering Services',
    breakfastAriaLabel: 'Breakfast menu category',
    itemAriaLabel: (name: string) => `${name} meal item`,
    removeAriaLabel: 'Remove from selection',
  },

  // Error Messages (expected)
  errorMessages: {
    noBreakfastItems: 'No breakfast items available',
    loadingFailed: 'Failed to load menu',
    selectionFailed: 'Unable to select item',
    removalFailed: 'Unable to remove item',
  },

  // Timing Constants
  debounceDelay: 300,
  transitionDuration: 200,
  clickDelay: 100,
  rapidClickCount: 5,
  rapidClickInterval: 400,
};

/**
 * Helper function to get item by ID
 */
export function getBreakfastItemById(itemId: string) {
  return IRCTC_TEST_DATA.breakfastItems.find(item => item.id === itemId);
}

/**
 * Helper function to get item by name
 */
export function getBreakfastItemByName(itemName: string) {
  return IRCTC_TEST_DATA.breakfastItems.find(
    item => item.name.toLowerCase() === itemName.toLowerCase()
  );
}

/**
 * Helper function to get all item names
 */
export function getAllBreakfastItemNames(): string[] {
  return IRCTC_TEST_DATA.breakfastItems.map(item => item.name);
}

/**
 * Helper function to verify price format
 */
export function isValidPriceFormat(price: string): boolean {
  return /^₹\d+(\.\d{2})?$/.test(price);
}

/**
 * Helper function to extract numeric price
 */
export function getPriceNumeric(priceString: string): number {
  const numericValue = priceString.replace('₹', '').trim();
  return parseFloat(numericValue);
}
