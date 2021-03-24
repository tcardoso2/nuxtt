/// <reference types="cypress" />

context('Basic', () => {
    beforeEach(() => {
      //cy.visit('http://expressive.ap.ngrok.io/custom.pages/expressive.pages/player/welcome')
    })
  
    // https://on.cypress.io/interacting-with-elements
    describe('Player Welcome Screen', () => {
      it('Test Basic Auth', () => {
        // https://on.cypress.io/dblclick
        cy.visit('https://xprssv:1234QWEr@expressive.ap.ngrok.io/custom.pages/expressive.pages/player/welcome')
      })
      it('Waiting for the Facilitator to start game', () => {
        cy.get('button.expressiveStartGame > span.v-btn__content')
          .should('be.visible')
          .should('contain', 'WAIT FOR THE FACILITATOR')
      })
      it('Click on Button does not go anywhere', () => {
        cy.get('button.expressiveStartGame > span.v-btn__content').click()
        cy.location('pathname').should('include', '/custom.pages/expressive.pages/player/welcome')
      })
    })

    describe('Facilitator Dashboard', () => {
      it('Test Basic Auth', () => {
        // https://on.cypress.io/dblclick
        cy.visit('https://xprssv:1234QWEr@expressive.ap.ngrok.io/custom.pages/expressive.pages/facilitator/dashboard')
      })
      it('Start, Reset, Finish Buttons exist', () => {
        cy.get('button#StartGame').should('be.visible')
        cy.get('button#ResetGame').should('be.visible')
        cy.get('button#FinishGame').should('be.visible')
      })
      it('Number of games played is 0', () => {
        cy.get('button#GameQuestionsPlayed')
          .should('be.visible')
          .should('contain', 'TOTAL GAMES PLAYED:0')        
      })
    })

    describe('Interaction 1: Facilitator Starts game', () => {
      it('Facilitator presses "Start" and start button disappears', () => {
        cy.get('button#StartGame').click()
        cy.get('button#StartGame').should('not.be.visible')
      })
      it('Number of games played is 1', () => {
        cy.get('button#GameQuestionsPlayed')
          .should('be.visible')
          .should('contain', 'TOTAL GAMES PLAYED:1')        
      })
      it('Player Welcome screen button says "Next"', () => {
        cy.visit('https://xprssv:1234QWEr@expressive.ap.ngrok.io/custom.pages/expressive.pages/player/welcome')
        cy.get('button.expressiveStartGame > span.v-btn__content')
        .should('be.visible')
        .should('contain', 'NEXT QUESTION')
      })
    })

    describe('Interaction 2: Player Enters game', () => {
      it('When Player clicks Next Question goes to game screen', () => {
        cy.get('button.expressiveStartGame > span.v-btn__content').click()
        cy.location('pathname').should('include', '/custom.pages/expressive.pages/player/game')
      })
      it('Should see 40 Game cards', () => {
        //TODO!!!
        cy.get('button#GameQuestionsPlayed')
          .should('be.visible')
          .should('contain', 'TOTAL GAMES PLAYED:1')        
      })
      it('Facilitator sees that player has Joined the game', () => {
        cy.visit('https://xprssv:1234QWEr@expressive.ap.ngrok.io/custom.pages/expressive.pages/facilitator/dashboard')
        //TODO
        cy.get('button.expressiveStartGame > span.v-btn__content')
        .should('be.visible')
        .should('contain', 'NEXT QUESTION')
      })
    })
  })
  