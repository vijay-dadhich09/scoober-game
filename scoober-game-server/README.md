# Scoober Game Server
This is server part of the scoober game which is using socket.io to serve the communication between clients. Clients can subscribe to different events to complete the requirements.


### Description

When a player starts, they incept a random (whole) number and send it to the second player as an approach of starting the game. The receiving player can then choose between adding one of {-1,0,1} in order to get to a number that is divisible by 3. The resulting whole number is then sent back to the original sender.

The same rules are applied until one player reaches the number 1 

Both players should be able to play automatically without user input. One of the players should optionally be adjustable by a user.

### Feature

User can play with the computer or the player.
Maximum two plyers can play at a time.
Players can communicate with each other using this socket.io