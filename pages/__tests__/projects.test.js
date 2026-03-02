import { render, screen } from '@testing-library/react';
import Projects from '../projects';

test('Projects page renders heading', () => {
  render(<Projects />);
  expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
});
