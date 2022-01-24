var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

var db = {}
var state = 0 //idle
var current_key = null

const isPrime = num => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
}



net.createServer(function (sock) {
    sock.on('data', function (data) {
        switch (state) {
            case 0:
                if (data == 'HELLO') {
                    sock.write('HELLO')
                    state = 1 //wait for key
                }
                break
            case 1:
                if (data == 'PRIME NUMBER') {
                    sock.write('Enter Number')
                    state = 2
                }
                else {
                    sock.write('ERROR')
                }
                break
            case 2:
                if (data == 'GOODBYE') {
                    sock.close()
                    state = 3 //end                    
                } else {
                    if (!isNaN(data)) {
                        if (isPrime(data))
                            sock.write(data + " is a prime number")
                        else
                            sock.write('It is not prime number')
                    }
                    else {
                        sock.write('Input is not correct')
                    }
                }
                break
        }
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);