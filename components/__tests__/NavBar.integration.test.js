import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import NavBar from '../NavBar';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('NavBar displays links and highlights active page', () => {
  useRouter.mockReturnValue({ pathname: '/about' });
  render(<NavBar />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Writing')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();

  // active link behaviour will be asserted after implementation
});
