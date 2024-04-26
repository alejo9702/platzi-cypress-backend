import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";

describe("testing non relational databases", () => {

    before((() => {
        cy.task("createList", {
            email: faker.internet.email(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName()
        }).then((result) => {
            cy.log(result);
            expect(result.acknowledged).to.eq(true);
            expect(result).to.haveOwnPropertyDescriptor("insertedId");
            cy.wrap(result.insertedId).as("employeeInserted")

        });
    }))
    // after(() => {
    //     cy.task("clearListing");
    // });

    it("Select with mongoDB", function () {

        cy.task("getListing").then((result) => {
            const employees = JSON.stringify(result)
            cy.log('Response Body:', employees)
            expect(result).to.have.length.greaterThan(0);
        });
    });
    it("Insert with mongoDB", function () {
        cy.task("createList", {
            email: faker.internet.email(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName()
        }).then((result) => {
            cy.log(result);
            expect(result.acknowledged).to.eq(true);
            expect(result).to.haveOwnPropertyDescriptor("insertedId");
            cy.wrap(result.insertedId).as("newEmployee")

        });
    });

    it('should update the document by id', function () {

        const _updatedData = {
            email: "nameuodated@gmail.com",
            first_name: "name updated"
        }
        const _id = this.newEmployee;
        cy.task("updateEmployee", {id: _id, updatedData: _updatedData}
        ).then(result => {
                cy.log(result)
                expect(result.acknowledged).to.eq(true);
                expect(result.modifiedCount).to.eq(1);
                // expect(result.deletedCount).to.eq(1);
            }
        )

    });

    it('should delete the document by id', function () {
        cy.log(this.employeeInserted)
        cy.task("deleteEmployee", this.employeeInserted).then((result) => {
            cy.log(result)
            expect(result.acknowledged).to.eq(true);
            expect(result.deletedCount).to.eq(1);
        })

    });


});