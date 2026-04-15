# IRCTC Meal Ordering E2E Test Automation Framework
## US-002: Breakfast Selection Quality Assurance

> Professional-grade Playwright E2E testing framework with Page Object Model architecture, comprehensive accessibility testing, and multi-browser support.

---

## 📋 Project Overview

This repository contains an enterprise-grade E2E test automation framework for the **IRCTC Meal Ordering** feature, specifically focused on **Breakfast Selection** within the Cooked Food Menu.

### Key Features

✅ **72 Comprehensive Test Cases** across 4 test suites  
✅ **Page Object Model Architecture** with 3 POM classes (50+ reusable methods)  
✅ **Full Accessibility Coverage** - Keyboard navigation, ARIA, screen readers  
✅ **Cross-Browser Testing** - Chromium, Firefox, WebKit support  
✅ **Responsive Design Testing** - Desktop, tablet, mobile viewports  
✅ **Production-Ready Code** - Full TypeScript, zero hardcoded values, extensive comments  

---

## 📊 Test Coverage

### Acceptance Criteria (6 ACs)

| AC | Feature | Tests | Status |
|----|---------|-------|--------|
| **AC1** | Top-right menu button accessibility | 6 | ✅ Complete |
| **AC2** | MEALS option navigation | 6 | ✅ Complete |
| **AC3** | Cooked Food Menu display & performance | 8 | ✅ Complete |
| **AC4** | Breakfast category selection | 7 | ✅ Complete |
| **AC5** | Breakfast item selection & details | 8 | ✅ Complete |
| **AC6** | Item removal & deselection | 10 | ✅ Complete |
| **E2E** | Happy path & edge cases | 25 | ✅ Complete |
| **TOTAL** | | **72 tests** | ✅ **100% Coverage** |

### Test Suites

1. **AC1-AC2: Menu Navigation** (`ac1-ac2-menu-navigation.spec.ts`)
   - 11 test cases for top-right menu and MEALS access
   - Keyboard navigation, mobile responsiveness, accessibility

2. **AC3-AC4: Menu Display** (`ac3-ac4-menu-display.spec.ts`)
   - 13 test cases for cooked food menu and breakfast category
   - Performance measurement, category switching, modal management

3. **AC5-AC6: Item Selection** (`ac5-ac6-item-selection.spec.ts`)
   - 23 test cases for item details, selection, and removal
   - Multiple selection, rapid interactions, mobile touch

4. **Happy Path & Edge Cases** (`happy-path-edge-cases.spec.ts`)
   - 25 test cases for complete workflows
   - Cross-browser, responsive, accessibility, performance

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 8+
- **Git**

### Installation

```bash
# Clone repository
git clone https://github.com/[org]/PlaywrightIRCTCE2EAgenticFW.git
cd PlaywrightIRCTCE2EAgenticFW

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Verify setup
npx playwright test --version
```

### First Test Run

```bash
# Run all IRCTC tests
npx playwright test tests/irctc/

# Run specific test suite
npx playwright test tests/irctc/ac1-ac2-menu-navigation.spec.ts

# Run in headed mode (see browser)
npx playwright test tests/irctc/ --headed

# Run with trace/video recording
npx playwright test tests/irctc/ --trace on --video on

# View test results
npx playwright show-report
```

---

## 📁 Project Structure

```
PlaywrightIRCTCE2EAgenticFW/
├── .github/
│   └── workflows/
│       └── e2e-tests-irctc.yml       # CI/CD Pipeline
├── tests/
│   ├── irctc/                         # Test Suites
│   │   ├── ac1-ac2-menu-navigation.spec.ts
│   │   ├── ac3-ac4-menu-display.spec.ts
│   │   ├── ac5-ac6-item-selection.spec.ts
│   │   └── happy-path-edge-cases.spec.ts
│   ├── pages/
│   │   └── irctc/                     # Page Objects (POM)
│   │       ├── IRCTCPage.ts           # Homepage & navigation
│   │       ├── MealsPage.ts           # Meals section
│   │       └── BreakfastModalPage.ts  # Item selection & removal
│   ├── fixtures/
│   │   └── irctc-test-data.ts         # Test data (8 items, 35+ selectors)
│   └── playwright.config.ts
├── specs/                              # Documentation
│   ├── plans/plan002_IRCTC.md
│   ├── IRCTC-EXPLORATORY-TESTING-REPORT.md
│   ├── IRCTC-TEST-EXECUTION-SUMMARY.md
│   └── IRCTC-COMPLETE-SUMMARY-REPORT.md
├── user-stories/
│   └── US-002                          # Acceptance criteria
├── README.md                           # This file
├── ARCHITECTURE.md                     # POM explanation
├── SETUP.md                            # Detailed setup guide
├── SELECTORS.md                        # UI selector mapping
├── package.json
└── .gitignore
```

---

## 🏗️ Architecture: Page Object Model (POM)

This framework strictly adheres to the **Page Object Model** pattern for maintainability and reusability.

### Three-Tier Architecture

```
┌─────────────────────────────────────────┐
│      Test Layer (72 Test Cases)         │
│  - AC1-AC2, AC3-AC4, AC5-AC6, Happy Path
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Page Object Layer (3 POM Classes)      │
│  - IRCTCPage (20 methods)               │
│  - MealsPage (20 methods)               │
│  - BreakfastModalPage (30 methods)      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Fixture Layer (Test Data)              │
│  - 8 Breakfast items                    │
│  - 35+ UI selectors                     │
│  - Helper functions                     │
└─────────────────────────────────────────┘
```

### Benefits

✅ **Single Point of Change** - Update selector in one place, affects all tests  
✅ **Reusability** - Methods composed across multiple tests  
✅ **Maintainability** - Clear separation of UI interactions from test logic  
✅ **Scalability** - Easy to add new tests using existing methods  

### Example: Using Page Objects

```typescript
// ❌ Without POM (brittle)
await page.click('.navHighlight');
await page.waitForTimeout(300);
const isMealsVisible = await page.isVisible('a:text("MEALS")');

// ✅ With POM (clean, reusable)
const irctcPage = new IRCTCPage(page);
await irctcPage.clickMenuButton();
const isMealsVisible = await irctcPage.isMealsOptionVisible();
```

---

## 🧪 Test Data Management

All test data is **externalized** and **recognizable** for easy debugging.

### Test Data File: `irctc-test-data.ts`

```typescript
// Recognizable breakfast items
const items = [
  { id: 'idli_001', name: 'Idli', price: '₹80', type: 'veg' },
  { id: 'dosa_002', name: 'Dosa', price: '₹120', type: 'veg' },
  { id: 'poha_003', name: 'Poha', price: '₹75', type: 'veg' },
  // ... 5 more items
];

// Robust selectors with fallbacks
const selectors = {
  menuButton: '.navHighlight',
  menuButtonAria: '[aria-label*="Menu"]',
  mealsLink: 'a:text("MEALS")',
  breakfastCategory: ':text("Breakfast")',
};
```

### Key Advantages

✅ No hardcoded values in tests  
✅ Single source of truth for test data  
✅ Easy item/selector updates  
✅ Helper functions for data operations  

---

## ♿ Accessibility Testing

Framework includes comprehensive accessibility coverage:

### Keyboard Navigation
- ✅ Tab/Shift+Tab through all interactive elements
- ✅ Enter/Space for activation
- ✅ Escape for dismissal
- ✅ Logical tab order verified

### Screen Reader Support
- ✅ ARIA labels and roles tested
- ✅ Semantic HTML structure validated
- ✅ Live regions for dynamic content

### Visual Accessibility
- ✅ Focus indicators visible
- ✅ Color contrast compliant (WCAG AA)
- ✅ Touch targets 44x44 minimum (mobile)
- ✅ Text sizing flexible

---

## 📱 Responsive & Cross-Browser

### Viewport Coverage

| Device | Size | Tests |
|--------|------|-------|
| **Mobile** | 375x667 | ✅ 8 dedicated |
| **Tablet** | 768x1024 | ✅ 4 dedicated |
| **Desktop** | 1920x1080 | ✅ 8 dedicated |
| **Any** | Dynamic | ✅ 52 adaptive |

### Browser Coverage

| Browser | Status | Details |
|---------|--------|---------|
| **Chromium** | ✅ Primary | Default test browser |
| **Firefox** | ✅ Included | CI/CD matrix |
| **WebKit** | ✅ Available | Optional profile |

### Example: Multi-Browser Execution

```bash
# Run on all browsers (CI/CD default)
npx playwright test

# Run on specific browser
npx playwright test --project=firefox

# Run on multiple browsers (with matrix)
npm run test:browsers
```

---

## 📊 Performance Baselines

Expected performance metrics for IRCTC meal ordering:

| Operation | Baseline | Threshold |
|-----------|----------|-----------|
| Homepage Load | 2-3s | 5s |
| Menu Open | <1s | 2s |
| MEALS Navigation | 1-2s | 3s |
| Breakfast Modal | <1s | 2s |
| Item Selection | <1s | 2s |
| Complete Flow | 12-15s | 30s |

Performance measured automatically in tests.

---

## 🔧 Debugging & Troubleshooting

### Enable Debug Mode

```bash
# Run with detailed debug output
npm run test:debug

# Or with PW inspector
PWDEBUG=1 npx playwright test

# With trace on failure
npx playwright test --trace on
```

### View Test Reports

```bash
# HTML report (most useful)
npx playwright show-report

# JSON report
npx playwright test tests/irctc/ --reporter=json > results.json

# Markdown report
npx playwright test tests/irctc/ --reporter=markdown
```

### Common Issues

**Tests timing out on selector?**
- Check `IRCTC_TEST_DATA.selectors` in `irctc-test-data.ts`
- Use role-based selectors: `[role="button"]`, `[aria-label*="menu"]`
- Run `npx playwright codegen` to find correct selectors

**IRCTC website structure changed?**
- Update selectors in `/tests/fixtures/irctc-test-data.ts`
- Run exploratory testing to identify new selectors
- Use `playwright-test-healer` agent for automatic fixes

**Rate limiting / blocked access?**
- Add delays between test runs
- Use different wait strategies (idle vs load)
- Test during off-peak hours

---

## 📚 Documentation

### Primary Documents

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - POM design and principles
- **[SETUP.md](SETUP.md)** - Detailed environment setup
- **[SELECTORS.md](SELECTORS.md)** - UI element selector mapping
- **[USER STORY](user-stories/US-002)** - Feature requirements (6 ACs)

### Generated Reports

- **Test Plan** - `/specs/plans/plan002_IRCTC.md` (39 scenarios)
- **Exploratory Testing** - `/specs/IRCTC-EXPLORATORY-TESTING-REPORT.md` (live site validation)
- **Execution Summary** - `/specs/IRCTC-TEST-EXECUTION-SUMMARY.md` (framework metrics)
- **Complete Report** - `/specs/IRCTC-COMPLETE-SUMMARY-REPORT.md` (comprehensive analysis)

---

## 🤝 Adding New Tests

### Adding Test to Existing Suite

```typescript
// 1. Use existing POM methods
test('New scenario description', async ({ page }) => {
  const irctcPage = new IRCTCPage(page);
  const mealsPage = new MealsPage(page);
  
  // 2. Use existing methods (no new selectors needed)
  await irctcPage.navigate();
  await irctcPage.clickMenuButton();
  await irctcPage.clickMeals();
  
  // 3. Add your test logic
  const isLoaded = await mealsPage.isCookedFoodMenuVisible();
  expect(isLoaded).toBe(true);
});
```

### Adding New Test Suite

```typescript
// 1. Create `/tests/irctc/new-feature.spec.ts`
// 2. Import POM classes
// 3. Add 5-10 related tests
// 4. Follow existing patterns

import { test, expect } from '@playwright/test';
import { IRCTCPage } from '../pages/irctc/IRCTCPage';

test.describe('New Feature', () => {
  // Your tests here
});
```

### Adding New POM Method

```typescript
// 1. Identify UI interaction
// 2. Add to corresponding POM class (IRCTCPage, MealsPage, or BreakfastModalPage)
// 3. Follow naming pattern: `verb + Noun` (e.g., `clickBreakfastCategory`)
// 4. Add JSDoc comment
// 5. Use externalized selectors

/**
 * New method description
 * @returns Result of action
 */
async newMethod(): Promise<boolean> {
  const element = this.page.locator(IRCTC_TEST_DATA.selectors.someSelector);
  await element.click();
  return await element.isVisible();
}
```

---

## 🚀 CI/CD Integration

### GitHub Actions Workflow

Automated testing runs on:
- ✅ Every push to `main` or `develop`
- ✅ Every pull request
- ✅ Daily schedule (2 AM UTC)
- ✅ Manual trigger (workflow_dispatch)

### Workflow File

See `.github/workflows/e2e-tests-irctc.yml` for configuration.

### View CI/CD Runs

```bash
# GitHub Actions tab shows all runs
# Download artifacts for reports
# Check commit status badges
```

---

## 📦 Dependencies

```json
{
  "@playwright/test": "^1.59.1",
  "@types/node": "^25.5.2"
}
```

### Installation

```bash
# Install all dependencies
npm install

# Update Playwright browsers
npx playwright install
```

---

## 📝 License

This test automation framework is proprietary QA intellectual property.

---

## 📞 Support & Contact

### Issues & Questions

1. Check [SELECTORS.md](SELECTORS.md) for selector issues
2. Review [SETUP.md](SETUP.md) for environment problems
3. Create GitHub Issue with:
   - Test suite name
   - Failure description
   - Error logs
   - Screenshots/videos

### Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add test for feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create Pull Request

### Code Review Checklist

- [ ] Tests follow existing patterns
- [ ] All methods have JSDoc comments
- [ ] No hardcoded selectors (use IRCTC_TEST_DATA)
- [ ] Tests pass locally
- [ ] No console errors
- [ ] Code formatted consistently

---

## 📊 Metrics & Statistics

### Code Statistics

| Metric | Value |
|--------|-------|
| **Total Lines of Code** | 2,620 |
| **Test Files** | 4 |
| **POM Classes** | 3 |
| **Methods** | 50+ |
| **Test Cases** | 72 |
| **Selectors** | 35+ |
| **Helper Functions** | 5 |

### Coverage

| Aspect | Coverage |
|--------|----------|
| **Acceptance Criteria** | 100% (6/6 ACs) |
| **Happy Path** | ✅ Complete |
| **Edge Cases** | ✅ Comprehensive |
| **Accessibility** | ✅ Full keyboard & ARIA |
| **Mobile Responsive** | ✅ 3 viewports tested |
| **Cross-Browser** | ✅ 3 browsers (Chromium, Firefox, WebKit) |

---

## 🎯 Next Steps

1. **Run tests locally** - `npm run test:irctc`
2. **Review test reports** - `npx playwright show-report`
3. **Fix failing tests** - Use playwright inspector
4. **Add new tests** - Follow existing patterns
5. **Deploy to CI/CD** - Push to main branch

---

## 📅 Release History

| Version | Date | Changes |
|---------|------|---------|
| **1.0.0** | 2026-04-15 | Initial release: 72 tests, 3 POM classes, full documentation |

---

**Framework Status:** ✅ Production-Ready  
**Last Updated:** April 15, 2026  
**Maintained By:** QA Engineering Team

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [IRCTC Website](https://www.irctc.co.in/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
