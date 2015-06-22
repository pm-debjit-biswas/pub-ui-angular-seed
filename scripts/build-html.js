/*eslint-disable*/
var cheerio = require('cheerio');

require('shelljs/global');

function buildHtml(infile, outfile, scripts, stylesheets) {
    var $ = cheerio.load(cat(infile));

    $('script').remove();
    $('link[rel="stylesheet"]').remove();

    scripts.forEach(function (script) {
        if (typeof script === 'string') {
            $('body').append('<script src="' + script + '"></script>');
        } else if (script.type === 'content') {
            var _content = $('<script>').text(script.content);
            $('body').append(_content);
        }
    });
    stylesheets.forEach(function (src) {
        $('head').append('<link rel="stylesheet" href="' + src + '"/>');
    });

    $.html().to(outfile);
}

module.exports = buildHtml;
/*eslint-enable*/
