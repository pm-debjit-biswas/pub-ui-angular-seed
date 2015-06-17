var path = require('path');

var bundle = require('./bundle');
var buildHtml = require('./build-html');
var getVersion = require('./add-version');

require('shelljs/global');

function pathA(file) {
    return path.join(__dirname, '../dist', file);
}

var installedNgVersion = ls('client/jspm_packages/github/angular/*.js')[0]
    .split('@').pop().replace('\.js', '');

bundle('bootstrap', pathA('bundle.min.js'))
.then(function () {
    getVersion(pathA('bundle.min.js'), pathA('bundle.min.{hash}.js'), function () {
        var file = ls(pathA('bundle.min.*.js'))[0]
            .split('/').pop();
        var version = file.split('.')[2];

        rm(pathA('bundle.min.js'));
        cp(pathA('bundle.min.js.map'),
            pathA('bundle.min.' + version + '.js.map'));

        buildHtml(path.join(__dirname, '../client/index.html'),
            pathA('index.html'), [
                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/' +
                    installedNgVersion + '/angular.min.js',
                'https://s3.amazonaws.com/pubmatic-cc/0.1.39/pmcc.min.js',
                file
            ]);
    });
});
