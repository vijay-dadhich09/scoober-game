const { v4: uuidv4 } = require("uuid");

const PLAYER = { id: "000", username: "cpu" };

const createNewGame = ({ user, isSingleUser, isRoomFull }) => {
  const randomNumber = Math.floor(Math.random() * 99) + 9;
  // [VD: 07.03.2021] added isSingleUser and isRoomFull props to user type and room statue
  return {
    id: uuidv4(),
    playerOne: user,
    playerTwo: isSingleUser ? PLAYER : null,
    value: randomNumber,
    startingNumber: randomNumber,
    turn: isSingleUser ? user.id : null,
    attempts: [],
    winner: null,
    isSingleUser, 
    isRoomFull,
  };
};

const joinGame = (state, gameId, user) => {
  return [
    ...state.map((game) => {
      if (game.id === gameId) {
        return { ...game, playerTwo: user, turn: user.id };
      } else {
        return game;
      }
    }),
  ];
};

const calculateValue = (value, number) => {
  const newValue = (value + number) / 3;
  const isDivisible = (value + number) % 3 === 0;

  return {
    value: newValue,
    isDivisible,
  };
};

const findGame = (state, gameId) => {
  return state.find((game) => game.id === gameId);
};

const leaveGame = (state, userId) => {
  let returnGame = null;
  const newState = [
    ...state.map((game) => {
      if (
        !game.winner &&
        (game.playerOne.id === userId ||
          (game.playerTwo && game.playerTwo.id === userId))
      ) {
        const updatedGame = {
          ...game,
          winner:
            userId === game.playerOne.id
              ? game.playerTwo
                ? game.playerTwo.id
                : PLAYER.id
              : game.playerOne.id,
        };
        returnGame = updatedGame;
        return updatedGame;
      } else {
        return game;
      }
    }),
  ];

  return [newState, returnGame];
};

const turn = (state, attempt) => {
  return [
    ...state.map((game) => {
      if (game.id === attempt.gameId) {
        if (game.winner) return game;

        const newValue = calculateValue(game.value, attempt.number);
        let gameWinner = null;

        if (newValue.value === 1) {
          gameWinner = attempt.user.id;
        } else if (!newValue.isDivisible) {
          gameWinner =
            attempt.user.id === game.playerOne.id
              ? game.playerTwo.id
              : game.playerOne.id;
        }

        return {
          ...game,
          turn:
            attempt.user.id === game.playerOne.id
              ? game.playerTwo.id
              : game.playerOne.id,
          attempts: [
            ...game.attempts,
            {
              user: attempt.user,
              number: attempt.number,
              newValue: newValue.value,
              oldValue: game.value,
              text: `[(${attempt.number} + ${game.value} / 3)] = ${newValue.value}`,
            },
          ],
          winner: gameWinner,
          value: newValue.value,
        };
      } else {
        return game;
      }
    }),
  ];
};

const pickNumber = (num) => {
	const mod = num % 3;
	if (mod === 0) {
		return 0;
	} else if (mod === 1) {
		return -1;
	} else {
		return 1;
	}
}

module.exports = {
  PLAYER,
  createNewGame,
  turn,
  leaveGame,
  findGame,
  joinGame,
	pickNumber,
};
