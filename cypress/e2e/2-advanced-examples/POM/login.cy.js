import {loginPage} from "../../../pageObjects/LogingPage";

describe('login', () => {

    beforeEach(() => {
        loginPage.visit()
    });

    it('login failed', () => {
        loginPage.login("user", "password")
        loginPage.validateErrorLogin()
    });

    it('success login', () => {
        loginPage.login("username", "password")
        loginPage.validateSuccessLogin()
    });
});