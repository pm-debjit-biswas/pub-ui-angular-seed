var nano = require('cssnano');

function minifyCSS(infile, outfile) {
    nano(cat(infile), {sourcemap: true}).to(outfile);

    // rm(infile);
}

module.exports = minifyCSS;
