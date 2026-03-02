import { test, expect } from "@playwright/test";
import { SignInPopup } from "../pages/signInPopup";
import { AddressPage } from "../pages/addressPage";

test.describe("Address Management", () => {
  let addressPage: AddressPage;

  test.beforeEach(async ({ page }) => {
    const signIn = new SignInPopup(page);
    addressPage = new AddressPage(page);

    await page.goto("https://www.stampinup.com/");
    // NORMALLY I WOULD NEVER DO THIS HERE AND USE A .env FILE BUT I WANTED THIS TO RUN AS EASILY AS POSSIBLE
    await signIn.login("donscott1890@gmail.com", "f!bEnuAp@yB3!dJ");
    await addressPage.navigateToAddressForm();
  });

  test("TC-AD-001 – Add Valid Address to User Account", async ({ page }) => {
    await addressPage.fillAddress({
      first: "Jonny",
      last: "Cash",
      street: "825 E Highway 6",
      city: "Spanish Fork",
      state: "Utah",
      zip: "84660",
      phone: "(888) 888-8888",
    });

    await addressPage.saveBtn.click();

    // Expected Result: Saved successfully and appears in list
    await expect(
      page.getByRole("heading", { name: "Default Shipping Address" }),
    ).toBeVisible();
  });

  test("TC-AD-002 – Validate Required Address Fields", async () => {
    // Attempt to save without filling anything
    await addressPage.saveBtn.click();

    // Verify multiple validation messages
    await expect(
      addressPage.page.getByText("The First Name field is required."),
    ).toBeVisible();
    await expect(
      addressPage.page.getByText("The Address field is required."),
    ).toBeVisible();
    await expect(
      addressPage.page.getByText("The State field is required."),
    ).toBeVisible();
  });

  test("TC-AD-003 – Prevent Saving Invalid Postal Code (Automated)", async () => {
    await addressPage.fillAddress({
      first: "Test",
      last: "User",
      street: "123 Main St",
      city: "Salt Lake",
      state: "Utah",
      zip: "nonzi-p", // Invalid zip
      phone: "(888) 888-8888",
    });

    await addressPage.saveBtn.click();

    // Verify error message from test-message data-testid
    await expect(addressPage.errorMessage).toBeVisible();
    await expect(addressPage.errorMessage).not.toBeEmpty();
  });
});
