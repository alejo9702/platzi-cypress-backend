describe('loginCustomCommand', () => {
    it('failed login', () => {
        cy.login('user', 'password')
        cy.loginError()

    });
    it('success login', () => {
        cy.login("username", "password");
    })
})