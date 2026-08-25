describe('Central de Atendimento ao Cliente TAT - Privacy Policy', () => {
  beforeEach(() => {
    cy.visit('./src/privacy.html')
  })

  it('verify privacy policy title', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
})