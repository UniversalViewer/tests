# player-tests

install the karma command line interface globally:

`npm install karma-cli -g`

then run:

`grunt serve`

to serve the player examples, then run:

`karma start`

and

`karma run`

to run the tests.

To generate scenario stubs empty the steps.js file, then run:

`cucumber-js tests/features`

todo: is there a way to avoid manually emptying steps.js?

Don't forget to replace 'this.Given' with 'scenario.Given'.