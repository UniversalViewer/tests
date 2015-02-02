/**
 * Created by Adam on 28/01/2015.
 */

var ViewerPage = require("./PageObjects/ViewerPage.js");

var RightsNotices = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Then(/^a rights notice is shown on the main display$/, function (callback) {
        if (showsteps) { console.log('Then a rights notice is shown on the main display'); }
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeTitle().then(
                    function(centerPanelRightsNoticeTitle) {
                        centerPanelRightsNoticeTitle.getText().then(
                            function(centerPanelRightsNoticeTitleText) {
                                if(centerPanelRightsNoticeTitleText.length > 0) {
                                    callback();
                                } else {
                                    callback.fail('centerPanelRightsNoticeTitle text was empty');
                                }
                            },
                            function() {
                                callback.fail('could not get text of centerPanelRightsNoticeTitle');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeTitle');
                    });
            });
    });

    this.Then(/^a rights notice is shown within the More Information panel$/, function (callback) {
        if (showsteps) { console.log('Then a rights notice is shown within the More Information panel'); }
        callback.pending();
    });
};

module.exports = RightsNotices;