import Judge from "../Judge";
import { IJudgeCredentials } from "../interfaces";

class URI extends Judge {
  async login(credentials: IJudgeCredentials): Promise<void> {
    const loginPage = await this.browser.newPage();

    await loginPage.goto("https://www.urionlinejudge.com.br/judge/en/login", {
      waitUntil: "domcontentloaded"
    });

    await loginPage.evaluate(
      ({ username, password }) => {
        const qs = document.querySelector.bind(document);
        const usernameInput = qs("input[name='email']");
        const passwordInput = qs("input[name='password']");
        const rememberCheckbox = qs("input[name='remember_me']");
        const submitBtn = qs("input[type='submit']");

        if (usernameInput && passwordInput && rememberCheckbox && submitBtn) {
          (usernameInput as HTMLInputElement).value = username;
          (passwordInput as HTMLInputElement).value = password;
          (rememberCheckbox as HTMLInputElement).click();
          (submitBtn as HTMLInputElement).click();
        } else {
          // TODO: handle possibly null elements due to URI changes
        }
      },
      { ...credentials }
    );

    await new Promise(resolve => loginPage.once("domcontentloaded", resolve));

    // TODO: handle failed login "alert"
    await loginPage.evaluate(() => {
      const qs = document.querySelector.bind(document);
      const errorPassword = qs(".iziToast-message");
      if (errorPassword) {
      } else {
      }
    });

    await loginPage.close();
  }
}

export default URI;
