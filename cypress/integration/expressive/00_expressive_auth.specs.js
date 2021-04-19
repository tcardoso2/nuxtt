/// <reference types="cypress" />

/**
 * Expressive Game localhost tests
 * PRE-REQUISITES:
 *  1) the nuxt site should be running locally (yarn dev)
 *  2) an instance of a mock-gaminar-api should be running (yarn dev)
 * So, overall it's 3 applications running: The 2 above and cypress itself
 */
var URL = "http://localhost:3000"

context('Auth specs', () => {
    beforeEach(() => {
      //cy.visit('http://expressive.ap.ngrok.io/custom.pages/expressive.pages/player/welcome')
    })
  
    describe('Login page - Player', () => {
      it('Welcome page should redirect to login page', () => {
        cy.visit(`${URL}/custom.pages/expressive.pages/player/welcome`)
        cy.location('pathname').should('include', 'login')
      })
      it('Only filling in email should return validation message to user', () => {
        cy.get('input#pEmail')
          .type('fake@example.com').should('have.value', 'fake@example.com')
        cy.get('input#pPass')
          .clear()
          .should('have.value', '')
        cy.get('.sign-in > button.login').click()
        //cy.get('.sign-in').submit() //Submit does not work somehow
        cy.get('div#pLoginError').should('contain', 'Password is required')
      })
      it('Wrong login should return an error message', () => {
        cy.get('input#pEmail')
          .clear()
          .should('have.value', '')
        cy.get('input#pEmail')
          .type('fake@example.com').should('have.value', 'fake@example.com')
        cy.get('input#pPass')
          .type('password1wrong').should('have.value', 'password1wrong')
        cy.get('.sign-in > button.login').click()
        cy.wait(2000)
        cy.get('div#pLoginError').should('contain', 'Wrong username / password')
//          .next().should('contain', 'Your form has been submitted!')
      })
      it('Dummy user login should get me to the default page', () => {
        cy.get('input#pEmail')
          .clear()
          .should('have.value', '')
          cy.get('input#pPass')
          .clear()
          .should('have.value', '')
        cy.get('input#pEmail')
          .type('fake@example.com').should('have.value', 'fake@example.com')
        cy.get('input#pPass')
          .type('password1').should('have.value', 'password1')
        cy.get('.sign-in > button.login').click()
        cy.location('pathname').should('include', '/custom.pages/expressive.pages/player/welcome')
          //.next().should('contain', 'Your form has been submitted!')
      })
      /*it('Click on Button does not go anywhere', () => {
        cy.get('button.expressiveStartGame > span.v-btn__content').click()
        cy.location('pathname').should('include', '/custom.pages/expressive.pages/player/welcome')
      })
      
      - Test login with ENTER (usability)
      
      */
      it('cy.getCookies() - get browser cookies', () => {
        // https://on.cypress.io/getcookies
        cy.getCookies().should('be.empty')
    
        cy.get('#getCookies .set-a-cookie').click()
    
        // cy.getCookies() yields an array of cookies
        cy.getCookies().should('have.length', 1).should((cookies) => {
          // each cookie has these properties
          expect(cookies[0]).to.have.property('name', 'token')
          expect(cookies[0]).to.have.property('value', '123ABC')
          expect(cookies[0]).to.have.property('httpOnly', false)
          expect(cookies[0]).to.have.property('secure', false)
          expect(cookies[0]).to.have.property('domain')
          expect(cookies[0]).to.have.property('path')
        })
      })
      it('cy.clearCookies() - clear browser cookies', () => {
        // https://on.cypress.io/clearcookies
        cy.getCookies().should('be.empty')
    
        cy.get('#clearCookies .set-a-cookie').click()
    
        cy.getCookies().should('have.length', 1)
    
        // cy.clearCookies() yields null
        cy.clearCookies()
    
        cy.getCookies().should('be.empty')
      })
        
    })
  })
  