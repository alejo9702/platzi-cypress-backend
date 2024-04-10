describe('testing errors', () => {
    it('should validate the status code failed and the error message', () => {
        cy.request({url:"https://pokeapi.co/api/v2/pokemon/2383939439",failOnStatusCode:false})
            .then(response =>{

              expect(response.status).to.eq(404)
              expect(response.body).to.eq("Not Found")
            })
    })


  it('should validate the status code failed and the error message of rick and morty APi', () => {
    cy.request({url:"https://rickandmortyapi.com/api/character/1844894",failOnStatusCode:false})
        .then(response =>{

          expect(response.status).to.eq(404)
          expect(response.body).to.have.property('error','Character not found')
        })
  })
})