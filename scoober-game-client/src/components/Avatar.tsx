import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    position: 'relative',
    padding: '0 20px',
  },
  avatarImage: {
    position: 'relative',
    display: 'block',
    'z-index': '10',
  },
  out: {
    height: '52px',
    top: '-3px',
    left: '3px',
  },
  in: {
    width: '60px'
  }
}));

type Props = {
  username?: any
  profileImg?: string
  variant?: 'out' | 'in',

}
const Avatar = ({ username, profileImg, variant }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.avatar}>
      <img
        className={`${classes.avatarImage} ${classes[variant?? 'out']}`}
        src={`/scoober-game/${profileImg}`}
        alt={username}
        aria-label={username}
      />
    </div>
  );
};

Avatar.defaultProps = {
  variant: 'out',
  username: '',
  profileImg: '../img/avatar.png',
};

Avatar.propTypes = {
  profileImg: PropTypes.string,
  username: PropTypes.string,
  variant: PropTypes.oneOf(['out', 'in']),
};

export default Avatar;
