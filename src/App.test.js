import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the registration form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome in/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/full name/i)).toBeRequired();
  expect(screen.getByRole('button', { name: /complete registration/i })).toHaveAttribute('type', 'submit');
});
