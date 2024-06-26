describe('testing graphql', () => {
    it('should perform a query using gr', () => {

        const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}`;

        const gqlVaribales = {
            limit: 20,
            offset: 0
        }

        cy.request({
            method: 'POST',
            url: "https://graphql-pokeapi.graphcdn.app/",
            body: {
                query: gqlQuery,
                variables: gqlVaribales
            }

        }).then(response => {
            cy.log("response:" + response.body.data)
            expect(response.body.data.pokemons.results[0].name).to.eq("bulbasaur");
            expect(response.body.data.pokemons.next).contains("https://pokeapi.co/api/v2/pokemon/")
        })
    })
})