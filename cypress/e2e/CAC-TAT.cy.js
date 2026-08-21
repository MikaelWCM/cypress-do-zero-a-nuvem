describe('Central de Atendimento ao Cliente TAT', () => {
  it('verify application title', () => {
    cy.visit('./src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})