var HtmlDist = require('html-dist');

require('shelljs/global');

function buildHtml(infile, outfile, scripts) {
    var dist = new HtmlDist(cat(infile));

    dist.removeAll();

    scripts.forEach(function (script) {
        dist.insertScript(script);
    });

    dist.out(true).to(outfile);
}

module.exports = buildHtml;
