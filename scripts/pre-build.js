var path = require('path');

require('shelljs/global');

mkdir('-p', path.join(__dirname, '../dist/assets'));
cp('-r', path.join(__dirname, '../client/app/assets'), path.join(__dirname, '../dist'));
mkdir(path.join(__dirname, '../dist/client'));
cp('-r', path.join(__dirname, '../client'), path.join(__dirname, '../dist'));
