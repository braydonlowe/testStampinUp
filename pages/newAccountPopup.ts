import { Locator, Page } from "@playwright/test";

export class NewAccountPopup {
  page: Page;

  // Define locators
  readonly signInButton: Locator;
  readonly createAccountBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly submitBtn: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly custExists: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signInButton = page.getByTestId("menu-user-btn-signin");
    this.createAccountBtn = page.getByTestId("btn-create-account");
    this.firstNameInput = page.getByTestId("reg-first-name");
    this.lastNameInput = page.getByTestId("reg-last-name");
    this.emailInput = page.getByTestId("reg-email");
    this.submitBtn = page.getByTestId("reg-submit");
    this.custExists = page.getByTestId("test-message");
    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.confirmPasswordInput = page.getByLabel("Confirm Password", {
      exact: true,
    });
  }

  async openSignUpForm() {
    await this.signInButton.click();
    await this.createAccountBtn.click();
  }

  async fillAccountForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async submitAccount(safe = true) {
    if (safe) {
      console.log(
        `[Dry Run] Would submit account with email: ${await this.emailInput.inputValue()}`,
      );
    } else {
      await this.submitBtn.click();
    }
  }

  async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    safe = true,
  ) {
    await this.openSignUpForm();
    await this.fillAccountForm(firstName, lastName, email, password);
    await this.submitAccount(safe);
  }
}
