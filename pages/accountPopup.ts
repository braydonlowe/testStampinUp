import { Locator, Page } from "@playwright/test";

export class AccountPopup {
  page: Page;

  // Selectors for the popup form
  signInButton = '[data-testid="menu-user-btn-signin"]';
  createAccountBtn = '[data-testid="btn-create-account"]';
  firstNameInput = '[data-testid="reg-first-name"]';
  lastNameInput = '[data-testid="reg-last-name"]';
  emailInput = '[data-testid="reg-email"]';
  submitBtn = '[data-testid="reg-submit"]';

  // Define locators
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.confirmPasswordInput = page.getByLabel("Confirm Password", {
      exact: true,
    });
  }

  async openSignUpForm() {
    await this.page.click(this.signInButton);
    await this.page.click(this.createAccountBtn);
  }

  async fillAccountForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);

    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async submitAccount(safe = true) {
    if (safe) {
      console.log(
        `[Dry Run] Would submit account with email: ${await this.page.inputValue(this.emailInput)}`,
      );
    } else {
      await this.page.click(this.submitBtn);
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
