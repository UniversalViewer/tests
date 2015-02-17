var ViewerPage = require("./PageObjects/ViewerPage.js");

var DisplayTwoUpPerfect = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Then(/^two pages are displayed to the user$/, function (callback) {
        if (showsteps) {
            console.log('Then two pages are displayed to the user');
        }
        vp.resetFrame(
            function () {
                vp.contentsPanelNonExpandedSelectedLoadedThumbnails().then(
                    function (contentsPanelSelectedLoadedThumbnails) {
                        if (contentsPanelSelectedLoadedThumbnails.length == 2) {
                            callback();
                        } else {
                            callback.fail('2 thumbnails should be selected');
                        }
                    },
                    function () {
                        callback.fail('could not find contents panel selected loaded thumbnails')
                    });
            });
    });
};

module.exports = DisplayTwoUpPerfect;