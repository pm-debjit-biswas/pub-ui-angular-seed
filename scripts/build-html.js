var cheerio = require('cheerio');
var minify = require('html-minifier').minify;

require('shelljs/global');

function buildHtml(infile, outfile, scripts, stylesheets) {
    var $ = cheerio.load(cat(infile));

    $('script').remove();
    $('link[rel="stylesheet"]').remove();

    scripts.forEach(function (script) {
        $('body').append('<script src="' + script + '"></script>');
    });
    stylesheets.forEach(function (src) {
        $('head').append('<link rel="stylesheet" href="' + src + '"/>');
    });

    minify($.html(), {
        collapseWhitespace: true,
        removeComments: true
    }).to(outfile);
}

module.exports = buildHtml;
