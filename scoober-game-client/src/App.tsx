import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeApiConnect,
  subscribeApiDisconnect,
  selectApi,
} from './api/apiSlice';
import {
  subscribeGameStart,
  selectGame,
  selectGameInProgress,
  selectCanSubmit,
  initGameStart,
  sendAttempt,
  leftGame,
} from './features/game/gameSlice';
import GameMain from './features/game/GameMain';
import GameInit from './features/game/GameInit';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#2196f3',
    minWidth: '320px',
    boxSizing: 'border-box',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, selfId, startingNumber, winner, attempts, isRoomFull, selfImg, ...otherProps } = useSelector(
    selectGame
  );

  const { isConnected } = useSelector(selectApi);
  const gameInProgress = useSelector(selectGameInProgress);
  const canSubmit = useSelector(selectCanSubmit);

  useEffect(() => {
    dispatch(subscribeApiConnect());
    dispatch(subscribeApiDisconnect());
    dispatch(subscribeGameStart());
  }, [dispatch]);

  const handleInitGame = (isSingleUser: boolean) =>
    dispatch(initGameStart({ user: { id: selfId }, isSingleUser }));

  const handleAttempt = (number: number) => {
    if (canSubmit) {
      dispatch(
        sendAttempt({
          gameId: id,
          user: { id: selfId },
          number,
        })
      );
    }
  };

  const onLeftGame = () => {
    dispatch(leftGame());
  }
  const renderGame = () => {
    if (gameInProgress) {
      return (
        <GameMain
          handleAttempt={handleAttempt}
          startingNumber={startingNumber}
          attempts={attempts}
          canSubmit={canSubmit}
          onLeftGame={onLeftGame}
          otherProps={otherProps}
        />
      )
    }

    return (
      <GameInit
        initGame={handleInitGame}
        isConnected={isConnected}
        selfId={selfId}
        winner={winner}
        isRoomFull={isRoomFull}
      />
    )
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" className={classes.root}>
      <Header profileImg={selfImg} />
      {renderGame()}
    </Box>
  );
};

export default App;
