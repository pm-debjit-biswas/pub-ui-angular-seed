/*eslint quotes: [2, "double"] */
System.config({
  "baseURL": "/client/app/",
  "transpiler": "babel",
  "babelOptions": { "optional": ["runtime"] },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});
System.config({
  "map": {
    "babel": "/node_modules/babel-core/browser",
    "babel-runtime": "/node_modules/babel-runtime",
    "angular": "/node_modules/angular/angular",
    "angular-ui-router": "/node_modules/angular-ui-router/release/angular-ui-router",
    "pmcc": "https://s3.amazonaws.com/pubmatic-cc/0.1.29/pmcc.min"
  }
});
