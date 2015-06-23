function minifyCSS(infile, outfile) {
    // Not minifying here as the file is already minified
    // by plugin-css when bundling with JSPM.
    // Once we can remove it, we will be minifying it here.
    cat(infile).to(outfile);

    // rm(infile);
}

module.exports = minifyCSS;
