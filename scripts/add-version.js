var crypto = require('crypto');

require('shelljs/global');

function addVersion(infile, outfile) {
    var contents = cat(infile);
    var hash = crypto.createHash('md5');

    var version = hash.update(contents, 'utf8').digest('hex').slice(0, 8);
    var outpath = outfile.replace('{hash}', version);

    mv(infile, outpath);

    return version;
}

module.exports = addVersion;
