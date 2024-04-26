describe('allJoined', () => {
    it('should delete the record created', () => {

        cy.request({
            url: "employees/3",
            method: "DELETE",
        }).then(
            response => {
                expect(response.status).to.eq(200)
            }
        )
    });

    it('should validate no in the BD', () => {
        cy.task("queryDatabase", 'select * from employees WHERE  id= 3').then(
            results => {
                cy.log(results)
                expect(results.length).to.eq(0)
            }
        )
    });

});