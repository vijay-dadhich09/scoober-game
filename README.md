# Scoober Game 
This is multi and single player game with automate support for the multiplayer.
### Description
When a player starts, they incept a random (whole) number and send it to the second player as an approach of starting the game. The receiving player can then choose between adding one of {-1,0,1} in order to get to a number that is divisible by 3. The resulting whole number is then sent back to the original sender.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### Feature

1. User can play with the computer or the player.
2. Maximum two plyers can play at a time.
3. Both players can be able to play automatically without user input.
4. Players can communicate with each other using this socket.io
5. A 30 second timer to select an option other wise player will loose the game 

### Screens
![Alt text](/screenshots/screen1.png?raw=true "Screen 1")
![Alt text](/screenshots/screen2.png?raw=true "Screen 1")
![Alt text](/screenshots/screen3.png?raw=true "Screen 1")
![Alt text](/screenshots/screen4.png?raw=true "Screen 1")
## Major Tech stack - Client
- React (17.0.1)
- Redux (7.2.2)
- TypeScript (3.8.2)
- @reduxjs/toolkit (1.5.0)
- @material-ui/core (4.11.3)
- socket.io-client (3.1.1)
- @testing-library/react (9.5.0)
- @testing-library/react-hooks (5.1.0)
- @testing-library/user-event (7.2.1)
- prop-types
## Major Tech stack - Client
- socket.io (3.1.2)
- express (4.17.1)
- uuid (8.3.2)
- nodemon (2.0.6)
## Installation
### Running the Server:
Open a terminal window
1. `cd scoober-server && yarn or npm i`
2. `yarn start`
3. Open [http://localhost:5001](http://localhost:5001) to view server status in the browser.
### Running the client:
Open a terminal window
1. `cd scoober-client && yarn or npm i`
2. `yarn start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### Test the client:
Open a terminal window
1. `cd scoober-client`
2. `yarn test` // to run all the tests
3. `yarn test:coverage` // to run test and generate coverage report
4. `cd coverage && cd lcov-report open index.html` // to view coverage report in the browser

### Build the client:
Open a terminal window
1. `cd scoober-client`
2. `yarn build` // It correctly bundles React in production mode and optimizes the build for the best performance.

