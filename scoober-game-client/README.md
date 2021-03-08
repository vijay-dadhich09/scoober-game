# Scoober Game Server
This is client part of the scoober game which is developed in React (17.0.1) and used Redux toolkit for the state management. 
### Description
When a player starts, they incept a random (whole) number and send it to the second player as an approach of starting the game. The receiving player can then choose between adding one of {-1,0,1} in order to get to a number that is divisible by 3. The resulting whole number is then sent back to the original sender.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### Feature

1. User can play with the computer or the player.
2. Maximum two plyers can play at a time.
3. Both players can be able to play automatically without user input.
4. Players can communicate with each other using this socket.io
5. A 30 second timer to select an option other wise player will loose the game 