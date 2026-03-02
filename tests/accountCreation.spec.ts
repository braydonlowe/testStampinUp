import { test, expect } from "@playwright/test";
import { AccountPopup } from "../pages/accountPopup";

function generateEmail() {
  return `example+test${Date.now()}@example.com`;
}

test("Create a new account via popup", async ({ page }) => {
  await page.goto("https://www.stampinup.com/");

  const accountPopup = new AccountPopup(page);
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
  await expect(page.locator(accountPopup.firstNameInput)).toHaveValue("Jonny");
  await expect(page.locator(accountPopup.lastNameInput)).toHaveValue("Cash");
  await expect(page.locator(accountPopup.emailInput)).toHaveValue(email);

  console.log(`Account creatin flow executed (dry run, safe for production)`);
});
