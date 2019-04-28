const express = require('express'); // including the express framework
const app = express(); // making instance of express app
const cardShuffle = require('shuffle-array');
// using express app for server variable
const server = require('http').createServer(app);
// making connection instance
const IOconnection = require('socket.io')(server, {});
const clients = [];
const players = [];
const player1Cards = [];
const player2Cards = [];
const player3Cards = [];
const player4Cards = [];
const centerOfTable = [];
let clientsJoined = 0;

// loop through array & pass out cards

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
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(8080);
console.log('Server starting on port 8080');

// this function runs when there is a new socket connection
IOconnection.sockets.on('connection', (socket) => {
  // clients.push(socket); //pushing clients to array
  cardShuffle(imageNames);
  clients.push(socket.id); // push socket.id to send private message to client

  clientsJoined++; // increment clients
  console.log('connection established: ' + clientsJoined);
  console.log(userName); // prints out username

  // shuffle out cards
  // FIXME: new game need to reset deck & shuffle again
  if (clientsJoined == 4) {
    for (let i = 0; i < 52; i = i + 4) {
      const card = imageNames.pop();
      player1Cards.push(card);

      card = imageNames.pop();
      player2Cards.push(card);

      card = imageNames.pop();
      player3Cards.push(card);

      card = imageNames.pop();
      player4Cards.push(card);
    }
  }

  socket.on('client-slap', (data) => {
    console.log('slap from the following user');
    console.log(data.clientUserName);

    //If top card for center of table is jack → move card to winner’s hand
    const topCard = centerOfTable.get(centerOfTable.length - 1);
    
    // if(topCard.charAt(0) == 'J'){
    //   //a jack card was slapped

    //   if(data.clientUserName == 'player1') {
        
    //   } 
    // }

  });

  socket.on('play-hand', (data) => {
    // FIXME: only allow this once all four clients joined
    if (clientsJoined == 4) {
      const card;
      // pop a card from end of array
      if (data.clientNumber == 'player1') {
        card = player1Cards.pop();
        io.sockets.connected[clients[0]].emit(card); // catch this on client side
      } else if (data.clientNumber == 'player2') {
        card = player2Cards.pop();
        io.sockets.connected[clients[1]].emit(card); 
      }
      else if (data.clientNumber == 'player3') {
        card = player3Cards.pop();
        io.sockets.connected[clients[2]].emit(card); 
      }
      else if (data.clientNumber == 'player4') {
        card = player4Cards.pop();
        io.sockets.connected[clients[3]].emit(card); 
      }
    }

    //update center of table 
    centerOfTable.push(card); // FIXME: make sure to update images on client 
  });

  socket.on('client-userName-submit', (data) => {
    console.log('user name was submitted');
    const enteredName = data.clientUserNameSubmit;

    console.log(enteredName);
  });



});
