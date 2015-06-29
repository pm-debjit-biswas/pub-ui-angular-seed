var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');

require('colors');

var getRandomPort = require('./randomPort');

module.exports = function proxyServer(staticServerAddr, port, cb) {

    var proxy = httpProxy.createProxyServer({});

    proxy.on('error', function (err, req, res) {
        console.log(err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Oops! Something terrible happened. Probably the target server misbehaved.');
        console.log(('[Error]').red, req.url.red,
            ('Oops! Something terrible happened. Probably the target server misbehaved.').red);
    });

    var proxyConfig = [];
    if (!fs.existsSync('../proxyconfig.json')) {
        console.log(('[Info] You can add proxy configuration, ' +
        'for APIs, by adding proxyconfig.json file at root').yellow);
        proxyConfig = [];
    } else {
        proxyConfig = require(path.join(__dirname, '../proxyconfig.json'));
    }

    var server = http.createServer(function(req, res) {
        // You can define here your custom logic to handle the request
        // and then proxy the request.
        var matched = false;
        // The proxyConfig needs to be an array so that we can have maintain
        // priority of redirects.
        proxyConfig.forEach(function (route) {
            var pattern = Object.keys(route)[0];
            var match = req.url.match(new RegExp('^/' + pattern + '(.*)'));
            if (match) {
                proxy.web(req, res, {target: route[pattern]});
                matched = true;
            }
        });

        if (!matched) {
            proxy.web(req, res, {target: staticServerAddr});
        }
    });

    server.on('upgrade', function (req, socket, head) {
        proxy.ws(req, socket, head, {target: staticServerAddr});
    });

    function showSuccessMsg(_port) {
        console.log(
            ('[Info] Serving client at http://127.0.0.1:' + _port + '/#/').green +
                ' \u261A Open this address'
        );
    }

    if (!port) {
        getRandomPort(function (_port) {
            server.listen(_port);
            showSuccessMsg(_port);
            if (typeof cb === 'function') {
                cb(_port);
            }
        });
    } else {
        server.listen(port);
        showSuccessMsg(port);
        if (typeof cb === 'function') {
            cb(port);
        }
    }
};
