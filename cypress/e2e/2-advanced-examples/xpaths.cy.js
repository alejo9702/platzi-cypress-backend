describe('xpaths', () => {
    it('get with css selector', () => {
        cy.visit("/")
        cy.xpath("//h1[contains(text(),'Bulbasaur')]")
    })
})