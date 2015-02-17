var ViewerPage = require("./PageObjects/ViewerPage.js");

var Embedding = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.When(/^they choose to see the embedding options$/, function(callback) {
        if(showsteps) { console.log('When they choose to see the embedding options'); }
        vp.resetFrame(
            function() {
                vp.embedButton().then(
                    function(embedButton) {
                        embedButton.click().then(
                            callback,
                            function() {
                                callback.fail('could not click embedButton');
                            });
                    },
                    function() {
                        callback.fail('could not find embedButton');
                    });
            });
    });
};

module.exports = Embedding;
