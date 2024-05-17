import { mount } from '@cypress/react';
import Form from '../../src/components/Form';
import ContextProvider from '../../src/context';

describe('Form Component', () => {

    it('should toggle between SignIn and SignUp', () => {
        mount(<ContextProvider><Form /></ContextProvider>);
        cy.contains('SignUp').click();
        cy.contains('SignIn').should('be.visible');
        cy.contains('SignIn').click();
        cy.contains('SignUp').should('be.visible');
    });
});
