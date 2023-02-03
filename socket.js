const users = [];

const onSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on('user:join', (name) => {
            !users.some((user) => username === name) &&
            users.push({name, sokeld:socket.id});
        });

        socket.on('message:send', (payload) => {
            socket.broadcast.emit('message:receive', payload);
        })

        socket.on('disconnect', () => {
            const user = users.filter((user) => user.sockeld === socket.id);
            io.emit('global:message', `${user[0].name} just left!`);
        });
    });
}

export default onSocket;