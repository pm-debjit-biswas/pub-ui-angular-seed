var path = require('path');
var UglifyJS = require('uglifyjs');

require('shelljs/global');

var result = UglifyJS.minify(path.join(__dirname, '../dist/bundle.js'), {
    inSourceMap: path.join(__dirname, '../dist/bundle.js.map'),
    outSourceMap: 'bundle.min.js.map'
});

result.code.to(path.join(__dirname, '../dist/bundle.min.js'));
result.map.to(path.join(__dirname, '../dist/bundle.min.js.map'));
