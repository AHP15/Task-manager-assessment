import { mount } from '@cypress/react';
import App from '../../src/App';
import ContextProvider from '../../src/context';

const mockState = (state) => {
    cy.stub(ContextProvider.prototype, 'state').value(state);
};

describe('App Component', () => {
    it('should display Form when state.loading is false and no user', () => {

        mockState({ loading: false, user: null });
        mount(<ContextProvider><App /></ContextProvider>);

        cy.contains('SignIn').should('be.visible');
    });

    it('should display Home when state.loading is false and user exists', () => {
        mockState({ loading: false, user: { fullname: 'Test User', email: 'email' } });
        mount(<ContextProvider><App /></ContextProvider>);
        cy.contains('My Tasks').should('be.visible');
    });
});
