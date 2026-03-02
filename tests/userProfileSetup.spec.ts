import { test, expect } from "@playwright/test";
import { SignInPopup } from "../pages/signInPopup";
import { ProfilePage } from "../pages/profilePage";

test.describe("User Profile Setup", () => {
  let signIn: SignInPopup;
  let profile: ProfilePage;

  test.beforeEach(async ({ page }) => {
    signIn = new SignInPopup(page);
    profile = new ProfilePage(page);

    await page.goto("https://www.stampinup.com/");
    // Precondition: User is logged in
    // NORMALLY I WOULD NEVER DO THIS HERE AND USE A .env FILE BUT I WANTED THIS TO RUN AS EASILY AS POSSIBLE
    await signIn.login("donscott1890@gmail.com", "f!bEnuAp@yB3!dJ");
    await profile.navigateToSettings();
  });

  test("TC-PR-001 – Add Phone Number to User Profile", async () => {
    const newPhoneNumber = "(801) 555 - 0129";
    await profile.setPhone(newPhoneNumber);
    await profile.saveBtn.click();

    // ASSERTION 1: The Save button should disappear
    // This confirms the "Edit Mode" has closed successfully
    await expect(profile.saveBtn).toBeHidden();

    // ASSERTION 2: Verify the new data is actually displayed on the profile
    // 2. Verify the text exists on the page now
    // We use a regex / / to handle the extra spaces in "(801) 555 - 0129"
    await expect(profile.page.getByText(newPhoneNumber)).toBeVisible();
  });

  test("TC-PR-002 – Validate Phone Number Format", async () => {
    await profile.setPhone("123"); // Invalid format

    // Expected Result: Validation error is displayed
    await expect(profile.phoneError).toBeVisible();
    await expect(profile.phoneError).toContainText("must");
  });

  test("TC-PR-003 – Set Preferred Method of Contact", async () => {
    await profile.setPreferredMethod("Email");
    await profile.saveBtn.click();

    // Verify the Save button is gone
    await expect(profile.saveBtn).toBeHidden();

    // Verify the word "Email" is now visible in the static profile view
    // We check that it's NOT an input/textbox anymore
    await expect(
      profile.page.locator("span, div").filter({ hasText: "Email" }).first(),
    ).toBeVisible();
  });
});
