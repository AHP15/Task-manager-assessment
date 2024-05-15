import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';


test('renders example component', () => {
  render(<App />);
  const buttonElement = screen.getByText(/count is/i);
  expect(buttonElement).toBeInTheDocument();
});
