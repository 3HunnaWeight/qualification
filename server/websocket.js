


const ws = require('ws');
const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))
wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        
        switch (message.event) {
            case 'message':
                broadcastMessage(message,ws)
                break;
            case 'connection':
                broadcastMessage(message,ws)
                break;
            case 'sendPlayers':
                broadcastMessage(message,ws)
            break;
            case 'word':
                sendWord(message,ws)
            break;
            case 'sendWords':
                sendWord(message,ws)
            break;
            case "draw":
                broadcastConnection(message, ws)
                break;

        }
    })
})


function broadcastMessage(message, ws) {
    ws.id = message.idSession
    wss.clients.forEach(client => {
        if(client.id === message.idSession){
            client.send(JSON.stringify(message))
        }
    })
    
}


function sendWord(message, ws) {
    ws.id = message.idSession
    wss.clients.forEach(client => {
        if(client.id === message.idSession){
            
            client.send(JSON.stringify(message))
        }
    })
}


