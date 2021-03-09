import React from 'react';
import { render, screen } from '@testing-library/react';
import Attempt from '../Attempt';

describe('Attempt', () => {
  const getDefaultProps = () => ({
    user: {
			id: '007',
      profileImg: 'img.png',
      username: 'Ostap',
    },
    number: 42,
    text: '42 / 3',
    newValue: 14,
  });

  it('renders the props', () => {
    const props = { ...getDefaultProps() };

    render(<Attempt {...props} />);

    expect(screen.getByAltText(props.user.username).src).toContain(
      props.user.profileImg
    );
    expect(screen.getByText(`${props.number}`)).toBeInTheDocument();
    expect(screen.getByText(`${props.text}`)).toBeInTheDocument();
    expect(screen.getByText(`${props.newValue}`)).toBeInTheDocument();
  });
});
