var net = require('net');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTEF TO: ' + HOST + ':' + PORT);
    readline.question('\n', input => {
        client.write(input);
    })   
});

client.on('data', function(data) {
    readline.question(data  + '\n', input => {
        client.write(input);
    })
});

client.on('close',function() {
    console.log('Connection closeed');
})