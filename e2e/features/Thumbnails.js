
var Thumbnails = function() {

    var ptor;

    this.Before(function (callback) {
        browser.ignoreSynchronization = true;

        callback();
    });

    this.When(/^they click the "([^"]*)" arrow button "([^"]*)" tab$/, function (arg1, arg2, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^they are viewing a list of thumbnails$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^they click on a thumbnail$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the corresponding image is loaded in the main Viewer$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

};

module.exports = Thumbnails;