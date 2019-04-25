var express = require('express'); //including the express framework
var app = express(); //making instance of express app
var server = require('http').Server(app); //using express app for server variable
const uuidv1 = require('uuid/v1');
var clients = [];
var slapQueue = [];


//handles routing for static files
app.get('/',function(request, response) {

    response.sendFile(__dirname + '/client/index.html');

});


app.use('/client', express.static(__dirname + '/client'));

server.listen(8080);
console.log("Server starting on port 8080");

//making connection instance
var IOconnection = require('socket.io')(server,{});

//this function runs when there is a new socket connection
IOconnection.sockets.on('connection', function(socket){
    
    // clients.push(socket); //pushing clients to array
    var userName = uuidv1();
    clients.push(userName);
    
    console.log('connection established');
    console.log(userName); //prints out username

    //server instream reading message
    socket.on('client-message',function(data){
        console.log('server received message from client');
        console.log(data.someClientData);
    });

    //server sending out message with outstream
    socket.emit('serverMessage',{ serverData: 'hello from server' });

    socket.emit('InitialUUID',{ serverData: userName });

    socket.on('client-slap',function(data){
        console.log('slap from the following user');
        console.log(data.clientUserName);
    });

    socket.on('client-userName-submit',function(data){
        console.log('user name was submitted');
        var enteredName = data.clientUserNameSubmit;

        console.log(enteredName);
    });


});








