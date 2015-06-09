var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var inquirer = require('inquirer');
var acorn = require('acorn');
var walk = require('acorn/dist/walk.js');
var escodegen = require('escodegen');

inquirer.prompt([
    {
        type: 'list',
        name: 'flib',
        message: 'Which functional library would you like to use?',
        choices: [
            {
                name: 'lodash',
                value: 'npm:lodash'
            },
            {
                name: 'lodash-fp',
                value: 'npm:lodash-fp'
            },
            {
                name: 'ramda',
                value: 'npm:ramda'
            }
        ],
        default: 'lodash'
    }
], function(answers) {
    spawn(path.join(__dirname, '../node_modules/.bin/jspm'), [
        'install',
        answers.flib
    ], {stdio: 'inherit'});
});
