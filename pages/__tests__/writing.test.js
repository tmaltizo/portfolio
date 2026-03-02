import { render, screen } from '@testing-library/react';
import Writing from '../writing';

test('Writing page renders heading', () => {
  render(<Writing />);
  expect(screen.getByRole('heading', { name: /writing/i })).toBeInTheDocument();
});
