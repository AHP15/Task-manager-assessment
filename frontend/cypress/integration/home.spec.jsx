import { mount } from '@cypress/react';
import Home from '../../src/components/Home';
import ContextProvider from '../../src/context';

describe('Home Component', () => {
    mount(<ContextProvider><Home /></ContextProvider>);
    it('should display header and tasks', () => {
        cy.contains('My Tasks').should('be.visible');
        cy.contains('Create Task').should('be.visible');
    });
});
