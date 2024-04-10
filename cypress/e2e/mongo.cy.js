import {faker} from "@faker-js/faker";

describe("testing non relational databases", () => {
    // after(() => {
    //     cy.task("clearListing");
    // });

    it("Select with mongoDB", function () {
        cy.task("getListing").then((result) => {
            cy.log(result.employees);
            expect(result).to.have.length.greaterThan(4);
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
        });
    });
});