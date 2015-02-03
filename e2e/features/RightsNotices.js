/**
 * Created by Adam on 28/01/2015.
 */

var ViewerPage = require("./PageObjects/ViewerPage.js");

var RightsNotices = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    var originalAttributionTextLength;

    this.When(/^they click the More button in the initial rights notice$/, function(callback) {
        if (showsteps) { console.log('When they click the More button in the initial rights notice'); }
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttributionMoreButton().then(
                    function(centerPanelRightsNoticeAttributionMoreButton) {
                        centerPanelRightsNoticeAttributionMoreButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click centerPanelRightsNoticeAttributionMoreButton');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeAttributionMoreButton');
                    });
            });
    });

    this.Given(/^they have clicked on the More button in the initial rights notice$/, function(callback) {
        if (showsteps) { console.log('Given they have clicked on the More button in the initial rights notice'); }
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttributionMoreButton().then(
                    function(centerPanelRightsNoticeAttributionMoreButton) {
                        if (showdebug) { console.log('found more toggle button'); }
                        centerPanelRightsNoticeAttributionMoreButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click centerPanelRightsNoticeAttributionMoreButton');
                            });
                    },
                    function() {
                        if (showdebug) { console.log('could not find more toggle button'); }
                        vp.centerPanelRightsNoticeAttributionLessButton().then(
                            function(centerPanelRightsNoticeAttributionLessButton) {
                                if(showdebug) { console.log('found less button so must be in more mode already'); }
                                callback();
                            },
                            function() {
                                callback.fail('could not find more or less toggle button');
                            });
                    });
            });
    });

    this.When(/^they click the Less button in the initial rights notice$/, function(callback) {
        if (showsteps) { console.log('When they click the Less button in the initial rights notice'); }
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttributionLessButton().then(
                    function(centerPanelRightsNoticeAttributionLessButton) {
                        centerPanelRightsNoticeAttributionLessButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click centerPanelRightsNoticeAttributionLessButton');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeAttributionLessButton');
                    });
            });
    });

    this.Given(/^the full text of the initial rights notice is displayed and recorded$/, function(callback) {
        if (showsteps) { console.log('Given the full text of the initial rights notice is displayed and recorded'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttribution().then(
                    function(centerPanelRightsNoticeAttribution) {
                        centerPanelRightsNoticeAttribution.getText().then(
                            function(centerPanelRightsNoticeAttributionText) {
                                that.originalAttributionTextLength = centerPanelRightsNoticeAttributionText.length;
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                callback();
                            },
                            function() {
                                callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeAttribution');
                    });
            });
    });

    this.Then(/^the full text of the initial rights notice is displayed$/, function(callback) {
        if (showsteps) { console.log('Then the full text of the initial rights notice is displayed'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttribution().then(
                    function(centerPanelRightsNoticeAttribution) {
                        centerPanelRightsNoticeAttribution.getText().then(
                            function(centerPanelRightsNoticeAttributionText) {
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                if(showdebug) { console.log('current attribution text length = ' + centerPanelRightsNoticeAttributionText.length); }
                                if(centerPanelRightsNoticeAttributionText.length > that.originalAttributionTextLength) {
                                    callback();
                                } else {
                                    callback.fail('text in attribution panel was not longer');
                                }
                            },
                            function() {
                                callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeAttribution');
                    });
            });
    });

    this.Given(/^the partial text of the initial rights notice is displayed and recorded$/, function(callback) {
        if (showsteps) { console.log('Given the partial text of the initial rights notice is displayed and recorded'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttribution().then(
                    function(centerPanelRightsNoticeAttribution) {
                        centerPanelRightsNoticeAttribution.getText().then(
                            function(centerPanelRightsNoticeAttributionText) {
                                // record the current length of the attribution text for later
                                that.originalAttributionTextLength = centerPanelRightsNoticeAttributionText.length;
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                vp.resetFrame(
                                    function() {
                                        vp.centerPanelRightsNoticeAttributionMoreToggle().then(
                                            function(centerPanelRightsNoticeAttributionMoreToggle) {
                                                callback();
                                            },
                                            function() {
                                                callback.fail('could not find centerPanelRightsNoticeAttributionMoreToggle');
                                            });
                                    });
                            },
                            function() {
                                callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeAttribution');
                    });
            });
    });

    this.Then(/^the partial text of the initial rights notice is displayed$/, function(callback) {
        if (showsteps) { console.log('Then the partial text of the initial rights notice is displayed'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.centerPanelRightsNoticeAttribution().then(
                    function(centerPanelRightsNoticeAttribution) {
                        centerPanelRightsNoticeAttribution.getText().then(
                            function(centerPanelRightsNoticeAttributionText) {
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                if(showdebug) { console.log('current attribution text length = ' + centerPanelRightsNoticeAttributionText.length); }
                                if(centerPanelRightsNoticeAttributionText.length < that.originalAttributionTextLength) {
                                    callback();
                                } else {
                                    callback.fail('text in attribution panel was not shorter');
                                }
                            },
                            function() {
                                callback.fail('could not get text of centerPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find centerPanelRightsNoticeAttribution');
                    });
            });
    });

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

    this.Then(/^a rights notice is shown within the MORE INFORMATION panel$/, function (callback) {
        if (showsteps) { console.log('Then a rights notice is shown within the MORE INFORMATION panel'); }
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeTitle().then(
                    function(moreInformationPanelRightsNoticeTitle) {
                        moreInformationPanelRightsNoticeTitle.getText().then(
                            function(moreInformationPanelRightsNoticeTitleText) {
                                if(moreInformationPanelRightsNoticeTitleText.length > 0) {
                                    callback();
                                } else {
                                    callback.fail('moreInformationPanelRightsNoticeTitle text was empty');
                                }
                            },
                            function() {
                                callback.fail('could not get text of moreInformationPanelRightsNoticeTitle');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeTitle');
                    });
            });
    });

    this.When(/^the partial text of the MORE INFORMATION panel rights notice is displayed and recorded$/, function(callback) {
        if(showsteps) { console.log('When the partial text of the MORE INFORMATION panel rights notice is displayed and recorded'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttribution().then(
                    function(moreInformationPanelRightsNoticeAttribution) {
                        moreInformationPanelRightsNoticeAttribution.getText().then(
                            function(moreInformationPanelRightsNoticeAttributionText) {
                                // record the current length of the attribution text for later
                                that.originalAttributionTextLength = moreInformationPanelRightsNoticeAttributionText.length;
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                vp.resetFrame(
                                    function() {
                                        vp.moreInformationPanelRightsNoticeToggle().then(
                                            function(moreInformationPanelRightsNoticeToggle) {
                                                callback();
                                            },
                                            function() {
                                                callback.fail('could not find moreInformationPanelRightsNoticeToggle');
                                            });
                                    });
                            },
                            function() {
                                callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                    });
            });
    });

    this.When(/^they click the More button in the MORE INFORMATION panel rights notice$/, function(callback) {
        if (showsteps) { console.log('When they click the More button in the MORE INFORMATION panel rights notice'); }
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttributionMoreButton().then(
                    function(moreInformationPanelRightsNoticeAttributionMoreButton) {
                        moreInformationPanelRightsNoticeAttributionMoreButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click moreInformationPanelRightsNoticeAttributionMoreButton');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeAttributionMoreButton');
                    });
            });
    });

    this.Then(/^the full text of the MORE INFORMATION panel rights notice is displayed$/, function(callback) {
        if (showsteps) { console.log('Then the full text of the MORE INFORMATION panel rights notice is displayed'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttribution().then(
                    function(moreInformationPanelRightsNoticeAttribution) {
                        moreInformationPanelRightsNoticeAttribution.getText().then(
                            function(moreInformationPanelRightsNoticeAttributionText) {
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                if(showdebug) { console.log('current attribution text length = ' + moreInformationPanelRightsNoticeAttributionText.length); }
                                if(moreInformationPanelRightsNoticeAttributionText.length > that.originalAttributionTextLength) {
                                    callback();
                                } else {
                                    callback.fail('text in attribution panel was not longer');
                                }
                            },
                            function() {
                                callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                    });
            });
    });

    this.Given(/^they have clicked MORE INFORMATION$/, function(callback) {
        if (showsteps) { console.log('Given they have clicked MORE INFORMATION'); }
        vp.clickMoreInformation(callback);
    });

    this.Given(/^they have clicked the More button in the MORE INFORMATION panel rights notice$/, function(callback) {
        if (showsteps) { console.log('Given they have clicked the More button in the MORE INFORMATION panel rights notice'); }
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttributionMoreButton().then(
                    function(moreInformationPanelRightsNoticeAttributionMoreButton) {
                        if (showdebug) { console.log('found more toggle button'); }
                        moreInformationPanelRightsNoticeAttributionMoreButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click moreInformationPanelRightsNoticeAttributionMoreButton');
                            });
                    },
                    function() {
                        if (showdebug) { console.log('could not find more toggle button'); }
                        vp.moreInformationPanelRightsNoticeAttributionLessButton().then(
                            function(moreInformationPanelRightsNoticeAttributionLessButton) {
                                if(showdebug) { console.log('found less button so must be in more mode already'); }
                                callback();
                            },
                            function() {
                                callback.fail('could not find more or less toggle button');
                            });
                    });
            });
    });

    this.Given(/^the full text of the MORE INFORMATION panel rights notice is displayed and recorded$/, function(callback) {
        if (showsteps) { console.log('Given the full text of the MORE INFORMATION panel rights notice is displayed and recorded'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttribution().then(
                    function(moreInformationPanelRightsNoticeAttribution) {
                        moreInformationPanelRightsNoticeAttribution.getText().then(
                            function(moreInformationPanelRightsNoticeAttributionText) {
                                that.originalAttributionTextLength = moreInformationPanelRightsNoticeAttributionText.length;
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                callback();
                            },
                            function() {
                                callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                    });
            });
    });

    this.When(/^they click the Less button in the MORE INFORMATION panel rights notice$/, function(callback) {
        if (showsteps) { console.log('When they click the Less button in the MORE INFORMATION panel rights notice'); }
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttributionLessButton().then(
                    function(moreInformationPanelRightsNoticeAttributionLessButton) {
                        moreInformationPanelRightsNoticeAttributionLessButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click moreInformationPanelRightsNoticeAttributionLessButton');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeAttributionLessButton');
                    });
            });
    });

    this.Then(/^the partial text of the MORE INFORMATION panel rights notice is displayed$/, function(callback) {
        if (showsteps) { console.log('Then the partial text of the MORE INFORMATION panel rights notice is displayed'); }
        var that = this;
        vp.resetFrame(
            function() {
                vp.moreInformationPanelRightsNoticeAttribution().then(
                    function(moreInformationPanelRightsNoticeAttribution) {
                        moreInformationPanelRightsNoticeAttribution.getText().then(
                            function(moreInformationPanelRightsNoticeAttributionText) {
                                if(showdebug) { console.log('original attribution text length = ' + that.originalAttributionTextLength); }
                                if(showdebug) { console.log('current attribution text length = ' + moreInformationPanelRightsNoticeAttributionText.length); }
                                if(moreInformationPanelRightsNoticeAttributionText.length < that.originalAttributionTextLength) {
                                    callback();
                                } else {
                                    callback.fail('text in attribution panel was not shorter');
                                }
                            },
                            function() {
                                callback.fail('could not get text of moreInformationPanelRightsNoticeAttribution');
                            });
                    },
                    function() {
                        callback.fail('could not find moreInformationPanelRightsNoticeAttribution');
                    });
            });
    });
};

module.exports = RightsNotices;