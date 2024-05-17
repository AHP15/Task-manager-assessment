import { mount } from '@cypress/react';
import Signup from '../../src/components/Signup';
import ContextProvider from '../../src/context';

describe('SignUp Component', () => {
    beforeEach(() => {
        cy.visit('/signup');
    });

    it('should show error when fields are empty', () => {
        mount(<ContextProvider><Signup /></ContextProvider>);
        cy.get('button[type="submit"]').click();
        cy.contains("fullname can't be empty").should('be.visible');
        cy.contains("email can't be empty").should('be.visible');
        cy.contains("password can't be empty").should('be.visible');
    });

    it('should sign up successfully', () => {
        cy.intercept('POST', '/auth/signup', {
            fixture: 'signupSuccess.json'
        }).as('signup');

        mount(<ContextProvider><Signup /></ContextProvider>);
        cy.get('input[name="fullname"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.wait('@signup');
        cy.contains('No Task created.').should('be.visible');
    });

    it('should show error on failed sign up', () => {
        cy.intercept('POST', '/auth/signup', {
            statusCode: 400,
            body: { error: 'Email already exists' }
        }).as('signup');

        cy.get('input[name="fullname"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.wait('@signup');
        cy.contains('Email already exists').should('be.visible');
    });
});
