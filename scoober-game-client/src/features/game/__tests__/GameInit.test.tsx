import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameInit from '../GameInit';

describe('GameInit', () => {
  const getDefaultProps = () => ({
    initGame: jest.fn(),
    isConnected: true,
		selfId: '007',
		winner: '006',
  });

  it('renders buttons', () => {
    const props = getDefaultProps();

    render(<GameInit {...props} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Computer');
    expect(buttons[1]).toHaveTextContent('Player');
  });

  it('renders message if not isConnected', () => {
    const props = {
      ...getDefaultProps(),
      isConnected: false,
    };

    render(<GameInit {...props} />);

    const message = screen.getByText('Server is not connected...');
    expect(message).toHaveTextContent('Server is not connected...');
  });

  it('renders no message if isConnected', () => {
    const props = {
      ...getDefaultProps(),
    };

    render(<GameInit {...props} />);

    expect(screen.queryByText(/Connecting/i)).toBeNull();
  });

  it('calls initGame', () => {
    const props = getDefaultProps();

    render(<GameInit {...props} />);
    fireEvent.click(screen.getByText('Computer'));
    fireEvent.click(screen.getByText('Player'));

    expect(props.initGame).toHaveBeenCalledTimes(2);
    expect(props.initGame.mock.calls[0][0]).toBe(true);
    expect(props.initGame.mock.calls[1][0]).toBe(false);
  });

	it('shows the message when you lose or win', () => {
    const props = {
			...getDefaultProps(),
			winner: '007',
		};

    render(<GameInit {...props} />);

    const summary = screen.queryByTestId('summary-component');
    expect(summary).toBeInTheDocument();
  });

	it('shows no message', () => {
    const props = {
			...getDefaultProps(),
			winner: null,
		};

    render(<GameInit {...props} />);

    const summary = screen.queryByTestId('summary-component');
    expect(summary).toBeNull();
  });
});
