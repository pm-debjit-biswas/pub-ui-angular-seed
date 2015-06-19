var net = require('net');
var path = require('path');
var fs = require('fs');
// var chokidar = require('chokidar');
var http = require('http'),
    httpProxy = require('http-proxy');

require('shelljs/global');

/*
var pathToIndex = path.join(__dirname, '../app/index.html');

function copyIndexTo200() {
    cp(
        '-f',
        pathToIndex,
        path.join(__dirname, '../client/200.html')
    );
}

function watchIndex() {
    var watcher = chokidar.watch(pathToIndex, {
        persistent: true
    });
    watcher.on('change', function() {
        copyIndexTo200();
    });
}
*/

function startLiveServer(port) {
    var liveServer = require('jspm-server');
    var params = {
        port: port,
        host: '0.0.0.0',
        root: 'app',
        open: false,
        logLevel: 0
    };

    liveServer.start(params);

    return 'http://127.0.0.1:' + port;
}

function startProxyServer(port, staticServerAddr) {

    var proxy = httpProxy.createProxyServer({});

    var proxyConfig = [];
    if (!fs.existsSync('./proxyconfig.json')) {
        console.log(('You can add proxy configuration, ' +
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

    console.log(('Serving client at http://127.0.0.1:' + port + '/#/').green);
    server.listen(port);
}

function getRandomPort(cb) {
    var server = net.createServer().listen(0, function () {
        var port = server.address().port;
        server.close(function () {
            cb(port);
        });
    });
}

/* Required for html5mode
copyIndexTo200();
watchIndex();
*/

getRandomPort(function (staticPort) {
    var staticServerAddr = startLiveServer(staticPort);

    getRandomPort(function (port) {
        startProxyServer(port, staticServerAddr);
    });
});
