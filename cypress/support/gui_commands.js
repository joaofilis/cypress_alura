Cypress.Commands.add('login', (nome, senha) => {
    cy.get('input[formcontrolname="userName"]').type(nome);
    cy.get('input[formcontrolname="password"]').type(senha, {log:false});
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('cadastro', (email, fullName, userName, password) => {
    cy.get('input[formcontrolname="email"]').type(email);
    cy.get('input[formcontrolname="fullName"]').type(fullName);
    cy.get('input[formcontrolname="userName"]').type(userName);
    cy.get('input[formcontrolname="password"]').type(password, {log:false});
    cy.contains('button', 'Register').click();
})