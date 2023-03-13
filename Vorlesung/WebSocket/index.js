import express from 'express';
import http from 'http';
import {dirname} from "path";
import {fileURLToPath} from "url";
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
const wss = new WebSocketServer({server});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        data = JSON.parse(data);
        // ws.send(JSON.stringify(data)); -> send to single web socket
        wss.broadcast(JSON.stringify(data)); // -> send to all connected web sockets
    });
});


wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

app.get('/', function (req, res) {
    res.sendFile('/index.html', {root: __dirname});
});


server.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});