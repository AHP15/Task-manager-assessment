import { mount } from '@cypress/react';
import Tasks from '../../src/components/Tasks';
import ContextProvider from '../../src/context';

const mockState = (tasks) => {
    cy.stub(AppProvider.prototype, 'state').value({
        loading: false,
        user: { name: 'Test User' },
        tasks
    });
};

describe('Tasks Component', () => {

    const tasks = [
        { _id: '1', title: 'Task 1', description: 'Description 1', status: 'pending' },
        { _id: '2', title: 'Task 2', description: 'Description 2', status: 'completed' }
    ];
    mockState(tasks);
    mount(<ContextProvider><Tasks /></ContextProvider>);

    it('should filter tasks', () => {
        cy.contains('Filter Tasks:').should('be.visible');
        cy.get('select').select('pending');
        cy.get('.taskRow').should('have.length', 1);
    });

    it('should delete a task', () => {

        const tasks = [
            { _id: '1', title: 'Task 1', description: 'Description 1', status: 'pending' }
        ];
        mockState(tasks);

        cy.intercept('DELETE', '/task', {
            fixture: 'deleteTask.json'
        }).as('deleteTask');

        cy.contains('Delete').click();
        cy.wait('@deleteTask');
        cy.contains('No Task created.').should('be.visible');
    });
});
