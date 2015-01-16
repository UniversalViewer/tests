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
};

module.exports = Eliding;