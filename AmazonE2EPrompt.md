# End-to-End Agentic QA Workflow for Amazon Application
**Target Framework**: Playwright + MCP Agents  
**Objective**: Automate comprehensive E2E testing through intelligent agent orchestration with GitHub MCP integration

---

## ACCEPTANCE CRITERIA

- [ ] All test artifacts (plans, scripts, reports) are version-controlled in GitHub repository
- [ ] Test coverage includes happy path, negative scenarios, and edge cases
- [ ] All generated Playwright scripts follow reliability and maintainability best practices
- [ ] Automated test execution completes with pass/fail status and detailed reports
- [ ] Failed tests are diagnostically analyzed and healed through MCP agent integration
- [ ] Test summary provides coverage metrics, failure analysis, and recommendations
- [ ] GitHub integration enables CI/CD pipeline compatibility

---

## RULES & CONSTRAINTS

1. **Agent Usage Requirements**
   - `playwright-test-planner` agent: Mandatory for test plan generation
   - `playwright-test-generator` agent: Required for script automation
   - `playwright-test-healer` agent: Required for failed test diagnosis and fixes
   - GitHub MCP server: Required for repository operations

2. **Code Quality Standards**
   - All locators must use Playwright's recommended best practice hierarchy: `getByRole()` > `getByLabel()` > `getByTestId()` > CSS selectors
   - No hardcoded wait times; use Playwright's built-in auto-wait mechanisms
   - All test data must be externalized from test scripts
   - Test files must follow naming convention: `{feature}-{scenario}.spec.ts`

3. **File Organization**
   - Test plans: `/specs/plans/{planId}.md`
   - Test scripts: `/tests/{feature}/{scenario}.spec.ts`
   - Test results: `/test-results/`
   - Reports: `/playwright-report/`

4. **Traceability**
   - Each test case must map to original user story
   - Test names must reflect the scenario being validated
   - Comments in code must reference parent test plan sections

---

## REQUIREMENTS

### Functional Requirements
- Read and parse user stories from designated repository
- Generate comprehensive test plans covering happy path, negative, and edge cases
- Create and maintain reliable Playwright automation scripts
- Execute tests with detailed result reporting
- Automatically diagnose and fix failing tests
- Commit all artifacts with meaningful git messages

### Non-Functional Requirements
- Test execution time for full suite: < 10 minutes
- Script maintainability: Low coupling, high cohesion
- Documentation: Every step must be self-explanatory
- Reproducibility: Any team member can re-run and understand the tests

---

## EXECUTION STEPS

### **STEP 1: User Story Acquisition & Analysis**

**Objective**: Retrieve and analyze the user story to establish testing scope

**Actions**:
1. Read user story from `C:\PFW\user-stories\US-001`
2. Extract key information:
   - Feature description
   - Acceptance criteria
   - User workflows
   - System dependencies
   - Application URL/entry point
3. Identify testing scope and boundaries
4. Document initial assumptions and risk areas

**Deliverable**: Analyzed user story with testing scope document

---

### **STEP 2: Test Plan Generation**

**Objective**: Create comprehensive test plan using AI agent exploration

**Actions**:
1. Invoke `playwright-test-planner` agent with:
   - Application URL from user story
   - Feature scope and acceptance criteria
   - Instructions to generate: happy path, negative, edge case scenarios
2. Agent explores application:
   - Navigation flow mapping
   - UI element identification and validation
   - User interaction patterns
   - State transitions
3. Generate test scenarios covering:
   - **Happy Path**: Primary user journey with valid inputs
   - **Negative Scenarios**: Invalid inputs, error handling, boundary conditions
   - **Edge Cases**: Extreme values, state conflicts, timeout scenarios, mobile responsiveness
4. Document:
   - Detailed test case descriptions
   - Expected behaviors and assertions
   - Pre-conditions and post-conditions
   - Dependencies between test cases

**Output Location**: `/specs/plans/plan001.md`

**Validated Sections in Plan**:
- Test suite name and scope
- Scenario descriptions with clear steps
- Expected outcomes for each step
- Risk assessment and priorities

---

### **STEP 3: Exploratory Testing & Manual Validation**

**Objective**: Validate test plan through manual execution and refine automation strategy

**Actions**:
1. Manually execute scenarios identified in Step 2:
   - Happy path workflows end-to-end
   - Negative scenarios for error boundaries
   - Edge cases for robustness
2. During exploration, document:
   - Actual vs. expected behaviors
   - UI state changes and timing issues
   - Element selectors and their stability
   - Flaky areas requiring special handling
3. Refine test plan based on findings:
   - Adjust step sequences if needed
   - Identify dynamic elements requiring XPath/data-testid
   - Note timing dependencies or loading states
4. Validate application readiness for automation

**Key Observations**:
- Element visibility and interaction patterns
- Network latency and async operations
- Responsive design considerations
- Authentication/session requirements

**Validation Checklist**:
- [ ] All scenarios from plan are manually executable
- [ ] Selectors identified and documented
- [ ] Timing/wait requirements identified
- [ ] Test data requirements documented

---

### **STEP 4: Playwright Automation Script Generation**

**Objective**: Generate maintainable, reliable Playwright test scripts using agent automation

**Actions**:
1. Invoke `playwright-test-generator` agent for each test scenario with:
   - Test case name and description
   - Manual execution findings from Step 3
   - Required locator strategies
   - Test data specifications
   - Expected assertions

2. Agent generates scripts following best practices:
   - **Locator Priority**:
     ```typescript
     getByRole('button', { name: /submit/i })           // 1st choice
     getByLabel('Email Address')                         // 2nd choice
     getByTestId('login-submit')                         // 3rd choice
     locator('button.primary')                           // Last resort
     ```
   - **Dynamic Path Handling**:
     ```typescript
     const userEmail = process.env.TEST_USER_EMAIL;
     const dynamicURL = `${baseURL}?userId=${userId}`;
     ```
   - **Wait Strategies**:
     - Remove hardcoded `setTimeout()`
     - Use `page.waitForLoadState('networkidle')`
     - Use `page.waitForSelector()` for conditional elements

3. Organize generated scripts into test suites:
   - Group related scenarios
   - Follow naming convention: `{feature}-{scenario}.spec.ts`
   - Example: `/tests/amazon/checkout-happy-path.spec.ts`

4. Structure each test file:
   ```typescript
   // test/amazon/checkout-happy-path.spec.ts
   import { test, expect } from '@playwright/test';
   import { LoginPage } from '../pages/LoginPage';
   import { CheckoutPage } from '../pages/CheckoutPage';
   
   test.describe('Amazon Checkout - Happy Path', () => {
     test('Complete purchase with valid card', async ({ page }) => {
       // Setup
       // Action
       // Assertion
     });
   });
   ```

5. Implementation checklist:
   - [ ] All test names reference test plan scenario names
   - [ ] Locators use recommended strategy hierarchy
   - [ ] No hardcoded timeouts
   - [ ] Test data externalized to `.env` or config files
   - [ ] Error messages are descriptive
   - [ ] Screenshots captured on failure

**Output Location**: `/tests/amazon/{feature-scenario}.spec.ts`

**Quality Gates**:
- Code review for locator reliability
- Syntax validation
- Lint compliance

---

### **STEP 5: Test Execution & Failure Diagnosis**

**Objective**: Execute test suite and autonomously heal failing tests

**Actions**:
1. Execute full test suite:
   ```bash
   npx playwright test
   ```

2. Collect results:
   - Pass/fail status
   - Execution logs
   - Screenshots on failure
   - HTML report generation

3. For each failed test, invoke `playwright-test-healer` agent:
   - Provide failure details (error message, stack trace, screenshot)
   - Agent analyzes root cause:
     - Stale locators (element not found)
     - Timing issues (timeout before element visible)
     - State issues (prerequisite test failed)
     - Environmental issues (test data missing)
   
4. Agent generates and applies fixes:
   - Update locators to more reliable selectors
   - Adjust wait strategies
   - Fix test sequencing dependencies
   - Update test data references

5. Re-execute healed tests and validate

**Success Criteria**:
- [ ] Full test suite executes without timeout errors
- [ ] Failed tests are systematically healed
- [ ] Healed tests pass on subsequent run
- [ ] No flaky tests (100% consistency across 3 runs)

---

### **STEP 6: Test Summary & Reporting**

**Objective**: Generate comprehensive test report and analysis

**Actions**:
1. Generate automated HTML report:
   - Test execution timeline
   - Pass/fail breakdown by feature
   - Code coverage metrics (if applicable)
   - Performance metrics (execution time per test)

2. Create executive summary:
   - Total tests: [X]
   - Passed: [X] | Failed: [X] | Skipped: [X]
   - Pass rate: [X]%
   - Execution time: [X] minutes

3. Document findings:
   - Critical issues found during testing
   - Areas requiring additional test coverage
   - Recommendations for regression prevention
   - Performance bottlenecks identified

4. Artifact inventory:
   - Test plan: `/specs/plans/plan001.md`
   - Test scripts: `/tests/amazon/*.spec.ts`
   - Test results: `/test-results/`
   - HTML report: `/playwright-report/index.html`

**Report Location**: `/specs/TEST-SUMMARY-001.md`

---

### **STEP 7: GitHub Repository Management & CI/CD Integration**

**Objective**: Version control all artifacts and establish CI/CD pipeline

**Actions**:
1. Create new GitHub repository: `PlaywrightE2EAgenticFW`
   - Using GitHub MCP integration

2. Commit initial artifacts with structured messages:
   ```
   git commit -m "feat(test-plan): Add comprehensive test plan for US-001
   
   - Add happy path scenarios
   - Add negative test cases
   - Add edge case coverage
   - Location: /specs/plans/plan001.md"
   ```

3. Commit test scripts:
   ```
   git commit -m "feat(automation): Generate Playwright test suite for checkout flow
   
   - Generate 8 test cases covering happy/negative/edge paths
   - Apply reliability best practices for locators and waits
   - Location: /tests/amazon/*.spec.ts"
   ```

4. Commit test results:
   ```
   git commit -m "test(results): Add test execution results and summary
   
   - Full test suite execution report
   - Pass rate: 100%
   - Location: /test-results/*, /playwright-report/"
   ```

5. Setup CI/CD pipeline (GitHub Actions):
   - Trigger on PR creation
   - Run test suite on each commit
   - Generate and archive reports
   - Block merge on test failure

**Repository Structure**:
```
PlaywrightE2EAgenticFW/
├── specs/
│   ├── plans/
│   │   └── plan001.md
│   ├── README.md
│   └── TEST-SUMMARY-001.md
├── tests/
│   ├── amazon/
│   │   ├── checkout-happy-path.spec.ts
│   │   ├── checkout-negative.spec.ts
│   │   └── checkout-edge-cases.spec.ts
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   └── CheckoutPage.ts
│   └── fixtures/
│       └── testData.ts
├── test-results/
├── playwright-report/
├── playwright.config.ts
├── package.json
├── .github/workflows/
│   └── e2e-tests.yml
└── README.md
```

**Deliverable**: Fully version-controlled, CI/CD-ready repository

---

## QUALITY ASSURANCE CHECKPOINTS

| Step | Checkpoint | Validation |
|------|------------|-----------|
| 1 | User Story parsed | All key info extracted |
| 2 | Test plan generated | Scenarios cover all paths |
| 3 | Manual tests pass | 100% scenarios executable |
| 4 | Scripts generated | All tests runnable |
| 5 | Tests healed | 100% pass rate achieved |
| 6 | Report complete | All metrics documented |
| 7 | GitHub committed | All artifacts versioned |

---

## SUCCESS METRICS

- **Coverage**: Happy path, negative, edge cases all tested (≥95% acceptance criteria coverage)
- **Reliability**: Zero flaky tests (100% pass rate on 3 consecutive runs)
- **Maintainability**: All scripts follow POM and best practices (code review approved)
- **Performance**: Full suite executes in < 10 minutes
- **Documentation**: Every test traceable to user story requirement
- **Automation**: 100% of identified scenarios automated (0 manual steps in CI/CD)
