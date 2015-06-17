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

// Get version of the Angular library that has been installed
var installedNgVersion = ls('client/jspm_packages/github/angular/*.js')[0]
    .split('@').pop().replace('\.js', '');
var ngPath = 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/' +
        installedNgVersion + '/angular.min.js';
var pmccPath = 'https://s3.amazonaws.com/pubmatic-cc/0.1.39/pmcc.min.js';

// Bundle the bootstrap file and save to minifiedBundle
console.log('Bundling...');
bundle('bootstrap', minifiedBundle).then(function () {

    // Now add version to the minified bundle file according to the
    // pattern in versionedBundlePattern. The version is MD5 value
    // of the content.
    console.log('Adding version...');
    addVersion(minifiedBundle, versionedBundlePattern, function () {

        // Get path to the versioned and minified bundle
        var versionedBundle = pathA('bundle.min.*.js');
        // Get name of the versioned bundle
        var finalBuiltFile = ls(versionedBundle)[0].split('/').pop();
        // Get just the version
        var version = finalBuiltFile.split('.')[2];

        // Remove the minifed bundle as now we have the versioned bundle
        rm(minifiedBundle);

        // Create a versioned copy of the sourcemap file
        // TODO Use this
        cp(pathA('bundle.min.js.map'),
           pathA('bundle.min.' + version + '.js.map'));

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
                pmccPath,
                finalBuiltFile
            ]
        );

        console.log('Build completed successfully');
    });
});
