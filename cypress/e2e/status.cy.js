import {faker} from '@faker-js/faker';


describe('testing statuses', () => {

    it('should validate the success status code', () => {
        cy.request('employees')
            .its('status')
            .should('eq',200)
    });

    it('should validate the failed status code', () => {
        cy.request({url:'employees/1000',failOnStatusCode: false})
            .its('status')
            .should('eq',404)
    });


    it('should validate the creation of a new employee', () => {
        cy.request('POST', 'employees',{
            name: faker.name.firstName('male'),
            lastName: 'restrepo',
            email: 'alejandrorpo0217@gmail.com'
        }).as('createdEmployee');

        cy.get('@createdEmployee').its('status').should('eq',201)


        cy.get('@createdEmployee').its('body').its('id').then((createdEmployeeId)=> {
            cy.log(createdEmployeeId)
            cy.request('DELETE',`employees/${createdEmployeeId}`)
                .its('status')
                .should('eq',200)
        })


    })
});