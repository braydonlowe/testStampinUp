import { Locator, Page, expect } from "@playwright/test";

export class AddressPage {
  readonly page: Page;
  readonly addressesLink: Locator;
  readonly addNewBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly phoneInput: Locator;
  readonly saveBtn: Locator;
  readonly errorMessage: Locator;
  readonly accountMenu: Locator;
  readonly accountSettingsLink: Locator;
  readonly editContactBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressesLink = page.getByRole("link", { name: "Addresses" });
    this.addNewBtn = page.getByTestId("btn-create");

    // Form Fields
    this.firstNameInput = page.getByTestId("address-field-first-name");
    this.lastNameInput = page.getByTestId("address-field-last-name");
    this.streetInput = page.getByTestId("address.addressLine1");
    this.cityInput = page.getByTestId("address-field-city");
    this.stateInput = page.getByTestId("autocomplete-field-div"); // The Utah/State field
    this.zipInput = page.getByTestId("address-field-postalCode");
    this.phoneInput = page.getByTestId("address-telephone");
    this.saveBtn = page.getByTestId("address-save");
    this.errorMessage = page.getByTestId("test-message");
    this.accountMenu = page.getByRole("button", { name: /Hello/i });
    this.accountSettingsLink = page.getByRole("menuitem", {
      name: "Account Settings",
    });
    this.editContactBtn = page
      .getByTestId("account-card-contact")
      .getByTestId("edit-contact-setting");
  }

  async navigateToSettings() {
    await this.accountMenu.click();
    await this.accountSettingsLink.click();
    await this.editContactBtn.click();
  }

  async navigateToAddressForm() {
    await this.navigateToSettings();
    await this.addressesLink.click();
    await this.addNewBtn.click();
  }

  async fillAddress(details: {
    first: string;
    last: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  }) {
    await this.firstNameInput.fill(details.first);
    await this.lastNameInput.fill(details.last);
    await this.streetInput.fill(details.street);

    await this.cityInput.fill(details.city);
    await this.stateInput.fill(details.state);
    await this.page.getByText(details.state, { exact: true }).first().click(); // Select from dropdown

    await this.zipInput.fill(details.zip);
    await this.phoneInput.fill(details.phone);
  }
}
