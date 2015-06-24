/*eslint-disable */

var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');

const STATIC_PORT = 9001;

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: [
                    'app/*.js',
                    'app/*.html',
                    'app/pages/**/*',
                    'app/assets/**/*'
                ],
                tasks: [
                    'eslint'
                ],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: 'app/',
                    port: STATIC_PORT,
                    livereload: 35729
                }
            }
        },
        eslint: {
            options: {
                quiet: true
            },
            target: [ '**/*.js' ]
        },
        shell: {
            jspmBundle: {
                options: {
                    stdin: false
                },
                command: 'jspm bundle-sfx bootstrap app/bundle.js'
            }
        },
        filerev: {
            files: {
                src: ['app/bundle.js', 'app/bundle.css'],
                dest: 'dist/'
            }
        },
        copy: {
            assets: {
                files: [
                    {expand: true, src: ['app/assets/**/*'], dest: 'dist/'}
                ]
            },
            angular: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'app/jspm_packages/github/angular/**/angular.min.js',
                            'app/jspm_packages/github/angular-ui/**/angular-ui-router.min.js'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        },
        uglify: {
            options: {
                sourceMapIn: 'dist/bundle.js.map'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: 'bundle.*.js',
                    dest: 'dist/'
                }]
            }
        },
        clean: {
            dist: ['dist/'],
            app: ['app/bundle*']
        }
    });

    grunt.registerTask('proxy', function () {
        startProxyServer(9000, 'http://127.0.0.1:' + STATIC_PORT);
    });

    grunt.registerTask('serve', [
        'connect',
        'proxy',
        'watch'
    ]);

    grunt.registerTask('build', [
        'copy',
        'shell:jspmBundle',
        'filerev',
        'uglify',
        'clean:app'
    ]);
};

function startProxyServer(port, staticServerAddr) {

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
    if (!fs.existsSync('./proxyconfig.json')) {
        console.log(('[Info] You can add proxy configuration, ' +
        'for APIs, by adding proxyconfig.json file at root').yellow);
        proxyConfig = [];
    } else {
        proxyConfig = require(path.join(__dirname, './proxyconfig.json'));
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

    console.log(('[Info] Serving client at http://127.0.0.1:' + port + '/#/').green);
    server.listen(port);
}
