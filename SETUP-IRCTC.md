# IRCTC Test Automation Setup Guide
## Complete Environment Configuration

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Verification](#verification)
5. [Running Tests](#running-tests)
6. [Troubleshooting](#troubleshooting)
7. [CI/CD Setup](#cicd-setup)
8. [IDE Integration](#ide-integration)

---

## 📦 Prerequisites

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **OS** | Windows 10, macOS 10.15, Linux | Windows 11, macOS 12+, Ubuntu 20+ |
| **RAM** | 4 GB | 8 GB |
| **Disk** | 500 MB | 2 GB |
| **CPU** | Dual-core | Quad-core |

### Required Software

- **Node.js**: v18.0.0 or later (LTS recommended: v20.x)
- **npm**: 8.0.0 or later (comes with Node.js)
- **Git**: 2.30.0 or later
- **VS Code** (optional but recommended): Latest stable version

### Supported Browsers

- **Chromium**: ✅ Default
- **Firefox**: ✅ Supported
- **WebKit**: ✅ Available (optional)

---

## 💾 Installation

### Step 1: Install Node.js

#### Windows

```powershell
# Option A: Using Windows package manager (Winget)
winget install OpenJS.NodeJS

# Option B: Download from https://nodejs.org/
# Download LTS version (v20.x) → Run installer → Follow wizard

# Verify installation
node --version      # Should show v18.0.0 or later
npm --version       # Should show 8.0.0 or later
```

#### macOS

```bash
# Option A: Using Homebrew
brew install node

# Option B: Using MacPorts
sudo port install nodejs20

# Verify installation
node --version
npm --version
```

#### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt-get update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 2: Clone Repository

```bash
# Using HTTPS (simplest)
git clone https://github.com/[org]/PlaywrightIRCTCE2EAgenticFW.git
cd PlaywrightIRCTCE2EAgenticFW

# OR using SSH (if SSH key configured)
git clone git@github.com:[org]/PlaywrightIRCTCE2EAgenticFW.git
cd PlaywrightIRCTCE2EAgenticFW
```

### Step 3: Install Dependencies

```bash
# Install npm packages
npm install

# This installs:
# - @playwright/test: ^1.59.1
# - @types/node: ^25.5.2
# - And all other dependencies in package.json
```

### Step 4: Install Playwright Browsers

```bash
# Download browser binaries (required for Playwright tests)
npx playwright install

# This downloads:
# - Chromium (~100 MB)
# - Firefox (~80 MB)
# - WebKit (~80 MB)
# [Total: ~260 MB]

# Verify installation
npx playwright --version
```

---

## ⚙️ Configuration

### Project Structure Verification

After installation, verify this structure:

```
PlaywrightIRCTCE2EAgenticFW/
├── .github/
│   └── workflows/
│       └── e2e-tests-irctc.yml
├── tests/
│   ├── irctc/
│   │   ├── ac1-ac2-menu-navigation.spec.ts
│   │   ├── ac3-ac4-menu-display.spec.ts
│   │   ├── ac5-ac6-item-selection.spec.ts
│   │   └── happy-path-edge-cases.spec.ts
│   ├── pages/
│   │   └── irctc/
│   │       ├── IRCTCPage.ts
│   │       ├── MealsPage.ts
│   │       └── BreakfastModalPage.ts
│   ├── fixtures/
│   │   ├── test-data.ts (US-001 - DO NOT MODIFY)
│   │   └── irctc-test-data.ts (US-002 - IRCTC specific)
│   └── playwright.config.ts
├── specs/
│   ├── plans/
│   │   └── plan002_IRCTC.md
│   ├── IRCTC-EXPLORATORY-TESTING-REPORT.md
│   ├── IRCTC-TEST-EXECUTION-SUMMARY.md
│   └── IRCTC-COMPLETE-SUMMARY-REPORT.md
├── user-stories/
│   └── US-002
├── node_modules/
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README-IRCTC.md
├── ARCHITECTURE-IRCTC.md
├── SETUP-IRCTC.md (this file)
└── .gitignore
```

### File Permission Verification

Ensure all test files are readable:

```bash
# Windows
cd tests/irctc
dir /B *.spec.ts
# Should show 4 test files

# macOS/Linux
ls -la tests/irctc/*.spec.ts
# Should show 4 test files with read permission
```

### Environment Variables (Optional)

Create `.env` file for sensitive configuration:

```bash
# .env (do NOT commit this file)
IRCTC_BASE_URL=https://www.irctc.co.in/
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=false
DEBUG=
```

Load in your test:

```typescript
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.IRCTC_BASE_URL || 'https://www.irctc.co.in/';
```

---

## ✅ Verification

### Test 1: Node & npm Verification

```bash
# Check Node.js
node --version
# Expected: v18.0.0 or higher

# Check npm
npm --version
# Expected: 8.0.0 or higher

# Check npm registry
npm config get registry
# Expected: https://registry.npmjs.org/
```

### Test 2: Playwright Installation

```bash
# List installed Playwright version
npm ls @playwright/test
# Expected: @playwright/test@1.59.1

# Check browser installations
npx playwright install-deps

# Verify browsers exist
npx playwright --version
# Expected: Version 1.59.1 (or compatible)
```

### Test 3: Basic Test Run

```bash
# Run a single test to verify everything works
npx playwright test tests/irctc/ac1-ac2-menu-navigation.spec.ts --headed

# Expected output:
# ✓ [chromium] › ac1-ac2-menu-navigation.spec.ts
# Looking for config in: C:\path\to\playwright.config.ts
# Using config at: C:\path\to\playwright.config.ts
# 
# Tests run: 11
# Passed: 0-11 (depends on IRCTC live site state)
# Failed: 0 (architecture issues - all should pass if selectors work)
```

### Test 4: TypeScript Compilation

```bash
# Check if TypeScript compiles without errors
npx tsc --noEmit

# Expected: No errors in stdout
# (Playwright includes TypeScript, so this compilation is implicit)
```

### Test 5: Directory Structure Validation

```bash
# Verify key files exist
# Windows
dir /S /B "tests\irctc\*.spec.ts"
dir /S /B "tests\pages\irctc\*.ts"
dir /S /B "tests\fixtures\*-test-data.ts"

# macOS/Linux
find tests -name "*.spec.ts"
find tests/pages/irctc -name "*.ts"
find tests/fixtures -name "*-test-data.ts"
```

---

## 🚀 Running Tests

### Basic Test Execution

#### Run All IRCTC Tests

```bash
# Run all tests (default: headless, chromium)
npm run test:irctc

# Or using Playwright directly
npx playwright test tests/irctc/
```

#### Run Specific Test Suite

```bash
# AC1-AC2 Menu Navigation
npx playwright test tests/irctc/ac1-ac2-menu-navigation.spec.ts

# AC3-AC4 Menu Display
npx playwright test tests/irctc/ac3-ac4-menu-display.spec.ts

# AC5-AC6 Item Selection
npx playwright test tests/irctc/ac5-ac6-item-selection.spec.ts

# Happy Path
npx playwright test tests/irctc/happy-path-edge-cases.spec.ts
```

#### Run Single Test

```bash
# Run single test by name
npx playwright test -g "AC1.1: Menu button visible on desktop"

# Run single file with specific title
npx playwright test tests/irctc/ac1-ac2-menu-navigation.spec.ts -g "Menu button"
```

### Run Modes

#### Headless Mode (Default - Faster)

```bash
# No browser window visible, faster execution
npx playwright test tests/irctc/

# Results printed to console
# Report available in: playwright-report/index.html
```

#### Headed Mode (Visible Browser)

```bash
# Browser window visible, slower but see what's happening
npx playwright test tests/irctc/ --headed

# More useful for debugging
# Press Ctrl+C to stop early
```

#### Debug Mode (Inspector)

```bash
# Open Playwright Inspector for step-by-step execution
PWDEBUG=1 npx playwright test tests/irctc/ac1-ac2-menu-navigation.spec.ts

# Inspector controls:
# - Step over (F10)
# - Step into (F11)
# - Continue (F5)
# - Pause execution on next action
```

#### Watch Mode (Recommended for Development)

```bash
# Re-run tests on file changes
npx playwright test tests/irctc/ --watch

# Edit test file → Tests re-run automatically
# Ctrl+C to exit
```

### Browser Selection

#### Run on Specific Browser

```bash
# Chromium only (default)
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) simulation
npx playwright test --project=webkit
```

#### Run on Multiple Browsers

```bash
# All configured browsers
npx playwright test

# Chromium and Firefox
npx playwright test --project=chromium --project=firefox
```

### Output & Reporting

#### HTML Report (Most Useful)

```bash
# Generate and open detailed report
npx playwright test tests/irctc/
npx playwright show-report

# Report shows:
# - Test results (pass/fail/skip)
# - Screenshots on failure
# - Video recordings (if enabled)
# - Execution timeline
```

#### Console Output Levels

```bash
# Verbose output
npx playwright test tests/irctc/ --reporter=list

# Minimal output
npx playwright test tests/irctc/ --reporter=dot

# JSON output (for parsing)
npx playwright test tests/irctc/ --reporter=json > results.json

# Markdown output
npx playwright test tests/irctc/ --reporter=markdown > results.md
```

#### Test Trace (Recording)

```bash
# Record trace on failure
npx playwright test tests/irctc/ --trace on

# Always record trace
npx playwright test tests/irctc/ --trace force

# View trace (interactive inspection)
npx playwright show-trace trace/trace.zip
```

#### Video Recording

```bash
# Record video of all tests
npx playwright test tests/irctc/ --video on

# Record only on failure
npx playwright test tests/irctc/ --video retain-on-failure

# Videos saved in test-results/
```

### Command ️️Templates

Save frequently used commands in `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:irctc": "playwright test tests/irctc/",
    "test:irctc:headed": "playwright test tests/irctc/ --headed",
    "test:irctc:debug": "PWDEBUG=1 playwright test tests/irctc/",
    "test:irctc:watch": "playwright test tests/irctc/ --watch",
    "test:irctc:chrome": "playwright test tests/irctc/ --project=chromium",
    "test:irctc:firefox": "playwright test tests/irctc/ --project=firefox",
    "test:ac1-ac2": "playwright test tests/irctc/ac1-ac2-menu-navigation.spec.ts",
    "report": "playwright show-report",
    "codegen": "playwright codegen https://www.irctc.co.in"
  }
}
```

Then run with: `npm run test:irctc`

---

## 🐛 Troubleshooting

### Issue: "Command not found: npm"

**Cause:** Node.js not installed or not in PATH

**Solution:**
```bash
# Verify Node installation
node --version

# If not found, reinstall Node.js from https://nodejs.org/

# Windows: Add to PATH
# Control Panel → System → Environment Variables → PATH → Add C:\Program Files\nodejs\
```

### Issue: "Module not found: playwright"

**Cause:** Dependencies not installed

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

### Issue: "Browser not found"

**Cause:** Playwright browsers not installed

**Solution:**
```bash
# Download all browsers
npx playwright install

# Download specific browser
npx playwright install chromium
```

### Issue: "Timeout waiting for element"

**Cause:** Selector doesn't exist or page layout changed

**Solution:**
```bash
# Use Playwright Inspector to find correct selector
npx playwright codegen https://www.irctc.co.in/

# Or check IRCTC_TEST_DATA.selectors for selector definitions
# Update selectors if IRCTC website changed

# See SELECTORS.md for all selector mappings
```

### Issue: Tests fail with "Permission denied"

**Cause:** File permission issue (macOS/Linux)

**Solution:**
```bash
# Fix file permissions
chmod +x node_modules/.bin/*
chmod -R 755 tests/

# Or reinstall
npm install
```

### Issue: "Out of memory" during test run

**Cause:** Too many parallel tests or memory leak

**Solution:**
```bash
# Reduce parallel workers
npx playwright test tests/irctc/ --workers=1

# Or in playwright.config.ts:
workers: process.env.CI ? 1 : 2,
```

### Issue: IRCTC website blocks automated access

**Cause:** Bot detection or rate limiting

**Solution:**
```bash
# Add delays between test runs
// In test
test.setTimeout(120000); // 2 minute timeout

// Between suites
test.describe.serial('Suite', () => {
  // Tests run sequentially, not parallel
});

// Or change test timing
// In playwright.config.ts
fullyParallel: false, // Sequential execution
```

### Issue: "Cannot find git"

**Cause:** Git not installed

**Solution:**
```bash
# Install Git from https://git-scm.com/

# Windows: Use installer
# macOS: brew install git
# Linux: sudo apt-get install git

# Verify
git --version
```

### Getting Help

When stuck, gather diagnostic information:

```bash
# System info
node --version
npm --version
npx playwright --version
git --version

# Playwright installation
npm ls @playwright/test

# Test directory structure
ls -la tests/irctc/
ls -la tests/pages/irctc/
ls -la tests/fixtures/

# Run test with verbose logging
DEBUG=pw:api npx playwright test --reporter=list
```

---

## 🔄 CI/CD Setup

### GitHub Actions Workflow

The framework includes automated CI/CD pipeline:

**File Location:** `.github/workflows/e2e-tests-irctc.yml`

**Triggering Events:**
- ✅ Push to `main` or `develop` branches
- ✅ Pull requests
- ✅ Daily schedule (2 AM UTC)
- ✅ Manual trigger (workflow_dispatch)

### Setting Up GitHub Repository

```bash
# 1. Create new repository on GitHub
# GitHub.com → New Repository → "PlaywrightIRCTCE2EAgenticFW"

# 2. Add remote to local repo
git remote add origin https://github.com/[org]/PlaywrightIRCTCE2EAgenticFW.git

# 3. Create main branch and push
git branch -M main
git push -u origin main

# 4. Verify workflow
# GitHub → Actions tab → e2e-tests-irctc.yml
# Should show status for each run
```

### Monitor CI/CD Runs

```bash
# View in GitHub
GitHub → Repository → Actions → e2e-tests-irctc

# Each run shows:
# ✓ Test job status (passed/failed)
# ✓ Browser matrix (chromium, firefox)
# ✓ Test artifacts (report, screenshots)
# ✓ Duration
# ✓ Commit/PR reference
```

### Download CI/CD Artifacts

```bash
# HTML Report
GitHub → Run Details → Artifacts → playwright-report

# Screenshots
GitHub → Run Details → Artifacts → test-results
```

---

## 💻 IDE Integration

### VS Code Setup (Recommended)

#### Step 1: Install Extensions

Open VS Code and install:

1. **Playwright Test Explorer**
   - Publisher: Microsoft
   - ID: ms-playwright.playwright

2. **TypeScript Vue Plugin**
   - Publisher: Vue
   - ID: Vue.volar

3. **Prettier - Code Formatter**
   - Publisher: Prettier
   - ID: esbenp.prettier-vscode

#### Step 2: Configure VS Code

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "search.exclude": {
    "node_modules": true,
    "test-results": true,
    "playwright-report": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.playwright": true
  },
  "playwright.reuseBrowser": true
}
```

#### Step 3: Run Tests from VS Code

1. **Open Test Explorer**
   - Activity Bar "Testing" icon (or Ctrl+Shift+D)

2. **View test tree**
   - Shows all test files and individual tests

3. **Run tests**
   - Click ▶️ next to test name to run
   - Right-click → "Debug Test" for stepping

4. **View results**
   - Results shown in VS Code with pass/fail status
   - Click test name to jump to code

### WebStorm / IntelliJ Setup

#### Step 1: Install Plugin

Settings → Plugins → Search "Playwright" → Install

#### Step 2: Configure

Settings → Languages & Frameworks → Playwright

- Framework: Playwright
- Playwright package: node_modules/@playwright/test
- Config file: playwright.config.ts

#### Step 3: Run Tests

- Right-click test file → "Run"
- Right-click test → "Run" or "Debug"
- View results in built-in test runner

---

## 📚 Additional Resources

### Official Documentation

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [Playwright API Reference](https://playwright.dev/docs/api/class-page)

### Useful Tools

- **Codegen** - Generate locators and test code
  ```bash
  npx playwright codegen https://www.irctc.co.in/
  ```

- **Trace Viewer** - Interactive trace playback
  ```bash
  npx playwright show-trace trace.zip
  ```

- **Inspector** - Step through tests
  ```bash
  PWDEBUG=1 npx playwright test
  ```

### Related Documentation

- [README-IRCTC.md](README-IRCTC.md) - Quick start
- [ARCHITECTURE-IRCTC.md](ARCHITECTURE-IRCTC.md) - POM design
- [SELECTORS-IRCTC.md](SELECTORS-IRCTC.md) - UI mappings
- [USER STORY](../user-stories/US-002) - Feature specs

---

## ✅ Setup Verification Checklist

Before running tests, verify:

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] Repository cloned (`git clone ...`)
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] Test files exist (`ls tests/irctc/*.spec.ts`)
- [ ] Page objects exist (`ls tests/pages/irctc/*.ts`)
- [ ] Test data file exists (`ls tests/fixtures/irctc-test-data.ts`)
- [ ] Config file exists (`ls playwright.config.ts`)
- [ ] Single test runs successfully (`npm run test:ac1-ac2`)
- [ ] HTML report generates (`npx playwright show-report`)
- [ ] No compilation errors (`npx tsc --noEmit`)
- [ ] Internet connectivity working (IRCTC site accessible)

Once all ✓, you're ready to run the full test suite!

---

## 🎯 Next Steps

1. **Quick Start**
   ```bash
   npm run test:irctc:headed
   ```

2. **View Results**
   ```bash
   npx playwright show-report
   ```

3. **Explore Tests**
   - Open tests/irctc/*.spec.ts to see test code
   - Review ARCHITECTURE.md for design patterns

4. **Run Locally**
   - `npm run test:irctc` - Full release build
   - `npm run test:irctc:debug` - Step through execution
   - `npm run test:irctc:watch` - Auto-reload on file change

5. **Add New Tests**
   - Follow patterns in existing test files
   - Use existing POM methods
   - See ARCHITECTURE.md for extension guide

---

**Setup Documentation:** April 15, 2026  
**Last Updated:** April 15, 2026  
**Status:** ✅ Ready for Production
