#tests

(these notes are windows-specific).


##setup

cd into `./node_modules/grunt-protractor-runner` and run

`npm install`

to install protractor.

then cd into `./node_modules/grunt-protractor-runner/node_modules/protractor/bin` and run

`node webdriver-manager update`

to install selenium and chromedriver.


##steps generation

To generate scenario stubs run:

`cucumber-js tests/e2e/features`


##run the tests.

run:

`grunt serve`

to build and launch the examples, then:

`grunt test`

to launch protractor.