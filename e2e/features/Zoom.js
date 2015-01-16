var ViewerPage = require("./PageObjects/ViewerPage.js");

var Zoom = function() {

    var ptor = browser;
    var showdebug = new ViewerPage().showdebug;
    var showsteps = new ViewerPage().showsteps;

    this.When(/^they click zoom button$/, function (callback) {
        if(showsteps) { console.log('When they click zoom button'); }
        callback.pending();
    });

    this.Then(/^an area of the image has a bigger display$/, function (callback) {
        if(showsteps) { console.log('Then an area of the image has a bigger display'); }
        callback.pending();
    });

    this.When(/^they click zoom out button$/, function (callback) {
        if(showsteps) { console.log('When they click zoom out button'); }
        callback.pending();
    });

    this.Then(/^an area of the image is seen more far away$/, function (callback) {
        if(showsteps) { console.log('Then an area of the image is seen more far away'); }
        callback.pending();
    });

    this.Given(/^the image is zoomed$/, function (callback) {
        if(showsteps) { console.log('Given the image is zoomed'); }
        callback.pending();
    });

    this.When(/^the user press the mouse and drag the image to the right$/, function (callback) {
        if(showsteps) { console.log('When the user press the mouse and drag the image to the right'); }
        callback.pending();
    });

    this.Then(/^that part of the image moves to the right$/, function (callback) {
        if(showsteps) { console.log('Then that part of the image moves to the right'); }
        callback.pending();
    });
};

module.exports = Zoom;