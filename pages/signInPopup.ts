import { Locator, Page } from "@playwright/test";

export class SignInPopup {
  readonly page: Page;

  readonly signInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signInButton = page.locator('[data-testid="menu-user-btn-signin"]');
    this.emailInput = page.locator('[data-testid="auth-email"]');
    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.submitBtn = page.locator('[data-testid="auth-submit"]');
  }

  async openSignInForm() {
    await this.signInButton.click();
    await this.passwordInput.waitFor({ state: "visible" });
  }

  async fillAccountInfo(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.submitBtn.click();
  }

  async login(email: string, password: string) {
    await this.openSignInForm();
    await this.fillAccountInfo(email, password);
    await this.submitLogin();
  }
}
