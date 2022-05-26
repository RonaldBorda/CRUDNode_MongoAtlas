const express = require('express');
const app = require();
const http = require('http');
const { allowedNodeEnvironmentFlags } = require('process');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new http.Server(server);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + 'chat.html');
});

io.on('connection', (socket) =>{
    socket.on('chat', (msg) =>{
        io.emit('chat', msg);
        console.log('Mensaje: '+msg);
    })
});

app.use(express.static('public'));
server.listen(3000, () =>{
    console.log('Servidor corriendo en puerto 3000');
})