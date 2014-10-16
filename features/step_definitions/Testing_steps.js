addStepDefinitions(function (scenario) {
    // Provide a custom World constructor. It's optional, a default one is supplied.
    scenario.World = function (callback) {
        callback();
    };

    // Define your World, here is where you can add some custom utlity functions you
    // want to use with your Cucumber step definitions, this is usually moved out
    // to its own file that you include in your Karma config
    var proto = scenario.World.prototype;
    proto.appSpecificUtilityFunction = function someHelperFunc() {
        // do some common stuff with your app
    };

    scenario.Before(function (callback) {
        // Use a custom utility function
        this.appSpecificUtilityFunction();

        callback();
    });


    var $app, $title, $thumbsTab, $indexTab, $indexPanel;

    scenario.Given(/^The player successfully loaded$/, function (callback) {
        $app = $('.wellcomePlayer iframe').contents().find('#app');

        if ($app.length){
            callback();
        } else {
            callback.fail("The player didn't load");
        }
    });

    scenario.Then(/^The title should be "([^"]*)"$/, function (arg1, callback) {
        $title = $app.find('.mainPanel .centerPanel .title span');

        if ($title.text() == "The biocrats"){
            callback();
        } else {
            callback.fail("The title wasn't 'The biocrats'");
        }
    });

    scenario.Then(/^The thumbnails tab should be open$/, function (callback) {
        $thumbsTab = $app.find('.mainPanel .leftPanel .main .tabs .tab.on');

        if ($thumbsTab.text() == "Thumbnails"){
            callback();
        } else {
            callback.fail("The thumbnails tab wasn't open");
        }
    });

    scenario.Given(/^The index tab is visible$/, function (callback) {
        $indexTab = $app.find('.mainPanel .leftPanel .main .tabs .tab.first');

        if ($indexTab.is(':visible')){
            callback();
        } else {
            callback.fail("The index tab isn't visible");
        }
    });

    scenario.When(/^the user clicks on the index tab$/, function (callback) {
        $indexTab.click();
        callback();
    });

    scenario.Then(/^the index panel appears$/, function (callback) {
        $indexPanel = $app.find('.mainPanel .leftPanel .main .tabsContent .views .treeView');

        if ($indexPanel.is(':visible')){
            callback();
        } else {
            callback.fail("The index panel isn't visible after clicking the index tab");
        }
    });

    scenario.After(function (callback) {
        callback();
    });
});
