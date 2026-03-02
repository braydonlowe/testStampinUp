# Test Cases – User Account Creation & Setup

## Overview

This document contains manual test cases for first-time testing of user account creation and initial account setup on https://www.stampinup.com.  
The test cases are designed to validate core user workflows, input validation, and error handling for new users.

---

## 1. Account Creation

### TC-AC-001 – Create New Account with Valid Information

**Preconditions**

- User is not logged in
- Email address has not been previously used

**Steps**

1. Navigate to the account creation page
2. Enter valid required user information
3. Submit the registration form

**Expected Result**

- Account is successfully created
- User is redirected to their account or onboarding flow

**Automation Coverage**

- Automated

---

### TC-AC-002 – Prevent Account Creation with Existing Email

**Preconditions**

- Email address already exists in the system

**Steps**

1. Navigate to the account creation page
2. Enter an email address already associated with an account
3. Submit the form

**Expected Result**

- Account creation fails
- A clear and descriptive error message is displayed

**Automation Coverage**

- Manual

---

### TC-AC-003 – Validate Required Fields During Account Creation

**Steps**

1. Navigate to the account creation page
2. Leave one or more required fields empty
3. Submit the form

**Expected Result**

- Form submission is blocked
- Required field validation messages are displayed

**Automation Coverage**

- Automated

---

### TC-AC-004 – Validate Email Format

**Steps**

1. Navigate to the account creation page
2. Enter an invalid email format
3. Submit the form

**Expected Result**

- Form submission fails
- User is prompted to enter a valid email address

**Automation Coverage**

- Automated

---

## 2. User Profile Setup

### TC-PR-001 – Add Phone Number to User Profile

**Preconditions**

- User is logged in

**Steps**

1. Navigate to Account Settings
2. Enter a valid phone number
3. Save changes

**Expected Result**

- Phone number is saved successfully

**Automation Coverage**

- Automated

---

### TC-PR-002 – Validate Phone Number Format

**Steps**

1. Navigate to Account Settings
2. Enter an invalid phone number
3. Save changes

**Expected Result**

- Validation error is displayed
- Invalid data is not saved

**Automation Coverage**

- Automated

---

### TC-PR-003 – Set Preferred Method of Contact

**Steps**

1. Navigate to Account Settings
2. Select a preferred contact method (email or phone)
3. Save changes

**Expected Result**

- Preferred contact method is saved successfully

**Automation Coverage**

- Manual

---

### TC-PR-004 – Validate Birthdate Field

**Steps**

1. Navigate to Account Settings
2. Enter an invalid birthdate (future date)
3. Save changes

**Expected Result**

- Validation error is displayed
- Birthdate is not saved

**Automation Coverage**

- Manual

---

## 3. Address Management

### TC-AD-001 – Add Valid Address to User Account

**Preconditions**

- User is logged in

**Steps**

1. Navigate to Address Management
2. Enter valid address details
3. Save address

**Expected Result**

- Address is saved successfully
- Address appears in the user's address list

**Automation Coverage**

- Automated

---

### TC-AD-002 – Validate Required Address Fields

**Steps**

1. Navigate to Address Management
2. Leave one or more required address fields empty
3. Attempt to save the address

**Expected Result**

- Address is not saved
- Required field validation messages are displayed

**Automation Coverage**

- Automated

---

### TC-AD-003 – Prevent Saving Invalid Postal Code

**Steps**

1. Navigate to Address Management
2. Enter an invalid postal code
3. Save address

**Expected Result**

- Validation error is displayed
- Address is not saved

**Automation Coverage**

- Manual

---

## Notes

- Some steps, such as email verification or CAPTCHA challenges, may limit full automation.
- Test cases are written to reflect first-time testing and are expected to evolve as additional product knowledge is gained.
