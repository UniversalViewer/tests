var ViewerPage = require('./PageObjects/ViewerPage.js');

var Eliding = function() {

    var ptor = browser;
    var showdebug = new ViewerPage().showdebug;
    var showsteps = new ViewerPage().showsteps;

    this.Then(/^they see that a long title is elided appropriately$/, function (callback) {
        if(showsteps) { console.log('Then they see that a long title is elided appropriately'); }
        var that = this;
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTabItems().then(
                    function(contentsPanelIndexTabItems) {
                        contentsPanelIndexTabItems[1].getText().then(
                            function(indexItemText) {
                                if(that.endsWith(indexItemText, '…')) {
                                    callback();
                                } else {
                                    callback.fail('could not find ellipsis character');
                                }
                            },
                            function() {
                                callback.fail('could not get text of index item');
                            });
                    },
                    function() {
                        callback.fail('could not find contents panel index items');
                    });
            });
    });

    this.Then(/^they see that a long title has a tooltip that is elided appropriately$/, function(callback) {
        if(showsteps) { console.log('Then they see that a long title has a tooltip that is elided appropriately'); }
        var that = this;
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().contentsPanelIndexTabItemAnchors().then(
                    function(contentsPanelIndexTabItemAnchors) {
                        contentsPanelIndexTabItemAnchors[1].getText().then(
                            function(indexItemText) {
                                if(that.endsWith(indexItemText, '…')) {
                                    if(that.showdebug) { console.log('found ellipsis on visible text'); }
                                    contentsPanelIndexTabItemAnchors[1].getAttribute('title').then(
                                        function(titleText) {
                                            if(titleText.length > indexItemText.length) {
                                                if(that.showdebug) { console.log('title text is longer than visible text'); }
                                                callback();
                                            } else {
                                                callback.fail('title text for long title is shorter or equal to visible text');
                                            }
                                        });
                                } else {
                                    callback.fail('could not find ellipsis character on visible text of long title');
                                }
                            },
                            function() {
                                callback.fail('could not get text of index item');
                            });
                    },
                    function() {
                        callback.fail('could not find contents panel index items');
                    });
            });
    });
};

module.exports = Eliding;