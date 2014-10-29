addStepDefinitions(function (scenario) {
    // Provide a custom World constructor. It's optional, a default one is supplied.
    scenario.World = function (callback) {
        callback();
    };

    // Define your World, here is where you can add some custom utlity functions you
    // want to use with your Cucumber step definitions, this is usually moved out
    // to its own file that you include in your Karma config
    var proto = scenario.World.prototype;

    proto.getAppContainer = function() {
        return $('.wellcomePlayer iframe').contents().find('#app');
    };

//    this.World = require("../support/world").World;

    scenario.Before(function (callback) {
        callback();
    });

    scenario.Given(/^The player successfully loaded$/, function (callback) {
        var $app = this.getAppContainer();

        if ($app.length){
            callback();
        } else {
            callback.fail("The player didn't load");
        }
    });

    scenario.Then(/^The title should be "([^"]*)"$/, function (arg1, callback) {
        var $title = this.getAppContainer().find('.mainPanel .centerPanel .title span');

        if ($title.text() == "The biocrats"){
            callback();
        } else {
            callback.fail("The title wasn't 'The biocrats'");
        }
    });

    scenario.Then(/^The thumbnails tab should be open$/, function (callback) {
        var $thumbsTab = this.getAppContainer().find('.mainPanel .leftPanel .main .tabs .tab.on');

        if ($thumbsTab.text() == "Thumbnails"){
            callback();
        } else {
            callback.fail("The thumbnails tab wasn't open");
        }
    });

    scenario.Given(/^The index tab is visible$/, function (callback) {
        var $indexTab = this.getAppContainer().find('.mainPanel .leftPanel .main .tabs .tab.first');

        if ($indexTab.is(':visible')){
            callback();
        } else {
            callback.fail("The index tab isn't visible");
        }
    });

    scenario.When(/^the user clicks on the index tab$/, function (callback) {
        var $indexTab = this.getAppContainer().find('.mainPanel .leftPanel .main .tabs .tab.first');
        $indexTab.click();
        callback();
    });

    scenario.Then(/^the index panel appears$/, function (callback) {
        var $indexPanel = this.getAppContainer().find('.mainPanel .leftPanel .main .tabsContent .views .treeView');

        if ($indexPanel.is(':visible')){
            callback();
        } else {
            callback.fail("The index panel isn't visible after clicking the index tab");
        }
    });

    scenario.Given(/^The user is viewing the Viewer on page (\d+)$/, function(arg1, callback) {
      // express the regexp above with the code you wish you had'
      callback.pending();
    });

    scenario.When(/^they click the "([^"]*)" arrow button$/, function(arg1, callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Then(/^the content of the page (\d+) is displayed to the user$/, function(arg1, callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Given(/^the user is viewing the Viewer on page (\d+)$/, function(arg1, callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Given(/^the Viewer is on full screen mode$/, function(callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Given(/^The user is viewing the Viewer on its very first page$/, function(callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Then(/^the Previous arrow button is disabled$/, function(callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Given(/^the user is viewing the Viewer in its last page$/, function(callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.Then(/^the Next arrow is disabled$/, function(callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    scenario.After(function (callback) {
        callback();
    });
});
