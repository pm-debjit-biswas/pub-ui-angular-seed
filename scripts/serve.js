var liveServer = require('live-server');

var params = {
    port: 8181,
    host: '0.0.0.0',
    open: '/client/app/#/'
};

liveServer.start(params);
