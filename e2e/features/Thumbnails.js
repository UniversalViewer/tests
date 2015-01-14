//TODO: Find out the reason why Thumbnails are not being called on the tests
var ViewerPage = require("./PageObjects/ViewerPage.js");

var Thumbnails = function() {

    var ptor = browser;
    var showdebug = false;
    var showsteps = false;

    var thumbnailPanelSize;

    this.When(/^they click in the Thumbnails tab$/, function (callback) {
        if(showsteps) { console.log("When they click in the Thumbnails tab - Thumbnails.js"); }
        callback.pending();
    });

    this.When(/^they click in the expand arrow in the Thumbnails tab$/, function (callback) {
        if(showsteps) { console.log('When they click in the expand arrow in the Thumbnails tab'); }
        var that = this;
        element(protractor.By.css('.leftPanel > .top > .expandFullButton'))
            .then(
            function(e) {
                new ViewerPage()
                    .getThumbnailPanelWidth(
                    function (size) {
                        that.thumbnailPanelSize = size;
                        e.click().then(
                            callback,
                            function () {
                                callback.fail('clicking on thumbnails expand button did not work')
                            });
                    });
            }, function() {
                callback.fail('.expandFullButton not found');
            });
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        if(showsteps) { console.log("Then a list of thumbnails is rendered to the user - Thumbnails.js"); }
        ptor.findElements(protractor.By.css('.wrap.loaded img'))
            .then(function(thumbsimg) {
                for(i = 0; i < 3; i++) { //checking only the three first thumbnails at the moment
                    thumbsimg[i].getAttribute('src')
                        .then(
                        function(src) {
                            if(src.substring(src.length - 4, src.length) == '.jpg') {
                                callback();
                            } else {
                                callback.fail("image is not a jpg");
                            }
                        },
                        function() {
                            callback.fail("img src not found");
                        });
                }
            });
    });

    this.Then(/^the list of thumbnails is expanded$/, function (callback) {
        if(showsteps) { console.log('Then the list of thumbnails is expanded'); }
        var that = this;
        ptor.sleep(3000).then(
            function() {
                new ViewerPage()
                    .resetFrame(
                    function () {
                        new ViewerPage()
                            .getThumbnailPanelWidth(
                            function (size) {
                                if (size.replace('px', '') > that.thumbnailPanelSize.replace('px', '')) {
                                    callback();
                                } else {
                                    callback.fail('thumbnails panel should be expanded');
                                }
                            });
                    });
            });
    });

    this.Given(/^the user is viewing the expanded thumbnails list$/, function (callback) {
        if(showsteps) { console.log('Given the user is viewing the expanded thumbnails list'); }
        new ViewerPage()
            .expandThumbnailsTab(callback);
    });

    this.When(/^they click in the contract arrow$/, function (callback) {
        if(showsteps) { console.log('When they click in the contract arrow'); }
        callback.pending();
    });

    this.Then(/^the list of thumbnails is contracted$/, function (callback) {
        if(showsteps) { console.log('Then the list of thumbnails is contracted'); }
        callback.pending();
    });

    this.When(/^they click on a thumbnail$/, function (callback) {
        if(showsteps) { console.log('When they click on a thumbnail'); }
        callback.pending();
    });

    this.When(/^they click the Increase thumbnails size button$/, function (callback) {
        if(showsteps) { console.log('When they click the Increase thumbnails size button'); }
        element(protractor.By.css('.btn.btn-default.size-up'))
            .then(function(upBtn){
                upBtn.click().then(callback);
            });
    });

    this.Then(/^the size of the Thumbnail is increased$/, function (callback) {
        if(showsteps) { console.log('Then the size of the Thumbnail is increased'); }
        callback.pending();
    });

    this.When(/^they click the Decrease thumbnails size button$/, function (callback) {
        if(showsteps) { console.log('When they click the Decrease thumbnails size button'); }
        callback.pending();
    });

    this.Then(/^the size of the Thumbnail is decreased$/, function (callback) {
        if(showsteps) { console.log('Then the size of the Thumbnail is decreased'); }
        callback.pending();
    });

};

var Thumbnails_old = function() {

    var ptor = protractor.getInstance();

    this.When(/^they click in the Thumbnails tab$/, function (callback) {
        console.log("When they click in the Thumbnails tab - Thumbnails.js");
            ptor.findElement(protractor.By.linkText('Thumbnails')).then(
                function (thumb) {
                    thumb.click();
                    callback();
                },
                function () {
                    callback.fail("thumbnail tab not found");
                });
    });

    this.When(/^they click in the expand arrow in the Thumbnails tab$/, function (callback) {
        console.log('When they click in the expand arrow in the Thumbnails tab');
        this.expandThumbnailsTab(callback);
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        console.log("Then a list of thumbnails is rendered to the user - Thumbnails.js");
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
            }, function() {
                callback.fail('leftPanel not found');
            }
        );
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
                    el.getCssValue('width')
                        .then(function (w) {
                            var tlw = that.getThumbsListWidth();
                            if (w.replace('px', '') < tlw.replace('px', '')) {
                                callback();
                            }
                            else {
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
                    upBtn.click().then(function(){
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
            var old = that.getThumbnailSize();
            if (current.width > old.width && current.height > old.height) {
                callback();
            } else {
                callback.fail('Size of Thumbnail should be bigger than before.');
            }
        }
        ptor.sleep(1000).then(function() {
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