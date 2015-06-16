var path = require('path');
var fs = require('fs');
var chokidar = require('chokidar');
var http = require('http'),
    httpProxy = require('http-proxy');

require('shelljs/global');

cp(
    '-rf',
    path.join(__dirname, '../client/index.html'),
    path.join(__dirname, '../client/200.html')
);

var watcher = chokidar.watch(path.join(__dirname, 'client/index.html'), {
    persistent: true
});
watcher.on('change', function() {
    cp(
        '-rf',
        path.join(__dirname, '../client/index.html'),
        path.join(__dirname, '../client/200.html')
    );
});

var liveServer = require('jspm-server');
var params = {
    port: 8282,
    host: '0.0.0.0',
    root: 'client',
    open: false,
    logLevel: 0
};

liveServer.start(params);

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

var proxyConfig = [];
if (!fs.existsSync('./proxyConfig.json')) {
    console.log(('You can add proxy configuration, ' +
        'for APIs, by adding proxyConfig.json file at root').yellow);
    proxyConfig = [];
} else {
    proxyConfig = require(path.join(__dirname, '../proxyConfig.json'));
}

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    var matched = false;
    proxyConfig.forEach(function (route) {
        var pattern = Object.keys(route)[0];
        var match = req.url.match(new RegExp('^/' + pattern + '(.*)'));
        if (match) {
            proxy.web(req, res, {target: route[pattern]});
            matched = true;
        }
    });

    if (!matched) {
        proxy.web(req, res, {target: 'http://127.0.0.1:8282'});
    }
});

server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head, {target: 'http://127.0.0.1:8282'});
});

console.log(('Listening on port 8181').green);
server.listen(8181);
