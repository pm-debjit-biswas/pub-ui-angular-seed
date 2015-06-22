var path = require('path');

require('shelljs/global');

mkdir('-p', path.join(__dirname, '../dist/assets'));
cp('-r', path.join(__dirname, '../app/assets'), path.join(__dirname, '../dist'));
mkdir('-p', path.join(__dirname, '../dist/app/pages'));
cp('-r', path.join(__dirname, '../app/*.js'), path.join(__dirname, '../dist/app'));
cp('-r', path.join(__dirname, '../app/pages'), path.join(__dirname, '../dist/app'));

cp(
    find(
        path.join(__dirname, '../app/jspm_packages/github/angular/')
    ).filter(function(file) {
        return file.match(/angular\.min\.js$/);
    })[0],
    'dist/'
);

cp(
    find(
        path.join(__dirname, '../app/jspm_packages/github/angular-ui/')
    ).filter(function(file) {
        return file.match(/angular-ui-router\.min\.js$/);
    })[0],
    'dist/'
);
