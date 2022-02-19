import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Check Jest and Testing-Library available', () => {
  it('Renders a message', () => {
    const { getByText } = render(<span>Hello, World!</span>);
    expect(getByText('Hello, World!')).toBeInTheDocument();
  });
});
