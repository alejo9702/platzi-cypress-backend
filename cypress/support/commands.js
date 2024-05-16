import {loginPage} from "../pageObjects/LogingPage";
// import {addMatchImageSnapshotCommand} from "@simonsmith/cypress-image-snapshot/command";

Cypress.Commands.add("login", (email, password) => {
    const userInput = "#user_login";
    const passwordInput = "#user_password";
    const loginButton = "#login_form > div.form-actions > input";

    cy.visit("http://zero.webappsecurity.com/login.html")
    cy.get(userInput).type(email)
    cy.get(passwordInput).type(password, {sensitive: true})
    cy.get(loginButton).click();
})

Cypress.Commands.add("loginError", () => {

    const error = ".alert.alert-error";

    cy.get(error).should("be.visible")

})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {

    if (options && options.sensitive) {
        options.log = false

        Cypress.log({
            $el: element,
            name: "type",
            message: "*".repeat(text.length)
        });
    }

    return originalFn(element, text, options);
})

// addMatchImageSnapshotCommand({
//     failureThreshold: 0.03,
//     failureThresholdType: "percent",
//     customDiffConfig: {threshold:0.1},
//     capture: "viewport"
// })


