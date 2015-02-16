var ViewerPage = require("./PageObjects/ViewerPage.js");

var Contents = function() {

    var ptor = browser;
    var vp = new ViewerPage();

    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Given(/^the CONTENTS panel is visible$/, function(callback) {
        if(showsteps) { console.log('Given the CONTENTS panel is visible'); }
        vp.clickContents(callback);
    });

    this.Given(/^the CONTENTS panel is collapsed$/, function(callback) {
        if(showsteps) { console.log('Given the CONTENTS panel is collapsed$'); }
        vp.clickContentsCollapse(callback, callback);
    });

    this.Then(/^the CONTENTS panel is visible to the user$/, function(callback) {
        if(showsteps) { console.log('Then the CONTENTS panel is visible to the user'); }
        vp.resetFrame(
            function() {
                vp.contentsPanelCollapseThumbnailsButton().then(
                    function(contentsPanelCollapseThumbnailsButton) {
                        contentsPanelCollapseThumbnailsButton.isDisplayed().then(
                            function (contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                if (contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                    callback();
                                } else {
                                    callback.fail('contentsPanelCollapseThumbnailsButton is not displayed');
                                }
                            });
                    },
                    function() {
                        callback.fail('could not find contentsPanelCollapseThumbnailsButton');
                    });
            });
    });

    this.Then(/^the CONTENTS panel is not visible to the user$/, function(callback) {
        if(showsteps) { console.log('Then the CONTENTS panel is not visible to the user'); }
        vp.resetFrame(
            function() {
                vp.contentsPanelCollapseThumbnailsButton().then(
                    function(contentsPanelCollapseThumbnailsButton) {
                        contentsPanelCollapseThumbnailsButton.isDisplayed().then(
                            function (contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                if (!contentsPanelCollapseThumbnailsButtonIsDisplayed) {
                                    callback();
                                } else {
                                    callback.fail('contentsPanelCollapseThumbnailsButton is displayed');
                                }
                            });
                    },
                    function() {
                        callback.fail('could not find contentsPanelCollapseThumbnailsButton');
                    });
            });
    });
};

module.exports = Contents;