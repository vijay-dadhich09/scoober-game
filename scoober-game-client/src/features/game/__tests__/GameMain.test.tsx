import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import GameMain from '../GameMain';

describe('GameMain', () => {
	window.HTMLElement.prototype.scrollIntoView = function() {};

  const getDefaultProps = () => ({
    startingNumber: 42,
    handleAttempt: jest.fn(),
    reset: jest.fn(),
  });

  it('renders the number', () => {
    const props = { ...getDefaultProps() };

    render(<GameMain {...props} />);

    expect(screen.getByText(`${props.startingNumber}`)).toBeInTheDocument();
  });

  it('renders buttons', () => {
    const props = getDefaultProps();

    render(<GameMain {...props} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('-1');
    expect(buttons[1]).toHaveTextContent('0');
    expect(buttons[2]).toHaveTextContent('1');
  });

  it('shows waiting for your turn message', () => {
    const props = { ...getDefaultProps(), canSubmit: false };

    render(<GameMain {...props} />);

    expect(screen.getByText(`Please wait until another player start!`)).toBeInTheDocument();
  });

  it('shows waiting opponents turn', () => {
    const otherProps = {
      otherProps: {
        isSingleUser: false, 
        playerTwo: {id: "1615013239969"}, 
        turn: '1615013239969'
      }
    }
    const props = { ...getDefaultProps(), canSubmit: false, ...otherProps };

    render(<GameMain {...props} />);

    expect(screen.getByText(`Waiting opponent's turn...`)).toBeInTheDocument();
  });

	it('shows your turn message', () => {
    const props = { ...getDefaultProps(), canSubmit: true };

    render(<GameMain {...props} />);

    expect(screen.getByText('Your turn end in 30 seconds')).toBeInTheDocument();
  });

  it('Render attempts', () => {

    const attempts = [
      {
        "user": {
          "id": "1615014471606",
          "profileImg": "player.png",
          "isSelf": true
        },
        "number": 0,
        "newValue": 504,
        "oldValue": 1512,
        "text": "[(0 + 1512 / 3)] = 504"
      }
    ]
    const props = { ...getDefaultProps(), canSubmit: true, attempts: attempts  };

    render(<GameMain {...props} />);
  });

  it('render when automate toggle is checked and attempts array is not empty ', () => {
    const otherProps = {
      otherProps: {
        isSingleUser: false, 
        playerTwo: {id: "1615013239969"}, 
        turn: '1615013239969'
      }
    }
    const attempts = [
      {
        "user": {
          "id": "1615014471606",
          "profileImg": "player.png",
          "isSelf": true
        },
        "number": 0,
        "newValue": 504,
        "oldValue": 1512,
        "text": "[(0 + 1512 / 3)] = 504"
      }
    ]
    const props = { ...getDefaultProps(), 
      canSubmit: true, 
      attempts: attempts, 
      checked: true, 
      startingNumber: 18, 
      ...otherProps,
    };

    const { container } = render(<GameMain {...props} />);
    const toggleButton = getByTestId(container, "automate-toggle");
    fireEvent.click(toggleButton);
    expect(props.attempts.length).toBe(1);
  });

  it('render when automate toggle is checked and attempts array is empty ', () => {
    const otherProps = {
      otherProps: {
        isSingleUser: false, 
        playerTwo: {id: "1615013239969"}, 
        turn: '1615013239969'
      }
    }
    const attempts = []
    const props = { ...getDefaultProps(), 
      canSubmit: true, 
      attempts: attempts, 
      checked: true, 
      startingNumber: 18, 
      ...otherProps,
    };

    const { container } = render(<GameMain {...props} />);
    const toggleButton = getByTestId(container, "automate-toggle");
    fireEvent.click(toggleButton);
    expect(props.attempts.length).toBe(0);
  });
});
