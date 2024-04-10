import {faker} from "@faker-js/faker";

describe('Database tests', function () {

    after(function ()  {
        if (this.testId){
            cy.task('queryDatabase', `DELETE FROM test WHERE id=${this.testId}`).then(results => {
                expect(results.affectedRows).to.equal(1);
                expect(results.serverStatus).to.equal(2);
                cy.log(results)
            });
        }
    });

    it('insert', () => {
        cy.task('queryDatabase', "INSERT INTO test (name,description) VALUES('test insertion','insertions test in cypress')").then(results => {
            cy.log(results)
            expect(results.affectedRows).to.equal(1);
            cy.wrap(results.insertId).as("testId")
        });
    });


    it('should retrieve data recently creaated', function () {

        cy.task('queryDatabase', `SELECT * FROM test WHERE id=${this.testId}`).then(results => {
          expect(results[0].name).to.equal('test insertion')
          expect(results[0].description).to.equal('insertions test in cypress')
            cy.log(results)
        });
    });

  // it('Deleted record recently inserted', function () {
  //
  //   cy.task('queryDatabase', `DELETE FROM test WHERE id=${this.testId}`).then(results => {
  //     expect(results.affectedRows).to.equal(1);
  //     expect(results.serverStatus).to.equal(2);
  //     cy.log(results)
  //   });
  // });

    it('should retrieve data from the database', () => {
        cy.task('queryDatabase', 'SELECT * FROM test').then(results => {
            cy.log(results)
        });
    });

});


