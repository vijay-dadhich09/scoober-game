import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../components/Avatar';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  left: {
    flexDirection: 'row',
	  justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row-reverse',
	  justifyContent: 'flex-end',
  },
  attemptDetails: {
    flexShrink: 0,
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  detailsLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  detailsRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  selectedNumber: {
    width: "50px",
    height: "50px",
    borderRadius: "30px",
    backgroundColor: '#ff5722',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  labelText: {
    marginTop: '5px',
    padding: '5px',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#ffffff',
    border: '2px solid #3d5afe',
  }
}));
interface attemptProps {
  user: any,
  number: number,
  text: string,
  newValue: number,
}

const Attempt = ({ user, number, text, newValue }: attemptProps) => {
  const classes = useStyles();
  const attemptVariant = user.isSelf ? 'left' : 'right';
  const avatarVariant = user.isSelf ? 'out' : 'in';
  const attemptDetailsVariant = user.isSelf ? 'detailsLeft' : 'detailsRight';
  return (
    <div className={`${classes.root} ${classes[attemptVariant]}`}>
      <Avatar
        profileImg={user.profileImg}
        variant={avatarVariant}
        username={user.username}
      />
      <div
        className={`${classes.attemptDetails} ${classes[attemptDetailsVariant]}`}
      >
        <Typography variant="h5" component="h6" className={classes.selectedNumber}>
          {number}
        </Typography>
        <Typography variant="h6" component="h6" className={classes.labelText}>
          {text}
        </Typography>
        <Typography variant="h6" component="h6" className={classes.labelText}>
          {newValue}
        </Typography>
      </div>
    </div>
  );
};

Attempt.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  newValue: PropTypes.number.isRequired,
};

export default Attempt;
