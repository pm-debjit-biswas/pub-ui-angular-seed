var jspm = require('jspm');

function bundle(module, outfile) {
    return jspm.bundleSFX(module, outfile, {
        minify: true, sourceMaps: true, lowResSourceMaps: false,
        globalDefs: {__DEV__: false}
    });
}

module.exports = bundle;
