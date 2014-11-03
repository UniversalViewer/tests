
var Zoom = function() {

    var ptor;

    this.Before(function (callback) {
        browser.ignoreSynchronization = true;

        callback();
    });

    this.When(/^they click zoom button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^an area of the image has a bigger display$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^they click zoom out button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^an area of the image is seen more far away$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the image is zoomed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the user press the mouse and drag the image to the right$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^that part of the image moves to the right$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};

module.exports = Zoom;