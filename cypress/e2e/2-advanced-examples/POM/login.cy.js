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


describe(
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

describe('login failed with fixtures', () => {

    beforeEach(() => {
        loginPage.visit();
    });
    it('login failed ', () => {
        loginPage.validatePageLogin();
        cy.fixture("credentials").then(credentials => {
            loginPage.login(credentials.email, credentials.password)
        })

        loginPage.validateErrorLogin();
    });

    it('login success ', () => {
        loginPage.validatePageLogin();
        cy.fixture("users").then(credentials => {
            loginPage.login(credentials.email, credentials.password)
        })

        loginPage.validateSuccessLogin();
    });
})


//usando dos fixtures
const credentialsForUsers = [
    {
        nombre: "credentials",
        titulo: "Login with credentials",
    },
    {
        nombre: "users_2",
        titulo: "Login with users",
    }
]

credentialsForUsers.forEach(credentials => {
        describe.only(credentials.titulo, () => {
                beforeEach(() => {
                        loginPage.visit();
                    }
                );

                it('login fallido con fixtures', () => {
                        loginPage.validatePageLogin();

                        cy.fixture(credentials.nombre).then(credentials => {
                                loginPage.login(credentials.email, credentials.password);
                            }
                        );
                        loginPage.validateErrorLogin();
                    }
                );
            }
        );
    }
);