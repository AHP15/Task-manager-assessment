import { mount } from '@cypress/react';
import Signin from '../../src/components/Signin';
import ContextProvider from '../../src/context';

describe('SignIn Component', () => {

    it('should show error when fields are empty', () => {
        mount(<ContextProvider><Signin /></ContextProvider>);
        cy.get('button[type="submit"]').click();
        cy.contains("email can't be empty").should('be.visible');
        cy.contains("password can't be empty").should('be.visible');
    });

    it('should sign in successfully', () => {
        cy.intercept('POST', '/auth/signin', {
            fixture: 'signinSuccess.json'
        }).as('signin');

        mount(<ContextProvider><Signin /></ContextProvider>);
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.wait('@signin');
        cy.contains('My Tasks').should('be.visible');
    });

    it('should show error on failed sign in', () => {
        cy.intercept('POST', '/auth/signin', {
            statusCode: 401,
            body: { success: false, error: 'Invalid credentials' }
        }).as('signin');

        cy.get('input[name="email"]').type('wrong@example.com');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@signin');
        cy.contains('Invalid credentials').should('be.visible');
    });
});
