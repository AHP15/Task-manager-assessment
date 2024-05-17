import { mount } from '@cypress/react';
import UpdateTask from '../../src/components/UpdateTask';
import ContextProvider from '../../src/context';

const mockState = (tasks) => {
    cy.stub(AppProvider.prototype, 'state').value({
        loading: false,
        user: { name: 'Test User' },
        tasks
    });
};

describe('UpdateTask Component', () => {

    it('should update a task successfully', () => {
        const tasks = [
            { _id: '1', title: 'Task 1', description: 'Description 1', status: 'pending' }
        ];
        mockState(tasks);

        cy.intercept('PUT', '/task', {
            fixture: 'updateTaskSuccess.json'
        }).as('updateTask');

        mount(
            <ContextProvider>
                <UpdateTask task={tasks[0]._id} close={() => { }} />
            </ContextProvider>
        );

        cy.get('input[name="title"]').clear().type('Updated Task');
        cy.get('input[name="description"]').clear().type('Updated task description');
        cy.get('select').select('completed');
        cy.get('button[type="submit"]').click();

        cy.wait('@updateTask');
        cy.contains('Updated Task').should('be.visible');
    });

    it('should show error when fields are empty', () => {
        const tasks = [
            { _id: '1', title: 'Task 1', description: 'Description 1', status: 'pending' }
        ];
        mockState(tasks);

        mount(
            <ContextProvider>
                <UpdateTask task={tasks[0]._id} close={() => { }} />
            </ContextProvider>
        );

        cy.get('input[name="title"]').clear();
        cy.get('input[name="description"]').clear();
        cy.get('button[type="submit"]').click();
        cy.contains("title can't be empty").should('be.visible');
        cy.contains("description can't be empty").should('be.visible');
    });
});
