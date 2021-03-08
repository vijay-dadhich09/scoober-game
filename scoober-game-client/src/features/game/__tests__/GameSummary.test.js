import React from 'react';
import { render, screen } from '@testing-library/react';
import GameResult from '../GameResult';

describe('GameResult', () => {
  const getDefaultProps = () => ({
    initGame: jest.fn(),
    player: { id: '001' },
  });

  it('renders message if player win', () => {
    const props = getDefaultProps();
    const selfId = '007';
    props.winner = selfId;

    render(<GameResult {...props} selfId={selfId} />);

    const message = screen.getByText('You won');
    expect(message).toHaveTextContent('You won');
  });

  it('renders message if player lost', () => {
    const props = getDefaultProps();
    props.winner = 'dummyId';

    render(<GameResult {...props} />);

    const message = screen.getByText('You lost');
    expect(message).toHaveTextContent('You lost');
  });
});
