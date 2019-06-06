var io = require('socket.io')();

io.on('connection', client=>{
    client.on('update', data=>{
        io.sockets.emit('update', data)
    })
})

io.listen(7000);
console.log('port 7000')