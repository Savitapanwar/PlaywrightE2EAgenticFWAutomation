# Playwright E2E Agentic QA Framework
## Amazon Product Search Automation

**Repository:** PlaywrightE2EAgenticFW  
**Framework:** Playwright + MCP Agents  
**Last Updated:** April 8, 2026

---

## 📋 Overview

This repository contains a complete end-to-end (E2E) agentic QA workflow for testing the Amazon product search feature (US-001). The project demonstrates professional automation practices including:

- ✅ Intelligent test planning using AI agents
- ✅ Comprehensive test coverage (21 scenarios)
- ✅ Page Object Model (POM) architecture
- ✅ Exploratory testing documentation
- ✅ Automated test generation and execution
- ✅ Test failure analysis and healing

---

## 🎯 Project Structure

```
PlaywrightE2EAgenticFW/
├── specs/
│   ├── plans/
│   │   └── plan001.md                    # Test plan (21 scenarios)
│   ├── EXPLORATORY-TESTING-REPORT.md    # Manual validation findings
│   ├── TEST-SUMMARY-001.md              # Execution results & metrics
│   └── README.md
├── tests/
│   ├── amazon/
│   │   ├── homepage-navigation.spec.ts  # AC1 tests
│   │   ├── search-execution.spec.ts     # AC2 tests
│   │   ├── results-display.spec.ts      # AC3 tests
│   │   ├── error-handling.spec.ts       # AC4 tests
│   │   ├── happy-path.spec.ts           # Happy path journey
│   │   └── edge-cases.spec.ts           # Edge case scenarios
│   ├── pages/
│   │   └── AmazonSearchPage.ts          # Page Object for Amazon
│   ├── fixtures/
│   │   ├── test-data.ts                 # Test data & selectors
│   │   └── test-fixtures.ts             # Playwright fixtures
│   ├── seed.spec.ts                     # Setup/baseline test
│   └── example.spec.ts                  # Example tests
├── test-results/                        # Playwright test results
├── playwright-report/                   # HTML test reports
├── playwright.config.ts                 # Playwright configuration
├── package.json                         # Dependencies
├── .gitignore                          # Git ignore rules
├── .github/
│   └── workflows/
│       └── e2e-tests.yml               # GitHub Actions CI/CD
└── README.md                           # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_ORG/PlaywrightE2EAgenticFW.git
cd PlaywrightE2EAgenticFW

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/amazon/search-execution.spec.ts

# Run with UI mode (interactive)
npx playwright test --ui

# Run with debug mode
npx playwright test --debug

# Run with specific browser
npx playwright test --project=chromium
```

### Viewing Test Reports

```bash
# Open HTML report
npx playwright show-report
```

---

## 📊 Test Coverage

### Test Suites (21 Total Scenarios)

| Suite | Scenarios | Focus Area |
|-------|-----------|-----------|
| 1. Homepage Navigation | 3 | Search bar visibility & accessibility |
| 2. Search Execution | 4 | Search functionality & keywords |
| 3. Results Display | 4 | Product information & formatting |
| 4. Error Handling | 7 | Robustness & security |
| 5. Happy Path | 1 | Complete user journey |
| 6. Edge Cases | 4 | Boundary conditions |

### Acceptance Criteria Coverage

- ✅ **AC1:** Homepage Navigation - Search bar visible at top
- ✅ **AC2:** Search Execution - Redirect to results page
- ✅ **AC3:** Results Display - Product list with complete info
- ✅ **AC4:** Error Handling - Graceful error management

---

## 🏗️ Architecture

### Page Object Model (POM)

```typescript
// Usage example
const amazonSearch = new AmazonSearchPage(page);
await amazonSearch.navigate();
await amazonSearch.searchFor('water bottle');
expect(await amazonSearch.verifyResultsPage()).toBeTruthy();
```

### Test Data Organization

```typescript
// Centralized test data
const TEST_DATA = {
  baseUrl: 'https://www.amazon.com',
  searchTerms: { valid: 'water bottle', empty: '' },
  timeouts: { pageLoad: 10000 },
};
```

### Selector Strategy

1. **[Priority 1] Role-based:** `getByRole('button', { name: /go/i })`
2. **[Priority 2] Labels:** `getByLabel('Search')`
3. **[Priority 3] Test IDs:** `getByTestId('search-button')`
4. **[Priority 4] CSS:** `locator('input.search')`

---

## 🔧 Configuration

### Playwright Config

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.amazon.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
```

---

## 📈 Metrics & Reports

### Test Execution Metrics
- **Total Tests:** 21 core scenarios
- **Test Duration:** 15-25s per test average
- **Framework:** Playwright ^latest
- **Node Version:** ^18.0.0

### Performance Baseline
- Homepage Load: 2-3s
- Results Load: 3-4s
- Total Flow: 5-6s

---

## 🔍 Workflow Steps

The project follows a structured agentic QA workflow:

1. **Step 1:** User Story Analysis → `US-001` from `/user-stories/`
2. **Step 2:** Test Plan Generation → `plan001.md` with 21 scenarios
3. **Step 3:** Exploratory Testing → `EXPLORATORY-TESTING-REPORT.md`
4. **Step 4:** Script Generation → Test files in `/tests/amazon/`
5. **Step 5:** Execution & Healing → Run tests and fix failures
6. **Step 6:** Summary Report → `TEST-SUMMARY-001.md`
7. **Step 7:** GitHub Management → Version control & CI/CD

---

## 🛠️ Troubleshooting

### Issue: Tests Timeout
**Solution:** Update `playwright.config.ts`:
```typescript
timeout: 50000, // Increase from 30000
```

### Issue: Selector Not Found
**Solution:** Use Playwright Inspector:
```bash
npx playwright codegen https://www.amazon.com
```

### Issue: Network Errors
**Solution:** Add retry logic in tests:
```typescript
test.afterEach(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
});
```

---

## 🔄 CI/CD Integration

The project includes GitHub Actions workflow for automated testing:

```yaml
# .github/workflows/e2e-tests.yml
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📝 Best Practices

- ✅ Use Page Object Model for maintainability
- ✅ Centralize test data and selectors
- ✅ No hardcoded timeouts
- ✅ Use auto-wait mechanisms
- ✅ Capture screenshots on failure
- ✅ Document all test scenarios
- ✅ Test error scenarios thoroughly
- ✅ Plan for edge cases

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/add-more-tests`
2. Add tests and update documentation
3. Run tests locally: `npm test`
4. Commit with clear messages
5. Push and create Pull Request

---

## 📄 License

MIT - See LICENSE file for details

---

## 👥 Authors

- **Automated by:** Playwright Test Generator Agent
- **Framework by:** GitHub Copilot
- **Initial Design:** QA Workflow Automation

---

## 📞 Support

For issues or questions:
- Check `/specs/TEST-SUMMARY-001.md` for execution results
- Review `/specs/EXPLORATORY-TESTING-REPORT.md` for findings
- See `/specs/plans/plan001.md` for test specifications

---

**Last Updated:** April 8, 2026  
**Status:** ✅ Production-Ready  
**Version:** 1.0.0
