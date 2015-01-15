/**
 * Created by jenniferstrejevitch on 06/01/2015.
 */

var ViewerPage = require('./PageObjects/ViewerPage.js');

var HierarchicalIndex = function() {

    var ptor = browser;
    var showdebug = false;
    var showsteps = false;

    this.Given(/^The user is Viewing the books index$/, function (callback) {
        if(showsteps) { console.log('Given the user is Viewing the books index'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTab().then(
                    function (contentsPanelIndexTab) {
                        contentsPanelIndexTab.click().then(
                            function () {
                                new ViewerPage().contentsPanelIndexTabActivated().then(
                                    function() {
                                        callback();
                                    },
                                    function() {
                                        callback.fail('contents panel active index tab not found');
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
        if(showsteps) { console.log('When the user click on the expand view button'); }
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

};

module.exports = HierarchicalIndex;