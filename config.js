System.config({
  "baseURL": "/client/app/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "/bower_components/angular/angular",
    "angular-ui-router": "/bower_components/ui-router/release/angular-ui-router",
    "pmcc": "https://s3.amazonaws.com/pubmatic-cc/0.1.29/pmcc.min",
    "babel": "/node_modules/babel-core/browser",
    "babel-runtime": "/node_modules/babel-runtime",
  }
});

