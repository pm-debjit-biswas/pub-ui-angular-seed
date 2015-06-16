var path = require('path');

var bundle = require('./bundle');
var buildHtml = require('./build-html');
var minifyBundle = require('./minify-bundle');
var getVersion = require('./add-version');

require('shelljs/global');

function partial(fn, arg) {
    return function () {
        return fn.apply(null, [arg].concat(Array.prototype.slice.apply(arguments)));
    };
}

var pathA = partial(path.join, __dirname);

bundle('bootstrap', pathA('../dist/bundle.js'))
.then(function () {
    minifyBundle(
        pathA('../dist/bundle.js'),
        pathA('../dist/bundle.min.js'),
        pathA('../dist/bundle.min.js.map')
    );

    rm('-rf',
        pathA('../dist/bundle.js'),
        pathA('../dist/bundle.js.map')
    );

    getVersion(pathA('../dist/bundle.min.js'), pathA('../dist/bundle.min.{hash}.js'), function () {
        var pieces = ls(pathA('../dist/bundle.min.*.js'))[0].split('/');
        var version = pieces[pieces.length - 1].split('.')[2];

        rm(pathA('../dist/bundle.min.js'));
        mv(pathA('../dist/bundle.min.js.map'),
            pathA('../dist/bundle.min.' + version + '.js.map'));

        buildHtml(pathA('../client/index.html'),
            pathA('../dist/index.html'), [
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js',
                'https://s3.amazonaws.com/pubmatic-cc/0.1.39/pmcc.min.js',
                pathA('../dist/bundle.min.*.js')
            ]);
    });
});
