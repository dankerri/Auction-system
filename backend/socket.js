var io = require('socket.io')();

io.on('connection', client=>{
    client.on('updateFromUser', data=>{
        io.sockets.emit('updateFromServer', data)
    })
})

io.listen(7000);
console.log('port 7000')