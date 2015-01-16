var ViewerPage = require("./PageObjects/ViewerPage.js");

var DisplayTwoUpMissingImages = function() {

    var ptor = browser;
    var showdebug = new ViewerPage().showdebug;
    var showsteps = new ViewerPage().showsteps;

    this.Then(/^an "([^"]*)" pop up is displayed to the user$/, function (arg1, callback) {
        if(showsteps) { console.log('Then an ' + arg1 + ' pop up is displayed to the user'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().overlayGenericDialogueMiddleContent().then(
                    function(popupContent) {
                        popupContent.getText().then(
                            function(popupText) {
                                if(popupText.indexOf(arg1) > -1) {
                                    callback();
                                } else {
                                    callback.fail('Text ' + arg1 + ' not found in pop up.');
                                }
                            },
                            function() {
                                callback.fail('could not get text of overlay generic dialogue middle content');
                            });
                    },
                    function(){
                        callback.fail('Pop up not found.');
                    });
            });
    });

};

module.exports = DisplayTwoUpMissingImages;
