import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World, please find application mockups in src\/assets\/mockups/i);
  expect(linkElement).toBeInTheDocument();
});
