describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  }),

  it('verify application title', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  }),

  it('fill mandatory fields and submit the form', () => {
    cy.clock();
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('email@teste.com');
    cy.get('[id="open-text-area"]').type('Teste',{delay: 0});
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
    cy.tick(3000);
    cy.get('.success').should('not.be.visible')
  })

  it('validate email with invalid format', () => {
    cy.clock();
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('invalid-email');
    cy.get('[id="open-text-area"]').type('Teste',{delay: 0});
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
    cy.tick(3000);
    cy.get('.error').should('not.be.visible')
  })

  it('validate phone field with non-numeric input', () => {
    cy.get('[id="phone"]').type('Phone');
    cy.get('[id="phone"]').should('have.value', '');
  })


  it('validate phone field is required when checkbox is checked', () => {
    cy.clock();
    cy.get('[id="firstName"]').type('Mikael');
    cy.get('[id="lastName"]').type('Miranda');
    cy.get('[id="email"]').type('email@teste.com');
    cy.get('[id="open-text-area"]').type('Teste',{delay: 0});
    cy.get('[id="phone-checkbox"]').check();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
    cy.tick(3000);
    cy.get('.error').should('not.be.visible')
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
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
    cy.tick(3000);
    cy.get('.error').should('not.be.visible')
  })

  it('fill mandatory fields using custom command', () => {
    cy.clock();    
    cy.fillMandatoryFieldsAndSubmit('Mikael', 'Miranda', 'email@teste.com', 'Teste')
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
    cy.tick(3000);
    cy.get('.success').should('not.be.visible')
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

  Cypress._.times(2, () => {
    it('access privacy policy', () => {
      cy.get('#privacy a').invoke('removeAttr', 'target').click();
      cy.get('.privacy').should('be.visible').and('contain', 'Talking About Testing');
    })
  })

  it('show and hide success and error messages using invoke', () => {
    cy.get('.success').invoke('show').should('be.visible');
    cy.get('.success').should('contain', 'Mensagem enviada com sucesso.');
    cy.get('.error').invoke('show').should('be.visible');
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!');
    cy.get('.success').invoke('hide').should('not.be.visible');
    cy.get('.error').invoke('hide').should('not.be.visible');
  })

  it('fill text area using invoke', () => {
    const longText = Cypress._.repeat('0123456789', 10);
    cy.get('#open-text-area').invoke('val', longText).should('have.value', longText);
  })

  it('make an HTTP request', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html').its('status').should('eq', 200);
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html').its('statusText').should('eq', 'OK');
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html').its('body').should('include', 'CAC TAT');
  })

  it.only('find the hidden cat using invoke', () => {
    cy.get('#cat').invoke('show').should('be.visible');

  })
})