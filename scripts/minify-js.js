var UglifyJS = require('uglifyjs');

require('shelljs/global');

function minifyJS(infile, inMapFile, outfile, outMapFile) {
    var result = UglifyJS.minify(infile, {
        inSourceMap: inMapFile,
        outSourceMap: outMapFile.split('/').pop()
    });

    /*
    rm(infile);
    rm(inMapFile);
    */

    result.code.to(outfile);
    result.map.to(outMapFile);
}

module.exports = minifyJS;
