import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows an error for files above the maximum upload size', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/choose file/i);
  const oversizedFile = new File(['a'.repeat(10)], 'too-large.txt', {
    type: 'text/plain',
  });

  Object.defineProperty(oversizedFile, 'size', {
    value: 6 * 1024 * 1024,
  });

  fireEvent.change(fileInput, { target: { files: [oversizedFile] } });

  expect(
    screen.getByText(/file exceeds the maximum upload size of 5.00 mb/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/is ready to upload/i)).not.toBeInTheDocument();
});

test('accepts files within the maximum upload size', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/choose file/i);
  const validFile = new File(['hello'], 'notes.txt', {
    type: 'text/plain',
  });

  Object.defineProperty(validFile, 'size', {
    value: 1024 * 1024,
  });

  fireEvent.change(fileInput, { target: { files: [validFile] } });

  expect(screen.getByText(/"notes.txt" is ready to upload./i)).toBeInTheDocument();
  expect(screen.getByText(/selected file: notes.txt/i)).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
