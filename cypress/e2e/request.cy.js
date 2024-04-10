import {faker} from "@faker-js/faker";

describe('testing requests', function () {
    const firstName = faker.name.firstName('male');
    it('should create a new employee', () => {
        cy.request({
            url: 'employees/',
            method: 'POST',
            body: {
                name: 'Mateo',
                lastName: 'restrepo',
                email: 'mateo0217@gmail.com'
            }
        }).then(response => {
            console.log(response.body)
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("id");


            const id = response.body.id;
            cy.wrap(id).as("id")

        });
    })

    it('should validate the new employee has been created in the DB  ', function () {

        cy.request('GET', 'employees/').then(response => {

            expect(response.body[response.body.length - 1].name).to.eq('Mateo')
        })
    });

    it('should validate the employee with a new email ', function () {

        cy.request({
            url: `employees/${this.id}`,
            method: 'PUT',
            body: {
                email: faker.internet.email(),
                name: faker.person.firstName(),
                lastName: faker.person.lastName()
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id',this.id)
        })
    });

    // it('should delete the record recently created', function () {
    //
    //     cy.request({
    //         url: `employees/${this.id}`,
    //         method: 'DELETE'
    //     }).then(response => {
    //         expect(response.status).to.eq(200)
    //     })
    // });
    //
    after( function (){
        cy.request({
            url: `employees/${this.id}`,
            method: 'DELETE'
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    });
})