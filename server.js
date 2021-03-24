const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5500 });

wss.on('connection', (ws) => {

  ws.on('message', (data) => {
  	console.log('Received:', data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
  });
});