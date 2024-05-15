describe('visual testing', () => {
    it('firt regression test', () => {
        cy.visit("/")
        cy.wait(4000)
        cy.scrollTo("bottom")
        cy.matchImageSnapshot()
    })

    it.only('testing one element ', () => {

        cy.visit("/")
        cy.contains("Bulbasaur").should("be.visible").matchImageSnapshot();
        
    });
})