PubMatic UI Seed for AngularJS
==============================

This is a boilerplate for PubMatic application UI. This boilerplate supports ES6 using Babel.

__Note__: If you want to use ```npm``` instead of [```jspm```](http://jspm.io) for browser dependencies,
use the [```npm```](https://github.com/pm-debjit-biswas/pub-ui-angular-seed/tree/npm) branch of this repository.

Features
--------

* ES6 support
* Build system
* Best practices baked in.

Installing Dependencies
-----------------------

All the dependencies required for the build system, testing and so on are managed with npm and defined in
package.json. They can be installed with:

```
npm install 
```

Running the application
-----------------------

Run ```npm start```, which will open up ```http://localhost:8181``` on your default browser. Live reload is enabled by 
default.

Configuring optional dependencies
---------------------------------

You can install some optional helper libraries and do some configuration using the below command. Currently this 
command can be run only once.

```
npm run configure
```

Building for production
-----------------------

To create a production build, run ```npm run build```. This will create a ``dist/``` folder that can be deployed to CDN server.

FAQs
----

### What about KickStart?
We would want to merge this project into KickStart in future.

### Is it necessary to use a functional library?
No, but it is highly recommended. Such a library will provide many built-in functions to make your code easier to 
read and maintain.

### How do I install any other dependency?
You can install your application dependencies using ```jspm install <pkg-name>```. For development dependencies
use ``npm install <pkg-name>```.
