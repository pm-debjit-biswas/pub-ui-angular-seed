var path = require('path');
var HtmlDist = require('html-dist');

require('shelljs/global');

function buildHtml(infile, outfile, scripts) {
    var dist = new HtmlDist(cat(infile));

    dist.removeAll();

    scripts.forEach(function (script) {
        dist.insertScript(script);
    });

    dist.insertScript('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js');
    dist.insertScript('https://s3.amazonaws.com/pubmatic-cc/0.1.39/pmcc.min.js');
    dist.insertScript(ls(path.join(__dirname, '../dist/bundle.min.*.js')));

    dist.out(true).to(outfile);
}

module.exports = buildHtml;
