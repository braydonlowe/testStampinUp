import { Locator, Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly accountSettingsLink: Locator;
  readonly editContactBtn: Locator;
  readonly phoneInput: Locator;
  readonly preferredMethodDropdown: Locator;
  readonly birthdateInput: Locator;
  readonly saveBtn: Locator;
  readonly phoneError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.getByRole("button", { name: /Hello/i });
    this.accountSettingsLink = page.getByRole("menuitem", {
      name: "Account Settings",
    });
    this.editContactBtn = page
      .getByTestId("account-card-contact")
      .getByTestId("edit-contact-setting");

    this.phoneInput = page.getByTestId("account-card-phone");
    this.preferredMethodDropdown = page.getByRole("textbox", {
      name: "Preferred Method of Contact",
    });
    this.birthdateInput = page
      .locator("div")
      .filter({ hasText: /^Birthdate$/ })
      .locator("input, div.v-select__selection");
    this.saveBtn = page.getByTestId("save-changes");

    // Validation Messages
    this.phoneError = page.getByText("The Phone Number field must");
  }

  async navigateToSettings() {
    await this.accountMenu.click();
    await this.accountSettingsLink.click();
    await this.editContactBtn.click();
  }

  async setPhone(number: string) {
    await this.phoneInput.fill(number);
    // Tabbing out helps trigger validation
    await this.phoneInput.press("Tab");
  }

  async setPreferredMethod(method: "Email" | "Phone") {
    // 1. Click the dropdown to open it
    await this.preferredMethodDropdown.click();

    // 2. Wait for the menu container to be visible (usually has a specific class in Vuetify)
    // If this still fails, we'll look for the text globally
    const option = this.page
      .locator(".v-list-item, .v-menu__content")
      .getByText(method, { exact: true });

    await option.waitFor({ state: "visible" });
    await option.click();
  }
}
