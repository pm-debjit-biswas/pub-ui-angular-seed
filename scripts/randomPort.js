var net = require('net');

module.exports = function getRandomPort(cb) {
    var server = net.createServer().listen(0, function () {
        var port = server.address().port;
        server.close(function () {
            cb(port);
        });
    });
};
