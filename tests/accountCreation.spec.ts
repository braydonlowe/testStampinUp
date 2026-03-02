import { test, expect } from "@playwright/test";
import { NewAccountPopup } from "../pages/newAccountPopup";

function generateEmail() {
  return `example+test${Date.now()}@example.com`;
}

test.describe("Account Creation flow", () => {
  let accountPopup: NewAccountPopup;
  const existingEmail = "donscott1890@gmail.com"; // Our test users email address

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.stampinup.com/");
    accountPopup = new NewAccountPopup(page);
  });

  test("TC-AC-000 - New Account Form Can Be Filled out Correctly", async ({
    page,
  }) => {
    const email = generateEmail();

    // Safe mode: does NOT actually submit a form
    await accountPopup.createAccount(
      "Jonny",
      "Cash",
      email,
      "cashMoney123!",
      true,
    );

    // Assertions
    await expect(accountPopup.firstNameInput).toHaveValue("Jonny");
    await expect(accountPopup.lastNameInput).toHaveValue("Cash");
    await expect(accountPopup.emailInput).toHaveValue(email);

    console.log(`Account creatin flow executed (dry run, safe for production)`);
  });

  test("TC-AC-002: Should Display error for existing email", async ({
    page,
  }) => {
    await accountPopup.createAccount(
      "Duplicate",
      "User",
      existingEmail,
      "NewPassword123!",
      false,
    );

    await expect(accountPopup.custExists).toHaveText("Customer already exists");
  });

  test("TC-AC-003 – Validate Required Fields During Account Creation", async ({
    page,
  }) => {
    await accountPopup.openSignUpForm();
    await accountPopup.submitBtn.click();

    await expect(page.getByText("The First Name field is")).toHaveText(
      "The First Name field is required.",
    );
    await expect(page.getByText("The Last Name field is")).toHaveText(
      "The Last Name field is required.",
    );
    await expect(page.getByText("The Email Address field is")).toHaveText(
      "The Email Address field is required.",
    );

    // For the main Password field
    await expect(
      page.getByText("The Password field is required.").first(),
    ).toBeVisible();

    // For the Confirm Password field
    await expect(
      page.getByText("The Password field is required.").last(),
    ).toBeVisible();
  });
});
