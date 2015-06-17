var fs = require('fs');
var hashmark = require('hashmark');

function addVersion(jsfile, outfile, cb) {
    var file = fs.createReadStream(jsfile);

    hashmark(file, {length: 8, digest: 'md5', 'pattern': outfile}, function (err, map) {
        if (err) {
            throw err;
        }
        cb(map);
    });
}

module.exports = addVersion;
