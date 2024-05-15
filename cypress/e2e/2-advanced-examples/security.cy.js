let text
describe('security', () => {
    it('browse between different domains', () => {
        cy.visit("/");
        cy.visit("https://todo-cypress-iota.vercel.app");
        cy.get("#title").type("test title")

    })

    it('browse to one domain', function () {

        cy.visit("https://todo-cypress-iota.vercel.app");
        cy.get("h1").invoke("text").as("title")

    });

    it('browse to another domain', function () {

        cy.visit("/");
        cy.log(this.title)
        //cy.get("h1").invoke("text").as("title")

    });

    it('browse across two domains in the same tests', () => {
        cy.visit("/")
        cy.get("h1").first().invoke('text').then(texto => {
            Cypress.env({
                ENV_TEXT: texto
            })
        });

        cy.origin("https://todo-cypress-iota.vercel.app", {args: {text: "hola"}},
            function ({text}) {
                cy.visit("/")
                cy.log(Cypress.env())
            });
        cy.visit("/");
        cy.get("h1").first().invoke('text').should("be.equal", Cypress.env("ENV_TEXT"));

    })

    it.only('share information without session', function () {

        cy.visit("/")
        cy.get("h1").first().invoke('text').then(text => {
            cy.task("saveValue", {name: text})
        });
    });

    it.only('share information without session 2', function () {

        cy.visit("https://todo-cypress-iota.vercel.app")
        cy.task("getValue", "name").then(value => {
            cy.get("#title").type(value)
        })

    });
})