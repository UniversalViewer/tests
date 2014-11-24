/**
 * Created by jennifer.strejevitch on 24/11/2014.
 */

var Viewer = function() {
  var ptor = protractor.getInstance(),
      url = '/examples/bl.html?manifest=http://v8l-webtest1.bl.uk:88/IIIFMetadataService/ark:/81055/vdc_000000000144/manifest.json';

  var switchToViewerFrame = function() {
        ptor.switchTo().frame(0);
        ptor.sleep(3000).then(function() {
        });
    };

    var switchToDefaultContent = function(){
      ptor.switchTo().defaultContent();
    };

    this.get = function(){
      ptor.getInstance().get(url).then(
          function(){
              ptor.sleep(3000).then(function () {
                  switchToViewerFrame();
              });
          });
    };

};
