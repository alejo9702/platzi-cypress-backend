const {
    Given,
    When,
    Then
} = require("@badeball/cypress-cucumber-preprocessor");
const {loginPage} = require("../../../pageObjects/LogingPage");


Given("I am on the login page", () => {

    loginPage.visit()
    loginPage.validatePageLogin()
})

When(/^I fill in my email and password with (.*) and (.*)$/, function (email, password) {
    loginPage.login(email, password)

});

Then("I should validate that i am logged in", function () {
    loginPage.validateSuccessLogin()
});

Then("I should validate that I am not logged in", () => {
    loginPage.validateErrorLogin()
})
