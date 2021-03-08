const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const {
  PLAYER,
  createNewGame,
  joinGame,
  findGame,
  turn,
  leaveGame,
	pickNumber,
} = require("./utils");

//Fake DB
let gamesState = [];

const onLeave = (state, id) => {
  const [newState, updatedGame] = leaveGame(state, id);
  gamesState = newState;
  if (updatedGame) {
    io.to(updatedGame.id).emit("game", updatedGame);
  }
};

const port = process.env.PORT || 5001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: '*',
    }
  });

  io.on("connection", (socket) => {
    socket.on("newgame", ({ user, isSingleUser }) => {
      socket.userId = user.id;
  
      if (isSingleUser) {
        const game = createNewGame({ user, isSingleUser, isRoomFull: false });
  
        gamesState.push(game);
  
        socket.join(game.id);
  
        io.to(game.id).emit("game", game);
      } else {
        const startedGame = gamesState.find(
          (game) => game.playerTwo === null && game.winner === null
        );
        const findAnyGameRunning = (item) => item.playerOne !== null && item.playerTwo !== null && item.winner === null;
        const isRoomFull = gamesState.some(findAnyGameRunning)
        if (!startedGame) {
          const game = createNewGame({ user, isSingleUser, isRoomFull });
  
          gamesState.push(game);
          socket.join(game.id);
          io.to(game.id).emit("game", game);
        } else {
          gamesState = joinGame(gamesState, startedGame.id, user);
          socket.join(startedGame.id);
          const findGameItem = findGame(gamesState, startedGame.id);
          io.to(startedGame.id).emit(
            "game",
            findGameItem
          );
        }
      }
    });
  
    socket.on("turn", (attempt) => {
      gamesState = turn(gamesState, attempt);
      const game = findGame(gamesState, attempt.gameId);
      io.to(attempt.gameId).emit("game", game);
  
      if (game.playerTwo && game.playerTwo.id === PLAYER.id) {
        setTimeout(() => {
          const fakeAttempt = {
            gameId: attempt.gameId,
            user: PLAYER,
            number: pickNumber(game.value),
          };
  
          gamesState = turn(gamesState, fakeAttempt);
  
          io.to(attempt.gameId).emit(
            "game",
            findGame(gamesState, attempt.gameId)
          );
        }, 600);
      }
    });
  
    socket.on("left", () => onLeave(gamesState, socket.userId));
  
    socket.on("disconnect", () => onLeave(gamesState, socket.userId));
  });

server.listen(port, () => console.log(`Listening on port ${port}`));