var path = require('path');
var HtmlDist = require('html-dist');

require('shelljs/global');

var dist = new HtmlDist(cat(path.join(__dirname, '../client/app/index.html')));

dist.removeAll();

dist.insertScript('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js');
dist.insertScript('https://s3.amazonaws.com/pubmatic-cc/0.1.39/pmcc.min.js');
dist.insertScript(ls(path.join(__dirname, '../dist/bundle.min.*.js')));

dist.out(true).to(path.join(__dirname, '../dist/index.html'));
