//TODO: Find out the reason why Thumbnails are not being called on the tests
var Thumbnails = function() {

    var ptor;


    this.Before(function (callback) {
        console.log('Thumbnails.js Before');
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });



    this.When(/^they click in the Thumbnails tab$/, function (callback) {
        console.log("When they click in the Thumbnails tab - Thumbnails.js");
        //this.switchToViewerFrame();
        //ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.linkText('Thumbnails')).then(
                function (thumb) {
                    thumb.click();
                    callback();
                },
                function () {
                    callback.fail("thumbnail tab not found");
                });
        //});
    });

    this.When(/^they click in the expand arrow in the Thumbnails tab$/, function (callback) {
        console.log('When they click in the expand arrow in the Thumbnails tab');
        this.expandThumbnailsTab(callback);
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        console.log("Then a list of thumbnails is rendered to the user - Thumbnails.js");
        //this.switchToViewerFrame();
        //ptor.sleep(3000).then(function() {
            ptor.findElements(protractor.By.css('.wrap.loaded img'))
                .then(function(thumbsimg) {
                for(i = 0; i < 3; i++){ //checking only the three first thumbnails at the moment
                    thumbsimg[i].getAttribute('src')
                        .then(function(src) {
                            if(src.substring(src.length - 4, src.length) == '.jpg')
                                callback();
                            else
                                callback.fail("image is not a jpg");
                        },
                        function() {
                            callback.fail("img src not found");
                        });
                }
                });
        //});
    });

    this.Then(/^the list of thumbnails is expanded$/, function (callback) {
        var that = this;
        console.log('Then the list of thumbnails is expanded');
        ptor.findElement(protractor.By.css('.leftPanel')) //or .thumbsView?
            .then(function (el) {
                el.getCssValue('width')
                    .then(function(w){
                        var tlw = that.getThumbsListWidth();
                        console.log('thumbsListWidth ' + tlw);
                        if (w.replace('px','') > tlw.replace('px','')){
                            callback();
                        }
                        else{
                            callback.fail('thumbnails should be expanded');
                        }
                    });
            });
    });

    this.Given(/^the user is viewing the expanded thumbnails list$/, function (callback) {
        console.log('Given the user is viewing the expanded thumbnails list');
        this.expandThumbnailsTab(callback);

    });

    this.When(/^they click in the contract arrow$/, function (callback) {
        console.log('When they click in the contract arrow');
        this.contractLeftPanelArrow(callback);
    });

    this.Then(/^the list of thumbnails is contracted$/, function (callback) {
        console.log('Then the list of thumbnails is contracted');
        var that = this;
        console.log("0");
        ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.css('.leftPanel')) //or .thumbsView?
                .then(function (el) {
                    console.log("1");
                    el.getCssValue('width')
                        .then(function (w) {
                            console.log("2");
                            var tlw = that.getThumbsListWidth();
                            console.log("3");
                            console.log('thumbsListWidth ' + tlw);
                            console.log("4");
                            if (w.replace('px', '') < tlw.replace('px', '')) {
                                console.log("5");
                                callback();
                            }
                            else {
                                console.log("6");
                                callback.fail('thumbnails should be expanded');
                            }
                        });
                });
        });
    });

    this.When(/^they click on a thumbnail$/, function (callback) {
        console.log('When they click on a thumbnail');
        ptor.sleep(3000).then(function() {
            ptor.findElements(protractor.By.css('.thumb'))
                .then(
                function (els) {
                    console.log('thumb 2' + els[2]);
                    els.forEach(function(el){
                        el.isDisplayed().then(function(elementIsDisplayed){
                            if(elementIsDisplayed){
                                el.click().then(function () {
                                    callback();
                                });
                            }
                        });
                    });
                },
                function () {
                    callback.fail('loaded thumbnails not found.');
                }
            );
        });
    });

    //this.Given(/^they are viewing a list of thumbnails$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^they click on a thumbnail$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Then(/^the corresponding image is loaded in the main Viewer$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});

    this.When(/^they click the Increase thumbnails size button$/, function (callback) {
        console.log('When they click the Increase thumbnails size button');
        function click(){
            ptor.findElement(protractor.By.css('.btn.btn-default.size-up'))
                .then(function(upBtn){
                    console.log('will click');
                    upBtn.click().then(function(){
                        console.log('clicked');
                        callback();
                    });
                });
        }
        this.SetThumbnailSizeWithCurrent(click);
    });

    this.Then(/^the size of the Thumbnail is increased$/, function (callback) {
        var that = this;
        console.log('Then the size of the Thumbnail is increased');
        function compareCurrent(current) {
            console.log('start compareCurrent');
            var old = that.getThumbnailSize();
            console.log('old' + old);
            if (current.width > old.width && current.height > old.height) {
                callback();
            } else {
                callback.fail('Size of Thumbnail should be bigger than before.');
            }
        }
        ptor.sleep(6000).then(function() {
            that.GetCurrentThumbnailSize(compareCurrent);
        });
    });

    this.When(/^they click the Decrease thumbnails size button$/, function (callback) {
        function click(){
            ptor.findElement(protractor.By.css('.btn.btn-default.size-down'))
                .then(function(upBtn){
                    console.log('will click');
                    upBtn.click().then(function(){
                        console.log('clicked');
                        callback();
                    });
                });
        }
        this.SetThumbnailSizeWithCurrent(click);
    });

    this.Then(/^the size of the Thumbnail is decreased$/, function (callback) {
        var that = this;
        function compareCurrent(current) {
            var old = that.getThumbnailSize();
            if (current.width < old.width && current.height < old.height) {
                callback();
            } else {
                callback.fail('Size of Thumbnail should be bigger than before.');
            }
        }
        ptor.sleep(1000).then(function() {
            that.GetCurrentThumbnailSize(compareCurrent);
        });
    });



};

module.exports = Thumbnails;