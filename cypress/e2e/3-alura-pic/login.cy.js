describe('Login de usuarios alura pic', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Login válido', () => {
        cy.login(Cypress.env('userName'), Cypress.env('password'))
        cy.contains('a', '(Logout)').should('be.visible');
    })

    it('Login inválido', () => {
        cy.login('flavioa', '123')
        cy.on('window:alert', (str) => {
         expect(str.to.equal('invalid user name or password'))
        })
    })
})