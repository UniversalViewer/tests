module.exports = function() {

  var ptor;

  this.World = function World(callback) {
  	browser.ignoreSynchronization = true;
	this.prop = "Hello from the World!"; // this property will be available in step definitions
    ptor = protractor.getInstance();

	this.greetings = function(name, callback) {
      console.log("\n----Hello " + name);
      callback();
	};

  	callback(); // tell Cucumber we're finished and to use 'this' as the world instance

	  //Viewer frame functions TODO: Page Object
  };


}

