# Manual and Automated Tests

Manual and automated test coverage for account creation and profile management on stampinup.com, implemented using Playwright.

---

## Documentation

Detailed project planning and test design can be found in the `/docs` directory:

- **SQL Answers**
  My answers to the four SQL questions I recieved via email.

- **Test Plan**  
  Project scope, objectives, environment details, assumptions, and exit criteria.

- **Test Cases**  
  A full breakdown of manual and automated test scenarios for each deliverable.

---

# Quick Start

### 1. Prerequisites

- Node.js (v18 or higher)
- Playwright browsers

---

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd testStampinUp

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

# Usage

[!IMPORTANT]
Safety First
Automated account creation (TC-AC-001) is configured in Dry Run mode by default.
The test fills out the registration form but does not submit it, preventing unintended data creation in the production environment.

```bash
npm run test            # run all tests headless
npm run test:headed     # run tests in a visible browser
npm run test:ui         # open Playwright Test Runner GUI
npm run codegen         # generate code interactively
```

# Project Structure

The project follows the Page Object Model (POM) pattern to ensure tests are modular, readable, and easy to maintain.

```bash
├── docs/
│   ├── SQL_ANSWERS.md        # Answers to the SQL questions asked in the email.
│   ├── TEST_PLAN.md          # Project strategy and scope
│   └── TEST_CASES.md         # Detailed manual/automated test steps
├── pages/                    # Page Object Models (POM)
│   ├── newAccountPopup.ts    # Locators & actions for registration
│   ├── signInPopup.ts        # Locators & actions for login
│   ├── profilePage.ts        # User profile & settings navigation
│   └── addressPage.ts        # Address management form logic
├── tests/                    # Automated test specs
│   ├── accountCreation.spec.ts
│   ├── userProfileSetup.spec.ts
│   └── addressManagement.spec.ts
├── playwright.config.ts      # Playwright configuration (timeouts, retries, etc.)
└── .gitignore                # Excludes test-results/ and node_modules/
```

## Key Features:

Locator-First Design
Built using Playwright Locator objects for auto-waiting, stability, and resilience.

Strict Mode Validation
All selectors are explicitly scoped to avoid collisions
(e.g., differentiating between Login vs. Registration password fields).

Dynamic Test Data
Uses Date.now() and randomized string generators to ensure unique data per test run.

Visual Debugging
Automatically captures screenshots and videos on test failure to speed up investigation.
