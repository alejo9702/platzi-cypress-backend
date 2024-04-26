describe('flakyTests', () => {
    it.only('single query command', () => {
        cy.visit("/")
        cy.get("#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1")
            .contains("Bulbasaussr")

        cy.contains("#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1","Bulbasaussr")

    })

    it('alter assertion commands', () => {
        cy.get('#submit').should('not.be.disabled').click();
    });
})