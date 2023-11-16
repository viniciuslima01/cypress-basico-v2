Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('Vinicius');
    cy.get('#lastName').type('Lima');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#phone').type('4599999999');
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('fillMandatoryFieldsWithParameters', (nome, sobrenome, email, phone, descricao) =>{
    cy.get('#firstName').type(nome);
    cy.get('#lastName').type(sobrenome);
    cy.get('#email').type(email);
    cy.get('#phone').type(phone);
    cy.get('#open-text-area').type(descricao);
})