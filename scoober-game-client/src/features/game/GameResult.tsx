import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import lostImgUrl from '../../img/you-lost.png';
import winImgUrl from '../../img/win.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    height: '60%',
  },
  imageContainer:  {
    height: '100%',
    backgroundRepeat:'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundOrigin: 'contentBox',
  },
  lostImage: {
    backgroundImage: `url(${lostImgUrl})`,
  },
  winImage: {
    backgroundImage: `url(${winImgUrl})`,
  },
  winMessageStyle: {
    marginTop: '10px',
    color: '#8bc34a'
  },
  loseMessageStyle: {
    marginTop: '10px',
    color: '#f44336'
  }
}));

interface Props {
  winner: string,
  selfId: string,
}
const GameResult = ({ winner, selfId }: Props) => {
  const classes = useStyles();
  const message = winner === selfId ? 'You won' : 'You lost';
  const messageStyle = winner === selfId ? 'winMessageStyle' : 'loseMessageStyle';
  const winLossImg = winner === selfId ? 'winImage' : 'lostImage';

  return (
    <div className={classes.root} data-testid="summary-component">
      <div className={`${classes.imageContainer} ${classes[winLossImg]}`} />
      <Typography variant="h3" component="h4" className={`${classes[messageStyle]}`}>
        {message}
      </Typography>
    </div>
  );
};

export default GameResult;
