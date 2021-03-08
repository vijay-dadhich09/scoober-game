import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar test', () => {
  it('renders image', () => {
    render(<Avatar profileImg="avatar.png" username="Avatar" />);

    expect(screen.getByAltText('Avatar').src).toContain('avatar.png');
  });
});
