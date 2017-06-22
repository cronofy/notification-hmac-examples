const crypto = require('crypto');
const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
    var body = [];

    request.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        console.log('');
        console.log(body)
        console.log('');

        var sent = request.headers['cronofy-hmac-sha256'];
        console.log('Request HMAC:    ' + sent);

        var calculated = crypto.createHmac('sha256', process.env.CRONOFY_CLIENT_SECRET).update(body).digest('base64');
        console.log('Calculated HMAC: ' + calculated);

        match = calculated === sent;
        console.log('Match: ' + match);

        response.end(match.toString());
    });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log('Server is listening on ' + port);
})
