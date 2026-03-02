import { render, screen } from '@testing-library/react';
import About from '../about';

test('About page renders heading', () => {
  render(<About />);
  expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
});
