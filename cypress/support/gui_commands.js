Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (username, lastName, email, textField) => {
  cy.get('[id="firstName"]').type(username);
  cy.get('[id="lastName"]').type(lastName);
  cy.get('[id="email"]').type(email);
  cy.get('[id="open-text-area"]').type(textField, {delay: 0});
    cy.contains('button', 'Enviar').click();    
});