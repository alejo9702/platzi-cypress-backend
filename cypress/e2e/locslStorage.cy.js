describe('locslStorage', () => {

    const title = "Test title";
    const description = "Test description";
    beforeEach(() => {

        // cy.visit("https://todo-cypress-iota.vercel.app/")
        // cy.get("#title").type(title)
        // cy.get("#description").type(description)
        // cy.contains("Create").click();

        cy.session("session todo", () => {
            cy.visit("https://todo-cypress-iota.vercel.app/").then((response) => {
                localStorage.setItem("react_todo_ids", JSON.stringify([title]));
                localStorage.setItem(title, JSON.stringify({
                        title: title,
                        id: title,
                        complete: false,
                        description: description
                    })
                );
            });
        });

        cy.visit("https://todo-cypress-iota.vercel.app/")

    });

    it('create a task', () => {


        cy.contains(title);
        cy.reload();
        cy.contains(title).then(() => {
            expect(localStorage.getItem(title)).to.exist;
            expect(JSON.parse(localStorage.getItem(title)).description).to.eq(description);
        });

        cy.contains("Remove").click().then(() => {
            expect(localStorage.getItem(title)).to.not.exist;

        });

        cy.clearLocalStorage(title).should(ls => {
            expect(ls.getItem("prop1")).to.be.null
        })

    })

    it('validate the test was created ', () => {
        cy.visit("https://todo-cypress-iota.vercel.app/")
        expect(localStorage.getItem(title)).to.exist;

    });
})