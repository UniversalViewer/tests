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

	//TODO: Get iFrames and choose the one with correct element inside it
	this.switchToViewerFrame = function() {
		ptor.switchTo().defaultContent();

        ptor.switchTo().frame(0);
		ptor.sleep(3000).then(function() {
		});
	};

	this.getViewerFrame = function(){
		ptor.findElements(protractor.By.tagName('iframe').get(0)).then(
			function(viewerFrame){
				return viewerFrame;
			});
	};

	  //ptor.get('/examples/monograph.html').then(function(){
	  ptor.get('/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json').then(function(){
		  ptor.sleep(5000).then(function () {
			  //ptor.switchTo().defaultContent();
				  console.log('Get page');

			  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
		  });

	  });

	  //Viewer frame functions TODO: Page Object
  };


}

