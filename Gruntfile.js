var fs = require('fs');
var cdnjsData = require('cdnjs-cdn-data');
var open = require('open');

var proxyServer = require('./scripts/proxyServer.js');

var staticPort = null;

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
                    port: 0,
                    useAvailablePort: true,
                    livereload: true,
                    onCreateServer: function (server) {
                        server.on('listening', function () {
                            staticPort = server.address().port;
                        });
                    }
                }
            }
        },
        eslint: {
            options: {
                quiet: true
            },
            all: [ '**/*.js' ]
        },
        shell: {
            jspmBundle: {
                options: {
                    stdin: false
                },
                command: 'jspm bundle-sfx bootstrap app/bundle.js'
            }
        },
        useminPrepare: {
            options: {
                dest: 'dist',
                flow: {
                    steps: {
                        ng: ['concat'],
                        bundle: ['concat'],
                        js: ['concat', 'uglifyjs'],
                        css: ['concat', 'cssmin']
                    },
                    post: {}
                }
            },
            html: 'app/index.html'
        },
        usemin: {
            html: ['dist/index.html'],
            options: {
                blockReplacements: {
                    ng: function () {
                        var ngVersion = fs.readdirSync('app/jspm_packages/github/angular/')[0].split('@').pop();
                        var routerVersion = fs.readdirSync('app/jspm_packages/github/angular-ui/')[0].split('@').pop();
                        return '<script src="' + cdnjsData['angular.js'].url(ngVersion) + '"><\/script>' + '\n' +
                            '<script src="' + cdnjsData['angular-ui-router'].url(routerVersion) + '"><\/script>';
                    },
                    normalize: function () {
                        var version = fs.readdirSync('app/jspm_packages/npm/')
                            .filter(function (file) {
                                return file.match(/^normalize/);
                            })[0].split('@').pop();
                        return '<link rel="stylesheet" href="' +
                                cdnjsData.normalize.url(version) + '"\/>';
                    },
                    bundlejs: function () {
                        return '<script src="' +
                            grunt.filerev.summary['app/bundle.js'].split('/').pop()
                            + '"><\/script>';
                    },
                    bundlecss: function () {
                        return '<link rel="stylesheet" href="' +
                            grunt.filerev.summary['app/bundle.css'].split('/').pop()
                            + '"\/>';
                    }
                }
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
                    {expand: true, cwd: 'app', src: ['assets/**'], dest: 'dist'}
                ]
            },
            index: {
                files: [
                    {expand: true, flatten: true, src: ['app/index.html'], dest: 'dist/'}
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
        var done = this.async();
        var port = grunt.option('port');
        var openBrowser = !grunt.option('no-open');
        var address = 'http://127.0.0.1:' + staticPort;

        proxyServer(address, port, function (portListeningOn) {
            if (openBrowser) {
                open('http://127.0.0.1:' + portListeningOn);
            }
            done();
        });
    });

    grunt.registerTask('serve', [
        'connect',
        'proxy',
        'watch'
    ]);

    grunt.registerTask('build', [
        'eslint',
        'useminPrepare',
        'copy',
        'shell:jspmBundle',
        'filerev',
        'uglify',
        'usemin',
        'clean:app'
    ]);
};
