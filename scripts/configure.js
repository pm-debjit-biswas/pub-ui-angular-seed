var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var inquirer = require("inquirer");
var acorn = require('acorn');
var walk = require('acorn/dist/walk.js');
var escodegen = require('escodegen');

function addLibrary(name, lpath) {
    var stack = [];
    var ast = acorn.parse(fs.readFileSync(path.join(__dirname, '../config.js')));
    walk.simple(ast, {
        CallExpression: function(node) {
            if (node.callee.object.name === 'System' &&
                node.callee.property.name === 'config') {
                node.arguments.forEach(function(arg) {
                    if (arg.type === 'ObjectExpression') {
                        arg.properties.forEach(function(prop) {
                            if (prop.key.value === 'map') {
                                prop.value.properties.push(
                                    {
                                        key: {
                                            value: name,
                                            raw: '"' + name + '"',
                                            type: 'Literal',
                                        },
                                        value: {
                                            value: lpath,
                                            type: 'Literal',
                                        },
                                        kind: 'init',
                                        type: 'Property'
                                    }
                                );
                            }
                        });
                    }
                });
            }

            fs.writeFileSync(path.join(__dirname, '../config.js'), escodegen.generate(ast, {
                format: {
                    indent: {
                        style: '  ',
                        base: 0
                    },
                    quotes: 'double'
                }
            }));
        },
        
    });
}

inquirer.prompt([
    {
        type: 'list',
        name: 'flib',
        message: 'Which functional library would you like to use?',
        choices: [
            {
                name: "lodash",
                value: "lodash"
            },
            {
                name: 'lodash-fp',
                value: 'lodash-fp'
            },
            {
                name: 'ramda',
                value: 'ramda'
            }
        ],
        default: 'lodash'
    }
], function( answers ) {
    spawn('npm', [
        'install',
        answers.flib,
        '--save'
    ]).on('close', function(code) {
        if (code === 0) {
            var pkg = require(path.join(__dirname, '../node_modules', answers.flib, 'package.json'));
            addLibrary(answers.flib, '/node_modules/' + answers.flib + '/' + pkg.main);
        }
    });
});
