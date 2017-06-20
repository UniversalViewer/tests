# tests

(these notes are windows-specific).

## setup

Install the Java JDK: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

and add java to your system's path environment variable.

cd into `./node_modules/grunt-protractor-runner` and run

`npm install`

to install protractor.

then cd into `./node_modules/grunt-protractor-runner/node_modules/protractor/bin` and run

`node webdriver-manager update`

to install selenium and chromedriver.


## steps generation

To generate scenario stubs run:

    cucumber-js tests/e2e/features


## run the tests.

run:

    grunt examples

to build and launch the examples, then:

    grunt test

to launch protractor.

## notes

### To change the manifests being used in the tests

In:

    test/e2e/features/support/hooks.js

Change

    this.registerHandler('BeforeFeature', function (event, callback) {

where the switch statement does a `this.GetPage('/examples/?manifest=`


### Problem with specific KB and automating IE 11 with Selenium

    https://code.google.com/p/selenium/issues/detail?id=8302

Command to run if Selenium can't find the openseadragon canvas via IE webdriver:

    wusa /uninstall /kb:3025390 /quiet /norestart
