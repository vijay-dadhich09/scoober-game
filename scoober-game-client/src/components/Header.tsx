import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    position: 'fixed',
    top: 0,
    backgroundColor: '#2196f3',
    boxShadow: '0 8px 6px -6px black',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
    },
    'z-index': 100,
  },
  title: {
    color: '#ffffff',
  },
}));
interface Props {
  profileImg?: string
}
const Header = ({ profileImg }: Props) => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <Box display="flex">
        <Avatar profileImg={profileImg} />
        <Box justifyContent="center" flexDirection="column" display="flex">
          <Typography variant="h6" component="h6" className={classes.title}>
              Scoober Game
          </Typography>
          <Typography variant="subtitle1" className={classes.title}>
            Win the game or win the job
          </Typography>
        </Box>
      </Box>
      
    </header>
  );
};

Header.propTypes = {
  profileImg: PropTypes.string,
};

export default Header;
