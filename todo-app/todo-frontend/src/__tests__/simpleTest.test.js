import React from 'react';
import { render, screen } from '@testing-library/react';
import Todo from '../Todos/Todo';

it('test Todo component', () => {
  const todo = {
    text: 'Test todo',
    done: false
  }
  render(<Todo todo={todo} />);
  expect(screen.getByText('Test todo')).toBeInTheDocument();
});