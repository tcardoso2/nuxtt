/// <reference types="cypress" />

context('Basic', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/custom.pages/expressive.pages/player/welcome')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('.dblclick() - double click on tile and check properties panel shows', () => {
      // https://on.cypress.io/dblclick
  
      // Our app has a listener on 'dblclick' event in our 'scripts.js'
      // that hides the div and shows an input on double click
      cy.get('li.tile.WIP_test1').dblclick()
      cy.get('table.table > tbody.content.cy_panel_properties').should('be.visible')
  
    })
  })
  