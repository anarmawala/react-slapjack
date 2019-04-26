const express = require('express'); // including the express framework
const app = express(); // making instance of express app
const cardShuffle = require('shuffle-array');
// using express app for server variable
const server = require('http').createServer(app);
const uuidv1 = require('uuid/v1');
const clients = [];
const player1Cards = [];
const player2Cards = [];
const player3Cards = [];
const player4Cards = [];
const centerOfTable = [];
let clientsJoined = 0;

// Cards
const possibleValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

const possibleSuits = ['Clubs', 'Diamond', 'Hearts', 'Spades'];
const imageNames = [
  '2C.png',
  '2D.png',
  '2H.png',
  '2S.png',
  '3C.png',
  '3D.png',
  '3H.png',
  '3S.png',
  '4C.png',
  '4D.png',
  '4H.png',
  '4S.png',
  '5C.png',
  '5D.png',
  '5H.png',
  '5S.png',
  '6C.png',
  '6D.png',
  '6H.png',
  '6S.png',
  '7C.png',
  '7D.png',
  '7H.png',
  '7S.png',
  '8C.png',
  '8D.png',
  '8H.png',
  '8S.png',
  '9C.png',
  '9D.png',
  '9H.png',
  '9S.png',
  '10C.png',
  '10D.png',
  '10H.png',
  '10S.png',
  'JC.png',
  'JD.png',
  'JH.png',
  'JS.png',
  'QC.png',
  'QD.png',
  'QH.png',
  'QS.png',
  'KC.png',
  'KD.png',
  'KH.png',
  'KS.png',
  'AC.png',
  'AD.png',
  'AH.png',
  'AS.png',
];

// handles routing for static files
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(8080);
console.log('Server starting on port 8080');

// making connection instance
const IOconnection = require('socket.io')(server, {});

// this function runs when there is a new socket connection
IOconnection.sockets.on('connection', function(socket) {
  // clients.push(socket); //pushing clients to array
  cardShuffle(imageNames);
  const userName = uuidv1();
  clients.push(userName);

  clientsJoined++; // increment clients
  console.log('connection established: ' + clientsJoined);
  console.log(userName); // prints out username

  // shuffle out cards
  // shuffle the array by looping, increment condtion by 4,  pass one to each player
  // new game: need to reset deck & shuffle again
  // if 4 clients not connected

  // alternative: pass out the cards as players join the game
  if (clientsJoined == 1) {
    for (let i = 0; i < 13; i++) {
      const card = imageNames.pop();
      player1Cards.push(card);
    }
  } else if (clientsJoined == 2) {
    for (let i = 0; i < 13; i++) {
      const card = imageNames.pop();
      player2Cards.push(card);
    }
  } else if (clientsJoined == 3) {
    for (let i = 0; i < 13; i++) {
      const card = imageNames.pop();
      player3Cards.push(card);
    }
  } else if (clientsJoined == 4) {
    for (let i = 0; i < 13; i++) {
      const card = imageNames.pop();
      player4Cards.push(card);
    }
  }

  // server instream reading message
  socket.on('client-message', function(data) {
    console.log('server received message from client');
    console.log(data.someClientData);
  });

  // server sending out message with outstream
  socket.emit('serverMessage', {serverData: 'hello from server'});

  socket.emit('InitialUUID', {serverData: userName});

  socket.on('client-slap', function(data) {
    console.log('slap from the following user');
    console.log(data.clientUserName);
  });

  socket.on('play-hand', function(data) {
    console.log('client wants to play hand');
    // pop a card from end of array
    if (data.clientUserName == 'player1') {
      const card = player1Cards.pop();
      socket.emit('send-card', {cardData: card});
      // need to have condition on client side of which player they are
    }
  });

  socket.on('client-userName-submit', function(data) {
    console.log('user name was submitted');
    const enteredName = data.clientUserNameSubmit;

    console.log(enteredName);
  });
});
