import express from 'express';
import http from 'http';
import socketIO from 'socket.io'
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', function (req, res) {
    res.sendFile('/index.html', {root: __dirname});
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

server.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});
