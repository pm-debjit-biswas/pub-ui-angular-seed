PubMatic UI Seed for AngularJS
==============================

This is a boilerplate for PubMatic application UI. This boilerplate support ES6 using Babel.

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

FAQs
----

### What about KickStart?
We would want to merge this project into KickStart in future.

### Is it necessary to use a functional library?
No, but it is highly recommended. Such a library will provide many built-in functions to make your code easier to 
read and maintain.

### How do I install any other dependency?
You can install your custom dependencies using ```npm install <pkg-name>```, and add the mapping in ```config.js```, 
so that it can be imported using ES6 module syntax.
