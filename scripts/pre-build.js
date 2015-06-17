var path = require('path');

require('shelljs/global');

mkdir('-p', path.join(__dirname, '../dist/app/assets'));
cp('-r', path.join(__dirname, '../client/app/assets'), path.join(__dirname, '../dist/app'));
mkdir('-p', path.join(__dirname, '../dist/client/app/pages'));
cp('-r', path.join(__dirname, '../client/app/*.js'), path.join(__dirname, '../dist/client/app'));
cp('-r', path.join(__dirname, '../client/app/pages'), path.join(__dirname, '../dist/client/app'));
