module.exports = function() {

  this.World = function World(callback) {
    var ptor = browser;

      //Left Panel
      //
      //var thumbsListWidth;
      //var thumbnailSize = { width: null, height: null };
      //
      //this.getThumbsListWidth = function(){
      //    return thumbsListWidth;
      //};
      //this.setThumbsListWidth = function(value){
      //    thumbsListWidth = value;
      //};
      //
      //this.getThumbnailSize = function(){
      //    return thumbnailSize;
      //};
      //this.setThumbnailSize = function(width, height){
      //    thumbnailSize.width = width;
      //    thumbnailSize.height = height;
      //};
      //
      //this.contractLeftPanelArrow = function(callback){
      //    var that = this;
      //    ptor.findElement(protractor.By.css('.leftPanel .collapseButton'))
      //        .then(
      //        function(el){
      //            el.click().then(
      //              function(){
      //                  that.SetLeftPanelWidth(callback);
      //              }
      //            );
      //        },
      //        function(){
      //            callback.fail('Collapse button not found');
      //        });
      //};
      //
      //this.expandThumbnailsTab = function(callback){
      //    var that = this;
      //    ptor.$('#app').element(protractor.By.css('.leftPanel .expandFullButton'))
      //        .then(
      //        function (el) {
      //            //console.log('found .leftPanel .expandFullButton');
      //              el.click()
      //              .then(function(){
      //                  //console.log('clicked');
      //                  that.SetLeftPanelWidth(callback);
      //              },
      //              function(){
      //                  //console.log('click did not work')
      //                  that.SetLeftPanelWidth(callback);
      //              });
      //        },
      //        function () {
      //            callback.fail("Expand thumbnails button not found");
      //        }
      //    ),
      //    function(){
      //        that.SetLeftPanelWidth(callback);
      //    };
      //};
      //
      //this.SetLeftPanelWidth = function(callback){
      //    var that = this;
      //    ptor.sleep(0).then(function() {
      //        ptor.$('#app').element(protractor.By.css('.leftPanel'))
      //        //$$('#app').get(0).element(protractor.By.css('.leftPanel'))
      //            .then(
      //            function(lPnl) {
      //                console.log('found .leftPanel');
      //                lPnl.getCssValue('width')
      //                    .then(function (w) {
      //                        console.log('got width');
      //                        that.setThumbsListWidth(w);
      //                        callback();
      //                    });
      //            },
      //            function(){
      //                callback.fail('leftPanel not found');
      //            });
      //    });
      //
      //};
      //
      //this.GetCurrentThumbnailSize = function(callback){
      //    ptor.$('#app').element(protractor.By.css('.thumb.selected .wrap.loaded'))
      //        .then(function (thumbnail) {
      //            var obj = {width: null, height: null};
      //            console.log('will get size');
      //            thumbnail.getSize()
      //                .then(function (size) {
      //                    console.log('got size');
      //                    obj = size;
      //                    callback(obj);
      //                });
      //        });
      //};
      //
      //this.SetThumbnailSizeWithCurrent = function(callback){
      //    var that = this;
      //    function set(current){
      //        that.setThumbnailSize(current.width, current.height);
      //        callback();
      //    }
      //    var current = this.GetCurrentThumbnailSize(set);
      //};


  	callback(); // tell Cucumber we're finished and to use 'this' as the world instance

	  //Viewer frame functions
  };


}

