var path = require('path');

require('shelljs/global');

mkdir('-p', path.join(__dirname, '../dist/assets'));
cp('-r', path.join(__dirname, '../app/assets'), path.join(__dirname, '../dist'));
mkdir('-p', path.join(__dirname, '../dist/app/pages'));
cp('-r', path.join(__dirname, '../app/*.js'), path.join(__dirname, '../dist/app'));
cp('-r', path.join(__dirname, '../app/pages'), path.join(__dirname, '../dist/app'));
