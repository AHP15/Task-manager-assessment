// // import 'cross-fetch/polyfill';

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';


// import CreateTask from '../components/CreateTask';


// test('it should create a task', async () => {
//     render(<CreateTask />);

//     fireEvent.input(screen.getByLabelText('title'), { target: { value: 'title' } });
//     fireEvent.input(screen.getByLabelText('description'), { target: { value: 'description' } });
//     fireEvent.click(screen.getByText('Create Task'));

//     await waitFor(() => {
//         expect(screen.queryByTitle('error')).toBeNull();
//     });
// });

describe("My first Cypress test", () => {
  it("visits the Vite.js homepage", () => {
    cy.visit("/");
    cy.contains("SignIn");
  });
});

