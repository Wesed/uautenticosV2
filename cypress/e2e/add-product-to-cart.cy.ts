describe('add product to cart', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href^="/products"]').first().click()
  })
})
