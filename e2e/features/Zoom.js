var ViewerPage = require("./PageObjects/ViewerPage.js");

var Zoom = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    var currentZoomLevel;

    this.When(/^they click zoom in button$/, function (callback) {
        if(showsteps) { console.log('When they click zoom in button'); }
        vp.zoomIntoImage(callback, callback);
    });

    this.Then(/^an area of the image has a bigger display$/, function (callback) {
        if(showsteps) { console.log('Then an area of the image has a bigger display'); }
        callback.pending();
    });

    this.When(/^they click zoom out button$/, function (callback) {
        if(showsteps) { console.log('When they click zoom out button'); }
        vp.zoomOutImage(callback, callback);
    });

    this.Then(/^an area of the image is seen more far away$/, function (callback) {
        if(showsteps) { console.log('Then an area of the image is seen more far away'); }
        callback.pending();
    });

    this.Given(/^the image is zoomed$/, function (callback) {
        if(showsteps) { console.log('Given the image is zoomed'); }
        vp.zoomIntoImage(callback, callback);
    });

    //this.When(/^the user press the mouse and drag the image to the right$/, function (callback) {
    //    if(showsteps) { console.log('When the user press the mouse and drag the image to the right'); }
    //    callback.pending();
    //});
    //
    //this.Then(/^that part of the image moves to the right$/, function (callback) {
    //    if(showsteps) { console.log('Then that part of the image moves to the right'); }
    //    callback.pending();
    //});

    this.When(/^the current zoom level is recorded$/, function(callback) {
        if (showsteps) { console.log('When the current zoom level is recorded'); }
        var that = this;
        vp.getZoomLevel(
            callback,
            function (zoomLevel) {
                that.currentZoomLevel = zoomLevel;
                callback();
            });
    });

    this.Then(/^the current zoom level matches that which was recorded$/, function (callback) {
        if(showsteps) { console.log('Then the current zoom level matches that which was recorded'); }
        var that = this;
        vp.getZoomLevel(
            callback,
            function(zoomLevel) {
                if(zoomLevel == that.currentZoomLevel) {
                    callback();
                } else {
                    callback.fail('current zoom level (' + currentUrl + ') did not match recorded value (' + that.currentZoomLevel + ')');
                }
            });
    });
};

module.exports = Zoom;