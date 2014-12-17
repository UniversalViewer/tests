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

      //Left Panel

      var thumbsListWidth;

      this.getThumbsListWidth = function(){
          return thumbsListWidth;
      };
      this.setThumbsListWidth = function(value){
          thumbsListWidth = value;
      };

      this.contractLeftPanelArrow = function(callback){
          var that = this;
          ptor.findElement(protractor.By.css('.leftPanel .collapseButton'))
              .then(
              function(el){
                  el.click().then(
                    function(){
                        that.SetLeftPanelWidth(callback);
                    }
                  );
              },
              function(){
                  callback.fail('Colapse button not found');
              });
      };

      this.expandThumbnailsTab = function(callback){
          var that = this;
          ptor.findElement(protractor.By.css('.leftPanel .expandFullButton'))
              .then(
              function (el) {
                el.click().then(
                    function(){
                        that.SetLeftPanelWidth(callback);
                    },
                    function(){
                        that.SetLeftPanelWidth(callback);
                    }
                );
              },
              function () {
                  callback.fail("Expand thumbnails button not found");
              }
          ),
          function(){
              that.SetLeftPanelWidth(callback);
          };
      };

      this.SetLeftPanelWidth = function(callback){
          var that = this;
          ptor.findElement(protractor.By.css('.leftPanel'))
              .then(
              function(lPnl) {
                  lPnl.getCssValue('width')
                      .then(function (w) {
                          that.setThumbsListWidth(w);
                          console.log('word.js thumbsListWidth ');
                          console.log('word.js w ' + w);
                          callback();
                      });
              },
              function(){
                  callback.fail('leftPanel not found');
              });
      };

  	callback(); // tell Cucumber we're finished and to use 'this' as the world instance

	  //Viewer frame functions TODO: Page Object
  };


}

