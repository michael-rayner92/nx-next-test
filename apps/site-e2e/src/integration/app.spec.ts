describe('site', () => {
  beforeEach(() => cy.visit('/articles/dynamic-routing'));

  it('should render title', () => {
    cy.get('h1').should('contain', 'Dynamic Routing and Static Generation');
  });

  it('should properly render the embedded YouTube component', () => {
    cy.get('iframe').should('be.visible');
  });
});
