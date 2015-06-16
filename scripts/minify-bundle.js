var path = require('path');
var UglifyJS = require('uglifyjs');

require('shelljs/global');

function minifyBundle(infile, outfile, outMapFile) {
    var result = UglifyJS.minify(infile, {
        inSourceMap: path.join(__dirname, '../dist/bundle.js.map'),
        outSourceMap: 'bundle.min.js.map'
    });

    result.code.to(outfile);
    result.map.to(outMapFile);
}

module.exports = minifyBundle;

