var ViewerPage = require("./PageObjects/ViewerPage.js");

var Thumbnails = function() {

    var ptor = browser;
    var showdebug = false;
    var showsteps = false;

    var thumbnailPanelWidth;
    var thumbnailWidth;

    this.When(/^they click in the Thumbnails tab$/, function (callback) {
        if(showsteps) { console.log("When they click in the Thumbnails tab"); }
        var that = this;
        new ViewerPage().contentsPanelExpandThumbnailsButton().then(
            function(contentsPanelExpandThumbnailsButton) {
                contentsPanelExpandThumbnailsButton.click().then(
                    callback,
                    function () {
                        callback.fail('clicking on thumbnails expand button did not work')
                    });
            }, function() {
                callback.fail('expand thumbnails button not found');
            });
    });

    this.When(/^they click in the expand arrow in the Thumbnails tab$/, function (callback) {
        if(showsteps) { console.log('When they click in the expand arrow in the Thumbnails tab'); }
        var that = this;
        new ViewerPage().contentsPanelExpandThumbnailsButton().then(
            function(contentsPanelExpandThumbnailsButton) {
                new ViewerPage().getThumbnailPanelWidth(
                    function (width) {
                        that.thumbnailPanelWidth = width;
                        contentsPanelExpandThumbnailsButton.click().then(
                            callback,
                            function () {
                                callback.fail('clicking on thumbnails expand button did not work')
                            });
                    });
            }, function() {
                callback.fail('expand thumbnails button not found');
            });
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        if(showsteps) { console.log("Then a list of thumbnails is rendered to the user"); }
        new ViewerPage().contentsPanelLoadedImages().then(
            function(thumbnailImages) {
                for(i = 0; i < 3; i++) { //checking only the three first thumbnails at the moment
                    thumbnailImages[i].getAttribute('src').then(
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
        new ViewerPage().sleep(3000).then(
            function() {
                new ViewerPage().getThumbnailPanelWidth(
                    function (size) {
                        if (size.replace('px', '') > that.thumbnailPanelWidth.replace('px', '')) {
                            callback();
                        } else {
                            callback.fail('thumbnails panel should be expanded');
                        }
                    });
            });
    });

    this.Given(/^the user is viewing the expanded thumbnails list$/, function (callback) {
        if(showsteps) { console.log('Given the user is viewing the expanded thumbnails list'); }
        new ViewerPage().contentsPanelExpandThumbnailsButton().then(
            function(expandThumbnailsButton) {
                expandThumbnailsButton.isDisplayed().then(
                    function(expandThumbnailsButtonIsDisplayed) {
                        if(expandThumbnailsButtonIsDisplayed) {
                            if(showdebug) { console.log('expand is displayed'); }
                            expandThumbnailsButton.click().then(
                                callback,
                                function() {
                                    callback.fail('clicking expand thumbnails list failed');
                                });
                        } else {
                            if(showdebug) { console.log('expand is not displayed'); }
                            // might already be in expanded view
                            new ViewerPage().contentsPanelCollapseThumbnailsButton().then(
                                function(collapseThumbnailsButton) {
                                    collapseThumbnailsButton.isDisplayed().then(
                                        function(collapseThumbnailsButtonIsDisplayed) {
                                            if(collapseThumbnailsButtonIsDisplayed) {
                                                if(showdebug) { console.log('collapse is displayed'); }
                                                callback();
                                            } else {
                                                if(showdebug) { console.log('collapse is not displayed'); }
                                                callback.fail('neither expand nor collapse is displayed');
                                            }
                                        },
                                        function() {
                                            callback.fail('expand not displayed and collapse not found');
                                        });
                                });
                        }
                    });
            });
    });

    this.When(/^they click in the contract arrow$/, function (callback) {
        if(showsteps) { console.log('When they click in the contract arrow'); }
        var that = this;
        new ViewerPage().contentsPanelCollapseThumbnailsButton().then(
            function(contentsPanelCollapseThumbnailsButton) {
                new ViewerPage().getThumbnailPanelWidth(
                    function (width) {
                        that.thumbnailPanelWidth = width;
                        contentsPanelCollapseThumbnailsButton.click().then(
                            callback,
                            function () {
                                callback.fail('clicking on thumbnails collapse button did not work')
                            });
                    });
            }, function() {
                callback.fail('collapse thumbnails button not found');
            });
    });

    this.Then(/^the list of thumbnails is contracted$/, function (callback) {
        if(showsteps) { console.log('Then the list of thumbnails is contracted'); }
        var that = this;
        new ViewerPage().sleep(3000).then(
            function() {
                new ViewerPage().getThumbnailPanelWidth(
                    function (size) {
                        if (size.replace('px', '') < that.thumbnailPanelWidth.replace('px', '')) {
                            callback();
                        } else {
                            callback.fail('thumbnails panel should be collapsed');
                        }
                    });
            });
    });

    this.When(/^they click on a thumbnail$/, function (callback) {
        if (showsteps) { console.log('When they click on a thumbnail'); }
        new ViewerPage().resetFrame(
            function () {
                new ViewerPage().contentsPanelThumbnails().then(
                    function (thumbnails) {
                        thumbnails[0].isDisplayed().then(
                            function (elementIsDisplayed) {
                                if (elementIsDisplayed) {
                                    el.click().then(
                                        callback,
                                        function() {
                                            callback.fail('clicking thumbnail failed');
                                        });
                                } else {
                                    callback.fail('first thumbnail is not visible');
                                }
                            });
                    },
                    function () {
                        callback.fail('thumbnails not found')
                    });
            });
    });

    this.When(/^they click the Increase thumbnails size button$/, function (callback) {
        if(showsteps) { console.log('When they click the Increase thumbnails size button'); }
        var that = this;
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelThumbnailIncreaseSizeButton().then(
                    function(thumbnailIncreaseSizeButton) {
                        new ViewerPage().getThumbnailWidth(
                            function(width) {
                                that.thumbnailWidth = width;
                                thumbnailIncreaseSizeButton.click().then(
                                    callback,
                                    function() {
                                        callback.fail('clicking thumbnail increase size button failed');
                                    });
                            });
                    },
                    function() {
                        callback.fail('thumbnail increase size button not found');
                    });
            });
    });

    this.Then(/^the size of the Thumbnail is increased$/, function (callback) {
        if(showsteps) { console.log('Then the size of the Thumbnail is increased'); }
        var that = this;
        new ViewerPage().sleep(2000).then(
            function() {
                new ViewerPage().getThumbnailWidth(
                    function (width) {
                        if (width > that.thumbnailWidth) {
                            callback();
                        } else {
                            callback.fail('Size of Thumbnail should be bigger than before.');
                        }
                    });
            });
    });

    this.When(/^they click the Decrease thumbnails size button$/, function (callback) {
        if(showsteps) { console.log('When they click the Decrease thumbnails size button'); }
        var that = this;
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelThumbnailDecreaseSizeButton().then(
                    function(thumbnailDecreaseSizeButton) {
                        new ViewerPage().getThumbnailWidth(
                            function(width) {
                                that.thumbnailWidth = width;
                                thumbnailDecreaseSizeButton.click().then(
                                    callback,
                                    function() {
                                        callback.fail('clicking thumbnail decrease size button failed');
                                    });
                            });
                    },
                    function() {
                        callback.fail('thumbnail decrease size button not found');
                    });
            });
    });

    this.Then(/^the size of the Thumbnail is decreased$/, function (callback) {
        if(showsteps) { console.log('Then the size of the Thumbnail is decreased'); }
        var that = this;
        new ViewerPage().sleep(2000).then(
            function() {
                new ViewerPage().getThumbnailWidth(
                    function (width) {
                        if (width < that.thumbnailWidth) {
                            callback();
                        } else {
                            callback.fail('Size of Thumbnail should be smaller than before.');
                        }
                    });
            });
    });

};

module.exports = Thumbnails;