import { mount } from '@cypress/react';
import CreateTask from '../../src/components/CreateTask';
import ContextProvider from '../../src/context';

describe('CreateTask Component', () => {

    it('should create a task successfully', () => {
        cy.intercept('POST', '/task', {
            fixture: 'createTaskSuccess.json'
        }).as('createTask');

        mount(<ContextProvider><CreateTask /></ContextProvider>);

        cy.get('input[name="title"]').type('New Task');
        cy.get('input[name="description"]').type('New task description');
        cy.get('button[type="submit"]').click();

        cy.wait('@createTask');
        cy.contains('New Task').should('be.visible');
    });

    it('should show error when fields are empty', () => {
        cy.get('button[type="submit"]').click();
        cy.contains("title can't be empty").should('be.visible');
        cy.contains("description can't be empty").should('be.visible');
    });
});
