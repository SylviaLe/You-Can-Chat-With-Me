//https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=306s

const io = require('socket.io')(5000) //use port 5000 for server
//if you are block by cors, change to this:
// const io = require('socket.io')(5000, {
//     cors: {
//         origin: [url of the client]
//     }
// })

//this function run every time the client connect to the server
io.on('connection', socket => {
    //console.log(socket.id) //a random id is assigned to the client every tie a connection is made

    //join the socket with the id from the client
    const id = socket.handshake.query.id  //the id of the user, pass from the client
    socket.join(id)  //join with your static id

    //listen to the event sent to on the client side
    //socket.on() can be on the client side to, to listen to events from the server, such as success connection, or received message
    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newReps = recipients.filter(r => r!==recipient)
            newRep.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {recipients: newReps, sender: id, text })   //tell io to emit to selected socket out there this event
            //if the above line is this: io.emit('receive-message', {...}), it will emit to every socket, including the one that emit send-message
            //broadcast alone say emit to every socket that is not me
            //to() send to the specific id (recipient), you decide. This has actually assume broadcast
        })
    })
})