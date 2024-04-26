describe('Cookies', () => {
    beforeEach(() => {
        cy.session("Cookies",() => {
            cy.visit("/")
            cy.setCookie('nombre', 'Javiereee')
        })
    });
    it('Obtener las cookies', () => {
        cy.clearAllCookies()
        cy.getCookies().should('be.empty')
    });
    it('Agregar una cookie', () => {
        cy.setCookie('apelllido', 'restrepo')
        cy.getCookies().should('have.length', 2)
    });
    it('Obtener cookie especifica', () => {
        // cy.getCookie('nombre').should('have.a.property', "value", "Javier");
    });
}); 