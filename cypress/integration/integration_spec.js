/* global describe, it, expect, cy */

describe('My first test', () => {
  it('Finds the title', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Courseval')
    cy.contains('UMI')
  })
})
