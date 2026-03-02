# Test Plan - User Account Creation & Setup

## 1. Objective

This test plan outlines the approach for first-time testing of user account creation and initial account setup functionality on stampinup.com. The goal is to validate that a new user can successfully create an account, configure essential profile information, and add an address, using both manual test cases and automated tests.

---

## 2. Scope

### In Scope

- New user account creation
- Initial user profile setup
  - Phone number
  - Preferred method of contact
  - Birthdate
- Address creation and validation for a new user account

### Out of Scope

- Login for existing users
- Password reset or recovery
- Email or SMS delivery validation
- Checkout, payments, or order management.
- Backend services, databases, or admin tools.

---

## 3. Test Approach

- Manual test cases are created first to validate core user workflows and expected behavior.
- Automated tests are developed based on these manual test cases using Playwright.
- Testing focuses on primary (happy-path) scenarios as well as key validation and error-handling cases.
- Automation prioritizes test readability, maintainability, and intent over exhaustive UI coverage.

---

## 4. Test Types Covered

- Functional testing
- UI validation
- Input validation and error handling
- End-to-end user flow testing

---

## 5. Test Environment

- Website: https://www.stampinup.com
- Browser: chromium-based desktop browser
- Tests are executed against the publicly accessible production site
- No direct access to backend systems or test environments

---

## 6. Test Data Strategy

- A singular unique or disposable email addresses is used for account creation. This will only be done once manually due to this being a production enviornment.
- Non-production-safe personal data is used for profile and address fields.
- Test data is generated dynamically where possible to avoid collisions with existing accounts.

---

## 7. Entry and Exit Criteria

### Entry Criteria

- Website is accessible.
- Account creation functionality is available to new users.

### Exit Criteria

- All defined manual test cases are executed
- Automated tests run successfully without critical failures.
- Core user flows are validated end to end.

---

## 8. Risks and Limitations

- Email verification steps may limit full automation of account creation.
- UI changes may cause selector instability in automated tests.
- Bot detection or rate limiting could impact repeated test execution.

---

## 9. Automation Strategy

- Playwright is used as the automation framework.
- Automated tests align directly with documented manual test cases.
- Stable and readable selectors are preferred where available.
- AI-assisted tooling may be used to accelerate test creation and refinement

---

## 10. Future Improvements

- Implement tests to be run on non-chromium browsers.

## Notes

This test plan represents first-time test design for these features and is expected to evolve as additional product knowledge is gained.
