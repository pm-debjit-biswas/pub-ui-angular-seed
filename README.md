PubMatic UI Seed for AngularJS
==============================

This is a boilerplate for PubMatic application UI. This boilerplate supports ES6 using Babel.

__Note__: If you want to use ```npm``` instead of [```jspm```](http://jspm.io) for browser dependencies,
use the [```npm-only```](https://github.com/pm-debjit-biswas/pub-ui-angular-seed/tree/npm-only) branch of this 
repository.

Features
--------

* ES6 support
* Build system
* Linting and style checks
* Testing infrastructure [TODO]
* Development server with proxy support to access APIs
* Best practices baked in.

Installing Dependencies
-----------------------

All the dependencies required for the build system, testing and so on are managed with npm and defined in
package.json. They can be installed with:

```bash
$ npm install 
```

Running the application
-----------------------

Run ```npm start```, which will start a server at ```http://localhost:<random_port>```. Live reload is enabled by
default.

To add proxy configuration for accessing APIs, you may add a ```proxyconfig.json``` file at root of the repository. 
The format of the file will be something like below:

```json
[
    {"inventory/": "http://apps.pubmatic.com/"}
]
```

Configuring optional dependencies
---------------------------------

You can install some optional helper libraries and do some configuration using the below command. Currently this 
command can be run only once.

```bash
$ npm run configure
```

Building for production
-----------------------

To create a production build, run ```npm run build```. This will create a ```dist/``` folder that can be deployed to CDN server.

FAQs
----

### What about KickStart?
We would want to merge this project into KickStart in future.

### Is it necessary to use a functional library?
No, but it is highly recommended. Such a library will provide many built-in functions to make your code easier to 
read and maintain.

You may choose one of the following by running ```npm run configure```: [lodash](https://lodash.com/),
[lodash-fp](https://github.com/lodash/lodash-fp) or [Ramda](http://ramdajs.com).

### How do I install any other dependency?
You can install your application dependencies using ```jspm install <pkg-name>``` to install from JSPM registry, or 
use ```jspm install npm:<pkg-name>``` to install it from NPM registry. The general pattern is ```jspm install 
registry:<pkg-name>```, where registry can be npm, github or bower.
Read more about [installing packages with ```jspm```](https://github.com/jspm/jspm-cli/blob/master/docs/installing-packages.md).

For development dependencies use ```npm install <pkg-name> --save-dev```.
 
### Why use JSPM?
JSPM complements SystemJS very well by automatically maintaining the correct map of dependencies installed. This map 
lets us import installed modules using simple names. It also gives us a single way to install packages from
npm, bower or github. Additionally it also works as a build tool.

### Can I use Apache for development?
Yes you can, but there is a catch, for now. You need to serve the ```client``` folder on the Apache root. Currently 
you cannot serve it from within a folder. This is because of the ```<base>``` tag in the ```index.html``` file, which
 is required for ```html5mode``` in ui-router. We are trying to find a solution to this.

### Why does the built-in server start on a random port?
This enables you to have many applications running simultaneously during development.

### Where do I store third-party dependencies not available through npm or bower?
You may add them to ```vendor``` folder inside the ```client``` folder.
