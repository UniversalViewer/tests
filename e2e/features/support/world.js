module.exports = function() {
var ptor;

  this.World = function World(callback) {
	this.prop = "Hello from the World!"; // this property will be available in step definitions
    ptor = protractor.getInstance();

	this.greetings = function(name, callback) {
      console.log("\n----Hello " + name);
      callback();
	};

	//TODO: Get iFrames and choose the one with correct element inside it
	this.switchToViewerFrame = function() {
      ptor.switchTo().frame(0);
	};


	callback(); // tell Cucumber we're finished and to use 'this' as the world instance
  };


}