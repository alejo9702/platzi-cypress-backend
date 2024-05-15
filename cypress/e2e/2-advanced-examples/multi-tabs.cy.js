describe('multi-tabs', () => {
    it('visit links that contains target _blank', () => {
        cy.visit("http://demoqa.com/links/")
        cy.get("#simpleLink").click();
    })

    it.only('visit links and remove target _blank', () => {
        cy.visit("http://demoqa.com/links/")
        cy.get("#simpleLink").invoke("removeAttr","target").click()
    })
})