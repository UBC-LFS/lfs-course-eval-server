/* global describe, it, expect, cy */

describe('My first test', () => {
  it('Finds an element', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Courseval')
  })
})
