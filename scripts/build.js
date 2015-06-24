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
        path.join(__dirname, '../app/jspm_packages', modulePath + '*')
    )[0].split('@').pop();
}

var jsBundle = path.join(__dirname, '../app/bundle.js');
var versionedJSBundlePattern = distSlash('bundle.{hash}.js');

var cssBundle = path.join(__dirname, '../app/bundle.css');
var versionedCSSBundlePattern = distSlash('bundle.{hash}.css');

var srcIndexPath = path.join(__dirname, '../app/index.html');

var cdnjsRoot = 'https://cdnjs.cloudflare.com/ajax/libs/';

// Get version of the Angular library that has been installed
var ngVersion = getInstalledVersion('github/angular/bower-angular');
var ngPath = cdnjsRoot + 'angular.js/' + ngVersion + '/angular.min.js';

var uiRouterVersion = getInstalledVersion('github/angular-ui/ui-router');
var uiRouterPath = cdnjsRoot + 'angular-ui-router/' + uiRouterVersion + '/angular-ui-router.min.js';

var normalizeVersion = getInstalledVersion('npm/normalize');
var normalizePath = cdnjsRoot + 'normalize/' + normalizeVersion + '/normalize.min.css';

var pmccPath = 'https://s3.amazonaws.com/pubmatic-cc/0.1.41/';

mv(distSlash('angular.min.js'), distSlash('angular.' + ngVersion + '.min.js'));
mv(distSlash('angular-ui-router.min.js'), distSlash('angular-ui-router.' + uiRouterVersion + '.min.js'));

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
            {
                type: 'content',
                content: 'window.angular.bootstrap || document.write(\'<script src="' +
                    'angular.' + ngVersion + '.min.js' + '"><\\/script>\');'
            },
            uiRouterPath,
            {
                type: 'content',
                content: 'angular.module(\'ui.router\') || document.write(\'<script src="' +
                    'angular-ui-router.' + uiRouterVersion + '.min.js' + '"><\\/script>\');'
            },
            pmccPath + 'pmcc.min.js',
            'bundle.min.' + jsversion + '.js'
        ],
        // Stylesheets to include
        [
            normalizePath,
            pmccPath + 'pmcc.min.css',
            'bundle.min.' + cssversion + '.css'
        ]
    );

    console.log('Build completed successfully');
});
