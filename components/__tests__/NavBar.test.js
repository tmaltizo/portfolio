import { render } from '@testing-library/react';
import NavBar from '../NavBar';

test('NavBar renders without crashing', () => {
  render(<NavBar />);
});
