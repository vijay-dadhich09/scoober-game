import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Attempt from './Attempt';
import { useCounter } from './useCounter';
import { Box, Button, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { pickNumber } from './utils';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '10px',
    backgroundColor: '#2196f3',
    paddingBottom: '280px',
    paddingTop: '90px',
    width: '100%',
    height: '100%',
  },
  startNumberContainer: {
    marginTop: '10px',
    width: "100%",
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  startingNumber: {
    width: "100px",
    height: "60px",
    borderRadius: "30px",
    backgroundColor: '#ff5722',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  bottomBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#4dabf5',
    'z-index': '100',
  },
  toggleButton: {
    marginLeft: '10px',
    color: '#ffffff'
  },
  button: {
    padding: 5,
    width: "40px",
    height: "40px",
    borderRadius: "40px",
    minHeight: 0,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f50057',
    margin: 10,
    fontSize:"16px",
    fontWeight: 'bold',
    color: '#ffffff'
  },
  alertStyle: {
    justifyContent: 'center',
    width: '80%',
  }
}));

const KeepScrollToBottom = () => {
  const elementRef: any = useRef();
  useEffect(() => elementRef.current.scrollIntoView({behavior: "smooth"}));
  return <div ref={elementRef} />;
};

const pickCorrectNumber = (startingNumber: number, attempts: Array<any>) => {
  const len = attempts.length;
  if(len > 0) {
    return pickNumber(attempts[len-1].newValue)
  } else {
    return pickNumber(startingNumber)
  }
}

interface MainProps {
  startingNumber: number, 
  handleAttempt: Function 
  attempts: Array<any>, 
  canSubmit: boolean,
  onLeftGame: Function,
  otherProps: any,
}
const GameMain = ({ startingNumber, handleAttempt, attempts, canSubmit, onLeftGame, ...otherProps }: MainProps) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const { count, start, stop, reset, finished } = useCounter(30, 1000);
  useEffect(() => {
    if(canSubmit) {
      start();
    }
    return () => { stop();};
  }, [canSubmit]);

  useEffect(() => {
    if(finished) {
      onLeftGame();
    }
  }, [finished]);

  useEffect(() => {
    const { otherProps: {isSingleUser} } = otherProps;
    if (!isSingleUser && checked && canSubmit) {
      const pickedNumber = pickCorrectNumber(startingNumber, attempts);
      setTimeout(() => {
        handleAttempt(pickedNumber);
      }, 1000);
    }
  }, [checked, canSubmit, attempts]);

  const onHandleAttempt = (number: number) => {
    handleAttempt(number);
    reset();
  }
  const toggleChecked = () => {
    setChecked((prev) => !prev);
    reset();
  };

  const renderMessages = () => {
    const { otherProps: {isSingleUser, playerTwo, turn} } = otherProps;
    let content = null;
    if(!isSingleUser && !canSubmit && !playerTwo && !turn){
      content = `Please wait until another player start!`;
    } else if(canSubmit) {
      content  = `Your turn end in ${count} seconds`;
    } else if(!canSubmit) {
      content  = `Waiting opponent's turn...`;
    }  
    return <Alert severity="info" variant="filled" color="warning" className={classes.alertStyle}>{content}</Alert>
  }
  return (
    <>
      
      <div className={classes.root}>
        <div className={classes.startNumberContainer}>
          <Typography variant="h5" component="h6" className={classes.startingNumber}>
            {startingNumber}
          </Typography>
        </div>
        {attempts.map((attempt, index) => {
          return <Attempt {...attempt} key={index} />;
        })}
        <KeepScrollToBottom />
      </div>
      <Box justifyContent="center" display="flex" className={classes.bottomBox}>
        {renderMessages()}
        
        <Box flexDirection="row"  justifyContent="center" display="flex" alignItems="center">
          <Button variant="contained" className={classes.button} disabled={!canSubmit || checked} onClick={() => onHandleAttempt(-1)}>-1</Button>
          <Button variant="contained" className={classes.button} disabled={!canSubmit || checked} onClick={() => onHandleAttempt(0)}>0</Button>
          <Button variant="contained" className={classes.button} disabled={!canSubmit || checked} onClick={() => onHandleAttempt(1)}>1</Button>
          {!otherProps.otherProps.isSingleUser && <FormGroup>
          <FormControlLabel className={classes.toggleButton}
            control={<Switch checked={checked} onChange={toggleChecked} color="primary" data-testid="automate-toggle"/>}
            label="Automate"
          />
        </FormGroup>}
        </Box>
        
      </Box>
    </>
  );
};

GameMain.defaultProps = {
  attempts: [],
  otherProps: {},
};

GameMain.propTypes = {
  startingNumber: PropTypes.number.isRequired,
  handleAttempt: PropTypes.func,
  attempts: PropTypes.array,
  otherProps: PropTypes.shape({})
};

export default GameMain;
