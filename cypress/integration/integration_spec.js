/* global describe, it, cy */

describe('My first test', () => {
  it('Finds the title', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Overview')
    cy.contains('Mean')
    cy.contains('Enrolment')
    cy.contains('Response Rate')
    cy.contains('Number of Sections')
  })
})
