import {loginPage} from "../../../pageObjects/LogingPage";

describe('login', () => {

    beforeEach(() => {
        loginPage.visit()
    });

    it('login failed', () => {
        loginPage.login("user", "password")
        loginPage.validateErrorLogin()
    });

    it('success login with cy.env', () => {
        loginPage.login("username", "password")
        cy.log(Cypress.env("credentials").user)
        loginPage.validateSuccessLogin()
    });

    it('failed login with cy.env.json', () => {
        loginPage.login(
            Cypress.env("credentials").user,
            Cypress.env("credentials").password
        )
        cy.log(Cypress.env("credentials").user)
    });

    it('failed login from terminal', () => {
        cy.log(Cypress.env());
        loginPage.login(
            Cypress.env("credentials").user,
            Cypress.env("credentials").password
        )
        cy.log(Cypress.env("credentials").user)
    });
});


describe.only(
    'failed login with config',
    {
        env: {
            failedUser: "error1",
            failedPassword: "error2"
        },
    },
    function () {

        beforeEach(() => {
            loginPage.visit();
        })

        it('failed login', () => {
            loginPage.validatePageLogin();
            loginPage.login(
                Cypress.env("failedUser"),
                Cypress.env("failedPassword")
            )
            loginPage.validateErrorLogin()

            cy.log(Cypress.env())

        });
    }
);