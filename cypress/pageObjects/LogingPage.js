export class LoginPage {
    constructor() {
        this.userInput = "#user_login";
        this.passwordInput = "#user_password";
        this.loginButton = "#login_form > div.form-actions > input";
        this.tabs = {
            account_summary_tab: "#account_summary_tab",
            account_activity_tab: "#account_activity_tab",
            transfer_founds_tab: "#transfer_funds_tab",
        };
        this.error = ".alert.alert-error";
    }


    visit() {
        cy.visit("http://zero.webappsecurity.com/login.html")
        this.validatePageLogin()

    }

    login(email, password) {
        cy.get(this.userInput).type(email)
        cy.get(this.passwordInput).type(password)
        cy.get(this.loginButton).click()
    }

    validatePageLogin() {
        cy.get(this.userInput).should("be.visible")
        cy.get(this.passwordInput).should("be.visible")
        cy.get(this.loginButton).should("be.visible")
    }

    validateErrorLogin() {
        cy.get(loginPage.error).should("be.visible")
    }

    validateSuccessLogin() {

        for (let key in this.tabs) {
            cy.get(this.tabs[key]).should("be.visible")
        }


    }
}

export const loginPage = new LoginPage()