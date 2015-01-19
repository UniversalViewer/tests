/**
 * Created by jenniferstrejevitch on 06/01/2015.
 */

var ViewerPage = require('./PageObjects/ViewerPage.js');

var HierarchicalIndex = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Given(/^The user is Viewing the books index$/, function (callback) {
        if(showsteps) { console.log('Given the user is Viewing the books index'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTab().then(
                    function (contentsPanelIndexTab) {
                        if(showdebug) { console.log('found index tab'); }
                        if(showdebug) { console.log('clicking index tab'); }
                        contentsPanelIndexTab.click().then(
                            function () {
                                if(showdebug) { console.log('clicked index tab'); }
                                new ViewerPage().resetFrame(
                                    function() {
                                        var vp = new ViewerPage();
                                        vp.sleep(vp.reactionDelay).then(
                                            function() {
                                                new ViewerPage().contentsPanelIndexTabActivated().then(
                                                    function(contentsPanelIndexTabActivated) {
                                                        if(showdebug) { console.log('found active index tab'); }
                                                        callback();
                                                    },
                                                    function() {
                                                        callback.fail('contents panel active index tab not found');
                                                    });
                                            });
                                    });
                            },
                            function() {
                                callback.fail('clicking on contents panel index tab failed');
                            });
                    },
                    function() {
                        callback.fail('contents panel index tab not found');
                    });
            });
    });

    this.Then(/^they see an expandable tree view$/, function (callback) {
        if(showsteps) { console.log('Then they see an expandable tree view'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTabTreeExpansionToggles().then(
                    function(toggles) {
                        if(toggles.length > 0) {
                            callback();
                        } else {
                            callback.fail('Hierarchy not found (test found zero length array of toggle components)');
                        }
                    },
                    function() {
                        callback.fail('Hierarchy not found');
                    });
            });
    });

    this.When(/^the user click on the expand view button$/, function (callback) {
        if (showsteps) { console.log('When the user click on the expand view button'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTabTreeExpansionToggles().then(
                    function (toggles){
                        toggles[0].click().then(
                            callback,
                            function() {
                                callback.fail('clicking contents panel expand tree toggle failed');
                            });
                    },
                    function() {
                        callback.fail('could not find contents panel index tab tree expansion toggles');
                    });
            });
    });

    this.Then(/^the index appears indented$/, function (callback) {
        if(showsteps) { console.log('Then the index appears indented'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTabSubTrees().then(
                    function(contentsPanelIndexTabSubTrees) {
                        if (contentsPanelIndexTabSubTrees.length > 0) {
                            callback();
                        } else {
                            callback.fail('Indentation not found (zero length list of ul components)');
                        }
                    },
                    function() {
                        callback.fail('Indentation not found');
                    });
            });
    });

    this.When(/^the user expands the whole hierarchy$/, function(callback) {
        if(showsteps) { console.log('When the user expands the whole hierarchy'); }
        new ViewerPage().recursivelyExpandIndexItems(callback);
    });

    this.Then(/^they see no more expand view buttons$/, function(callback) {
        if(showsteps) { console.log('Then they see no more expand view buttons'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTabTreeExpandedToggles().then(
                    function(contentsPanelIndexTabTreeExpandedToggles) {
                        new ViewerPage().contentsPanelIndexTabTreeExpansionToggles().then(
                            function(contentsPanelIndexTabTreeExpansionToggles) {
                                if(contentsPanelIndexTabTreeExpansionToggles.length > contentsPanelIndexTabTreeExpandedToggles.length) {
                                    callback.fail('still seeing toggles left to expand');
                                } else {
                                    // empty list - success
                                    callback();
                                }
                            },
                            function() {
                                callback.fail('could not find any expansion toggles');
                            });
                    },
                    // no elements found - success
                    callback
                );
            });
    });

};

module.exports = HierarchicalIndex;