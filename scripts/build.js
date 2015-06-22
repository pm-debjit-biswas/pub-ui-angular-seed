var path = require('path');

var bundle = require('./bundle');
var buildHtml = require('./build-html');
var addVersion = require('./add-version');
var minifyJS = require('./minify-js');
var minifyCSS = require('./minify-css');

require('shelljs/global');

function distSlash(file) {
    return path.join(__dirname, '../dist', file || '');
}

var jsBundle = path.join(__dirname, '../app/bundle.js');
var versionedJSBundlePattern = distSlash('bundle.{hash}.js');

var cssBundle = path.join(__dirname, '../app/bundle.css');
var versionedCSSBundlePattern = distSlash('bundle.{hash}.css');

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

    mv(path.join(__dirname, '../app/bundle.*'), distSlash());

    minifyJS(
        distSlash('bundle.' + jsversion + '.js'),
        distSlash('bundle.js.map'),
        distSlash('bundle.min.' + jsversion + '.js'),
        distSlash('bundle.min.' + jsversion + '.js.map')
    );
    minifyCSS(
        distSlash('bundle.' + cssversion + '.css'),
        distSlash('bundle.min.' + cssversion + '.css')
    );

    // Build the HTML file (index.html)
    // This step removes all the scripts on the page and
    // adds the ones specified in the array below.
    console.log('Building HTML...');
    buildHtml(
        // Input file
        srcIndexPath,
        // Output file
        distSlash('index.html'),
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
