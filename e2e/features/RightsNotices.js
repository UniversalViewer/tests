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
        callback.pending();
    });

    this.Then(/^a rights notice is shown within the More Information panel$/, function (callback) {
        if (showsteps) { console.log('Then a rights notice is shown within the More Information panel'); }
        callback.pending();
    });
};

module.exports = RightsNotices;