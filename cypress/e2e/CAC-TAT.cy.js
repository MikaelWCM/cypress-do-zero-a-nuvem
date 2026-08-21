describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  }),

  it('verify application title', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  }),

  it('fill mandatory fields and submit the form', () => {
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('email@teste.com');
    cy.get('[id="open-text-area"]').type('Teste',{delay: 0});
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it('validate email with invalid format', () => {
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('invalid-email');
    cy.get('[id="open-text-area"]').type('Teste',{delay: 0});
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('validate phone field with non-numeric input', () => {
    cy.get('[id="phone"]').type('Phone');
    cy.get('[id="phone"]').should('have.value', '');
  })


  it('validate phone field is required when checkbox is checked', () => {
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('email@teste.com');
    cy.get('[id="open-text-area"]').type('Teste',{delay: 0});
    cy.get('[id="phone-checkbox"]').check();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('fill and clear fields', () => {
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('email@teste.com');
    cy.get('[id="phone"]').type('123456789');
    cy.get('[id="firstName"]').clear();
    cy.get('[id="lastName"]').clear();
    cy.get('[id="email"]').clear();
    cy.get('[id="phone"]').clear();
    cy.get('[id="firstName"]').should('have.value', '');
    cy.get('[id="lastName"]').should('have.value', '');
    cy.get('[id="email"]').should('have.value', '');
    cy.get('[id="phone"]').should('have.value', '');
  })

  it('submit form without filling mandatory fields', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('fill mandatory fields using custom command', () => {
    cy.fillMandatoryFieldsAndSubmit('Mikael', 'Miranda', 'email@teste.com', 'Teste')
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

})
