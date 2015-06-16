var path = require('path');
require('shelljs/global');

cp(
    '-rf',
    path.join(__dirname, '../client/index.html'),
    path.join(__dirname, '../client/200.html')
);
// TODO: Add watcher for index.html

var liveServer = require('jspm-server');
var params = {
    port: 8181,
    host: '0.0.0.0',
    root: 'client'
};

liveServer.start(params);
