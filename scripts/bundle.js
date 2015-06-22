var jspm = require('jspm');

function bundle(module, outfile) {
    return jspm.bundleSFX(module, outfile, {
        minify: false, sourceMaps: true, lowResSourceMaps: false,
        globalDefs: {__DEV__: false}
    });
}

module.exports = bundle;
