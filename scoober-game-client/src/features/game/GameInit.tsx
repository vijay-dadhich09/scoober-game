import React from 'react';
import PropTypes from 'prop-types';
import GameResult from './GameResult';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
    paddingTop: '100px',
  },
  buttonBox: {
    marginTop: '10px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    margingTop: '10px',
    color: '#ffffff',
  },
  alertStyle: {
    margin: '10px',
    justifyContent: 'center',
  },
  button: {
    color: '#ffffff',
    borderColor: '#ffffff'
  },
  loading: {
    color: '#ff0000'
  }
}));

interface Props {
  selfId: string, 
  winner: string,
  initGame: (flag: boolean) => void,
  isConnected: boolean,
  isRoomFull: boolean,
}


const GameInit = ({ selfId, winner, initGame, isConnected, isRoomFull }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {!!winner && <GameResult selfId={selfId} winner={winner} />}
        {!isConnected && (<Typography variant="h5" component="h6" className={classes.loading}>
          Server is not connected... 
        </Typography>)}
        {isRoomFull && <Alert severity="info" variant="filled" color="warning" className={classes.alertStyle}>
          Room is full. Please try after some time!
        </Alert>}
        <Typography variant="h5" component="h6" color="primary" className={classes.title}>
          Choose your opponent
        </Typography>
        <Box justifyContent="center" display="flex" className={classes.buttonBox}>
          <Button disabled={!isConnected} variant="outlined" className={classes.button} onClick={() => initGame(true)} >Computer</Button>
          <Button disabled={!isConnected} variant="outlined" className={classes.button} onClick={() => initGame(false)}>Player</Button>
        </Box>
    </div>
  );
};

GameInit.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  initGame: PropTypes.func.isRequired,
};

export default GameInit;
