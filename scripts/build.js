var path = require('path');

var bundle = require('./bundle');
var buildHtml = require('./build-html');
var addVersion = require('./add-version');
var minifyJS = require('./minify-js');
var minifyCSS = require('./minify-css');

require('shelljs/global');

function pathA(file) {
    return path.join(__dirname, '../dist', file);
}

var jsBundle = pathA('bundle.js');
var versionedJSBundlePattern = pathA('bundle.{hash}.js');

var cssBundle = pathA('bundle.css');
var versionedCSSBundlePattern = pathA('bundle.{hash}.css');

var srcIndexPath = path.join(__dirname, '../app/index.html');

// Get version of the Angular library that has been installed
var installedNgVersion = ls('app/jspm_packages/github/angular/*.js')[0]
    .split('@').pop().replace('\.js', '');
var ngPath = 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/' +
        installedNgVersion + '/angular.min.js';
var pmccPath = 'https://s3.amazonaws.com/pubmatic-cc/0.1.41/';

// Bundle the bootstrap file and save to minifiedBundle
console.log('Bundling...');
bundle('bootstrap', jsBundle).then(function () {

    // Now add version to the minified bundle file according to the
    // pattern in versionedBundlePattern. The version is MD5 value
    // of the content.
    console.log('Adding version...');
    var jsversion = addVersion(jsBundle, versionedJSBundlePattern);
    var cssversion = addVersion(cssBundle, versionedCSSBundlePattern);

    minifyJS(
        pathA('bundle.' + jsversion + '.js'),
        pathA('bundle.js.map'),
        pathA('bundle.min.' + jsversion + '.js'),
        pathA('bundle.min.' + jsversion + '.js.map')
    );
    minifyCSS(
        pathA('bundle.' + cssversion + '.css'),
        pathA('bundle.min.' + cssversion + '.css')
    );

    // Build the HTML file (index.html)
    // This step removes all the scripts on the page and
    // adds the ones specified in the array below.
    console.log('Building HTML...');
    buildHtml(
        // Input file
        srcIndexPath,
        // Output file
        pathA('index.html'),
        // Scripts to include
        [
            ngPath,
            pmccPath + 'pmcc.min.js',
            'bundle.min.' + jsversion + '.js'
        ],
        // Stylesheets to include
        [
            pmccPath + 'pmcc.min.css',
            'bundle.min.' + cssversion + '.css'
        ]
    );

    console.log('Build completed successfully');
});
