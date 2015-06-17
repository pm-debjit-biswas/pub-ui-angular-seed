var path = require('path');

var bundle = require('./bundle');
var buildHtml = require('./build-html');
var addVersion = require('./add-version');

require('shelljs/global');

function pathA(file) {
    return path.join(__dirname, '../dist', file);
}

var minifiedBundle = pathA('bundle.min.js');
var versionedBundlePattern = pathA('bundle.min.{hash}.js');
var srcIndexPath = path.join(__dirname, '../client/index.html');

var installedNgVersion = ls('client/jspm_packages/github/angular/*.js')[0]
    .split('@').pop().replace('\.js', '');
var ngPath = 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/' +
        installedNgVersion + '/angular.min.js';
var pmccPath = 'https://s3.amazonaws.com/pubmatic-cc/0.1.39/pmcc.min.js';

bundle('bootstrap', minifiedBundle).then(function () {

    addVersion(minifiedBundle, versionedBundlePattern, function () {

        var versionedBundle = pathA('bundle.min.*.js');
        var finalBuiltFile = ls(versionedBundle)[0].split('/').pop();
        var version = finalBuiltFile.split('.')[2];

        rm(minifiedBundle);

        cp(pathA('bundle.min.js.map'),
           pathA('bundle.min.' + version + '.js.map'));

        buildHtml(
            // Input file
            srcIndexPath,
            // Output file
            pathA('index.html'),
            // Scripts to include
            [
                ngPath,
                pmccPath,
                finalBuiltFile
            ]
        );
    });
});
