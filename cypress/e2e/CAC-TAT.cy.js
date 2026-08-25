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

  it('select product by text YouTube', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube');
  })

  it('select product by value mentoria', () => {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria');
  })

  it('select Blog product by index', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog');
  })

  it('mark feedback radio button', () => {
    cy.get('[name="atendimento-tat"]').check('feedback');
    cy.get('input[type="radio"][value="feedback"]').should('be.checked');
  })

  it('mark each radio button', () => {
    cy.get('[name="atendimento-tat"]').each((radio) => {
      cy.wrap(radio).check();
      cy.wrap(radio).should('be.checked');
    });
  });

  it('check both checkboxes and uncheck the last one', () => {
      cy.get('input[type="checkbox"]').as('checkboxes').check();
      cy.get('@checkboxes').each((checkbox) => {
        cy.wrap(checkbox).should('be.checked');
      });
      cy.get('@checkboxes').last().uncheck();
      cy.get('@checkboxes').last().should('not.be.checked');
  })

  it('select a file from fixtures folder', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/exampleFile.json');
    cy.get('#file-upload').should((input) => {
      expect(input[0].files[0].name).to.equal('exampleFile.json');
    })
  })

  it('select a file from fixtures folder using drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/exampleFile.json', ({action: 'drag-drop'}));
    cy.get('#file-upload').should((input) => {
      expect(input[0].files[0].name).to.equal('exampleFile.json');
    })  
  })

  it('select a file using an alias', () => {
    cy.fixture('exampleFile.json').as('sampleFile');
    cy.get('#file-upload').selectFile('@sampleFile');
    cy.get('#file-upload').should((input) => {
      expect(input[0].files[0].name).to.equal('exampleFile.json');
    })
  })

  it('verify that the privacy policy link opens in a new tab without clicking', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank');
  })

  it('access privacy policy', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click();
    cy.get('.privacy').should('be.visible').and('contain', 'Talking About Testing');
  })
})