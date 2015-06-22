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

function getInstalledVersion(modulePath) {
    return ls(
        path.join(__dirname, 'app/jspm_packages', modulePath, '*.js')
    )[0].split('@').pop().replace('\.js', '');
}

var jsBundle = path.join(__dirname, '../app/bundle.js');
var versionedJSBundlePattern = distSlash('bundle.{hash}.js');

var cssBundle = path.join(__dirname, '../app/bundle.css');
var versionedCSSBundlePattern = distSlash('bundle.{hash}.css');

var srcIndexPath = path.join(__dirname, '../app/index.html');

// Get version of the Angular library that has been installed
var ngPath = 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/' +
    getInstalledVersion('github/angular') + '/angular.min.js';
var uiRouterPath = 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/' +
    getInstalledVersion('github/angular-ui') + '/angular-ui-router.js';
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

    // Files are bundled in app folder so that CSS URL normalization
    // works properly. Now they can be moved to the dist/ folder.
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
            uiRouterPath,
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
