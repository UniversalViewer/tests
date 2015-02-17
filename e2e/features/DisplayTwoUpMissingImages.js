var ViewerPage = require("./PageObjects/ViewerPage.js");

var DisplayTwoUpMissingImages = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Then(/^a pop up is displayed to the user$/, function (arg1, callback) {
        if(showsteps) { console.log('Then a pop up is displayed to the user'); }
        vp.resetFrame(
            function() {
                vp.overlayGenericDialogueMiddleContent().then(
                    function(popupContent) {
                        popupContent.getText().then(
                            function(popupText) {
                                if(popupText.length > 0) {
                                    callback();
                                } else {
                                    callback.fail('Text not found in pop up.');
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