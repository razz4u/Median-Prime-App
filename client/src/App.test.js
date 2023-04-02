import { render, screen } from '@testing-library/react';
import App from './App';

import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Find Median Prime Number(s)');
  expect(linkElement).toBeInTheDocument();
});
