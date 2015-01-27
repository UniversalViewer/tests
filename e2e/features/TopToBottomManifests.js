/**
 * Created by Adam on 26/01/2015.
 */

var ViewerPage = require("./PageObjects/ViewerPage.js");

var TopToBottomManifests = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Then(/^the first thumbnail of a top to bottom manifest is selected$/, function (callback) {
        if (showsteps) { console.log('Then the first thumbnail of a top to bottom manifest is selected'); }
        vp.resetFrame(
            function() {
                vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabel().then(
                    function(label) {
                        label.getText().then(
                            function(text) {
                                text = text.replace(/ /g, '');
                                if(text == '1r') {
                                    callback();
                                } else {
                                    callback.fail('selected thumbnail is not first recto page');
                                }
                            },
                            function()
                            {
                                callback.fail('could not get text of selected thumbnail label');
                            });
                    },
                    function() {
                        callback.fail('could not get selected loaded thumbnail label')
                    });
            });
    });

    this.Then(/^the second and third thumbnails of a top to bottom manifest are selected$/, function(callback) {
        if(showsteps) { console.log('Then the second and third thumbnails of a top to bottom manifest are selected'); }
        vp.resetFrame(
            function () {
                vp.contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                    function (contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                        if (contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                            contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                function(text1) {
                                    text1 = text1.replace(/ /g,'');
                                    if(showdebug) { console.log('found label (' + text1 + ')'); }
                                    if(text1 == '1v' || text1 == '2r') {
                                        contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                            function(text2) {
                                                text2 = text2.replace(/ /g,'');
                                                if(showdebug) { console.log('found label (' + text2 + ')'); }
                                                if(text2 == '1v' || text2 == '2r') {
                                                    callback();
                                                } else {
                                                    callback.fail('incorrect page selected (' + text2 + ')');
                                                }
                                            },
                                            function() {
                                                callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                            }
                                        );
                                    } else {
                                        callback.fail('incorrect page selected (' + text1 + ')');
                                    }
                                },
                                function() {
                                    callback.fail('could not get text of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                });
                        } else {
                            callback.fail('2 thumbnails should be selected');
                        }
                    },
                    function () {
                        callback.fail('could not find contents panel selected loaded thumbnails')
                    });
            });
    });

    this.Then(/^the second and third thumbnails of a top to bottom manifest are arranged correctly$/, function(callback) {
        if(showsteps) { console.log('Then the second and third thumbnails of a top to bottom manifest are arranged correctly'); }
        vp.resetFrame(
            function() {
                new ViewerPage().contentsPanelNonExpandedSelectedLoadedThumbnailLabels().then(
                    function(contentsPanelNonExpandedSelectedLoadedThumbnailLabels) {
                        if(contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length == 2) {
                            contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getText().then(
                                function(text1) {
                                    text1 = text1.replace(/ /g, '');
                                    contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getText().then(
                                        function(text2) {
                                            text2 = text2.replace(/ /g, '');
                                            contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0].getLocation().then(
                                                function(location1) {
                                                    contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1].getLocation().then(
                                                        function(location2) {
                                                            var page2r, page1v;
                                                            if(text1 == '2r') {
                                                                page2r = location1.y;
                                                                page1v = location2.y;
                                                            } else {
                                                                page2r = location2.y;
                                                                page1v = location1.y;
                                                            }
                                                            if(page2r > page1v) {
                                                                callback();
                                                            } else {
                                                                callback.fail('page 2r is not below page 1v');
                                                            }
                                                        },
                                                        function() {
                                                            callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                                        });
                                                },
                                                function() {
                                                    callback.fail('could not get location of contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                                });
                                        },
                                        function() {
                                            callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[1]');
                                        });
                                },
                                function() {
                                    callback.fail('could not get text from contentsPanelNonExpandedSelectedLoadedThumbnailLabels[0]');
                                });
                        } else {
                            callback.fail('not enough thumbnails selected (should be 2, got ' + contentsPanelNonExpandedSelectedLoadedThumbnailLabels.length + ')');
                        }
                    });
            });
    });
};

module.exports = TopToBottomManifests;