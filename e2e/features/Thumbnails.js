//TODO: Find out the reason why Thumbnails are not being called on the tests
var Thumbnails = function() {

    var ptor;

    this.Before(function (callback) {
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });

    this.When(/^they click in the Thumbnails tab$/, function (callback) {
        console.log("When they click in the Thumbnails tab");
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.linkText('Thumbnails')).then(
                function (thumb) {
                    thumb.click();
                    callback();
                },
                function () {
                    callback.fail("thumbnail tab not found");
                });
        });
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        console.log("Then a list of thumbnails is rendered to the user");
        this.switchToViewerFrame();
        ptor.sleep(3000).then(function() {
            ptor.findElements(protractor.By.css('.wrap.loaded')).then(
                function(thumbs) {
                    for(i = 0; 3; i++){ //checking only the three first thumbnails at the moment
                        thumbs[i].findElement(protractor.By.tagName('img')).then(
                            function (img) {
                            img.getAttribute('src').then(
                                function(src) {
                                    if(src.substring(src.length - 4, src.length) == '.jpg'){
                                        callback();
                                    }
                                    callback.fail("image is not a jpg");
                                },
                                function() {
                                    callback.fail("img src not found");
                                });
                            },
                            function () {
                                callback.fail("thumbnail not found");
                            }
                        );
                    }
                },
                function() {
                    callback.fail("thumbnails not loaded or found");
                });
        });
    });

    this.Given(/^they are viewing a list of thumbnails$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^they click on a thumbnail$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the corresponding image is loaded in the main Viewer$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

};

module.exports = Thumbnails;