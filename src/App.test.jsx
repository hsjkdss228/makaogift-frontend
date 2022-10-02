import { render, screen } from '@testing-library/react';
import App from './App';

test('App', () => {
  render(<App />);

  screen.getByText(/기억보단 기록을/);
});
