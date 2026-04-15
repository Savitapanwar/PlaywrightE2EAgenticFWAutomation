export const TEST_DATA = {
  baseUrl: 'https://www.amazon.com',
  searchTerms: {
    valid: 'water bottle',
    empty: '',
    whitespace: '    ',
    specialChars: "water bottle & <script>alert('xss')</script>",
    longTerm: 'a'.repeat(500),
    numeric: '1000',
    singleChar: 'w',
  },
  categories: {
    sportsOutdoors: 'Sports & Outdoors',
    electronics: 'Electronics',
    books: 'Books',
  },
  timeouts: {
    pageLoad: 10000,
    networkIdle: 6000,
    elementVisible: 5000,
  },
};

export const SELECTORS = {
  searchInput: 'input[id="twotabsearchtextbox"]',
  goButton: 'input[type="submit"][value="Go"]',
  departmentDropdown: 'select[id="searchDropdownBox"]',
  productResult: 'div[data-component-type="s-search-result"]',
  productImage: 'img[alt*="product"]',
  productTitle: 'h2 span[dir="auto"]',
  productPrice: 'span[class*="a-price-whole"]',
  productRating: 'span[aria-label*="out of 5 stars"]',
  noResults: 'text="No results found"',
  searchSuggestion: '[aria-label="Search suggestions"]',
};