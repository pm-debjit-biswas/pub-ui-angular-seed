/**
 * This script is not being used by this example application,
 * but you may use it to do complicated builds in your application.
 * @type {Object|*}
 */

var path = require('path');
var jspm = require('jspm');

/**
 * Examples are provided for directly executing the command or
 * exporting a wrapper function. Both of these will not be required.
 */

/* Option 1 */
jspm.bundleSFX('bootstrap', path.join(__dirname, '../dist/bundle.js'), {minify: false});

/* Option 2 */
export function bundle(module, outfile) {
    jspm.bundleSFX(module, outfile, {minify: false});
}
