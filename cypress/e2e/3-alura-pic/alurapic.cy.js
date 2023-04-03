describe('Login e registro de usuarios alura pic', () => {

    beforeEach(() => {
      cy.visit('https://alura-fotos.herokuapp.com');
     })

    it('Login válido', () => {
        cy.login('flavio', '123')
        cy.contains('a', '(Logout)').should('be.visible');
    })

    it('Login inválido', () => {
        cy.login('flavioa', '123')
        cy.on('window:alert', (str) => {
         expect(str.to.equal('invalid user name or password'))   
        })
    })

    it('Cadastrar usuário', () => {
        cy.contains('a', 'Register now').click();
        cy.cadastro('joao@gmail.com', 'Joao Joaozinho', 'joao', 'joao1234');
        cy.contains('a', 'Please, login!').should('be.visible');
    })

    it('verifica mensagens validacao', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ng-component', 'Register to embrace a new world!').should('be.visible');
    })

    it('verifica mensagem de e-mail inválido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('Joãozinho');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('verifica mensagem de nome completo com menos de 2 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="fullName"]').type('f');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })

    it('verifica mensagem de user name deve ser lower case', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('J');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })

    it('verifica mensagem de senha com menos de 8 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })

    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it(`Registra novo usuário ${usuario.userName} `, () => {
            cy.contains('a', 'Register now').click();
            cy.contains('button', 'Register').click();
            cy.get('input[formcontrolname="email"]').type(usuario.email);
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuario.userName);
            cy.get('input[formcontrolname="password"]').type(usuario.password);
            cy.contains('button', 'Register').click();
        })

        it.only(`Registra este ${usuario.userName} usuário com uma função`, () => {
            cy.contains('a', 'Register now').click();
            cy.cadastro(usuario.email, usuario.fullName, usuario.userName, usuario.password);
            cy.contains('a', 'Please, login!').should('be.visible');
        })
    })
})