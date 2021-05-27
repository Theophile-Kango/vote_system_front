describe('View details of an article', () => {
  before(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'articles.json'
    })
    cy.viewport('iphone-x')
    cy.visit('/')
  });

  describe('clicking on an article in list', () => {
    before(() => {
      cy.get('[data-testid=article-999]').click()
    });
    
    it('is expected to display a title', () => {
      cy.get('[data-testid=title]').should('contain.text', "My Awesome Article")
    });
  });

});