describe('testind headers',function(){

    it('validate header and content type', () => {

        cy.request('employees').its('headers').its('content-type').should('include', 'application/json')

    });
})