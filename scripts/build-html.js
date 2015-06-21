/*********** Code ported from html-dist ************/

var cheerio = require('cheerio');
// var minify = require('html-minifier').minify;

function HtmlDist(input) {
    this.input = input;
    this.$ = cheerio.load(input);
}

var p = HtmlDist.prototype;

/*p.out = function(shouldMinify) {
  if(shouldMinify) {
    return minify(this.$.html(), {
      collapseWhitespace: true,
      removeComments: true
    });
  } else {
    return this.$.html();
  }
}*/

p.out = function() {
    return this.$.html();
};

p.removeAll = function() {
    this.$('script').remove();
    return this;
};

p.insertScript = function(src) {
    this.$('body').append('<script src="' + src + '"></script>');
};

p.insertStyle = function(src) {
    this.$('head').append('<link rel="stylesheet"  href="' + src + '"></link>');
};

/***************************************************/

require('shelljs/global');

function buildHtml(infile, outfile, scripts, styles) {
    var dist = new HtmlDist(cat(infile));

    scripts = scripts || [];
    styles = styles || [];

    dist.removeAll();

    scripts.forEach(function (script) {
        dist.insertScript(script);
    });

    styles.forEach(function (style) {
        dist.insertStyle(style);
    });

    // dist.out(true).to(outfile);
    dist.out().to(outfile);
}

module.exports = buildHtml;
