var ViewerPage = require("./PageObjects/ViewerPage.js");

var Navigation = function() {

    var ptor = browser;
    var vp = new ViewerPage();
    var showdebug = vp.showdebug;
    var showsteps = vp.showsteps;

    this.Given(/^the user is viewing the Viewer on page (\d+)$/, function (arg1, callback) {
        if(showsteps) { console.log('Given the user is viewing the Viewer on page ' + arg1); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().searchText().then(
                    function (searchText) {
                        searchText.clear();
                        searchText.sendKeys(arg1);
                        new ViewerPage().resetFrame(
                            function() {
                                new ViewerPage().goButton().then(
                                    function (go) {
                                        go.click().then(
                                            callback,
                                            function() {
                                                callback.fail('could not click go button');
                                            });
                                    },
                                    function () {
                                        callback.fail("button go not found");
                                    });
                            });
                    },
                    function () {
                        callback.fail("search text box not found");
                    });
            });
    });

    this.When(/^they click the Next arrow button$/, function (callback) {
        if(showsteps) { console.log('When they click the Next arrow button - Navigation.js'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().navigationNextButton().then(
                    function(nextButton) {
                        nextButton.click().then(
                            callback,
                            function() {
                                callback.fail('clicking next failed');
                            });
                    },
                    function(){
                        callback.fail("button next not found");
                    });
            });
    });

    this.When(/^they click the Previous arrow button$/, function (callback) {
        if(showsteps) { console.log('When they click the Previous arrow button - Navigation.js'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().navigationPrevButton().then(
                    function (prevButton) {
                        prevButton.click().then(
                            callback,
                            function() {
                                callback.fail('clicking prev failed');
                            });
                    },
                    function () {
                        callback.fail("button next not found");
                    });
            });
    });

    this.Then(/^the content of the page (\d+) is displayed to the user$/, function (arg1, callback) {
        if(showsteps) { console.log('Then the content of the page "' + arg1 + '" is displayed to the user - Navigation.js'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().selectedThumbnailLabels().then(
                    function (labels) {
                        var actual = '';
                        var label = labels[0];
                        for(i = 0; i < labels.length; i++){
                            label = labels[i];
                            label.getText().then(
                                function (labelText) {
                                    labelText = labelText.trim();
                                    if(labelText == arg1) {
                                        callback();
                                    } else {
                                        actual =+ labelText;
                                        if(i == labels.length - 1) {
                                            callback.fail("Expected labelText(" + actual + ") to be equal arg1(" + arg1 + ")");
                                        }
                                    }
                                },
                                function() {
                                    callback.fail('get label text failed');
                                });
                        }
                    },
                    function () {
                        callback.fail("incorrect page label");
                    });
            });
    });

    this.Given(/^the Viewer is on full screen mode$/, function (callback) {
        if(showsteps) { console.log('Given the Viewer is on full screen mode'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().fullScreenButton().then(
                    function (fullScreenButton) {
                        fullScreenButton.click().then(
                            callback,
                            function() {
                                callback.fail('clicking full screen button failed');
                            }
                        );
                    },
                    function () {
                        if(showdebug) { console.log('could not find full screen button so must be in full screen mode already'); }
                        callback();
                    });
            });
    });

    this.Given(/^the user is viewing the Viewer on its very first page$/, function (callback) {
        if(showsteps) { console.log('Given the user is viewing the Viewer on its very first page'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().navigationFirstButton().then(
                    function(firstButton){
                        firstButton.click().then(
                            callback,
                            function() {
                                callback.fail('clicking navigation first item button failed');
                            });
                    },
                    function(){
                        callback.fail('navigation first item button not found');
                    });
            });
    });

    this.Then(/^the Previous arrow button is disabled$/, function (callback) {
        if(showsteps) { console.log('Then the Previous arrow button is disabled'); }
        new ViewerPage().resetFrame(
            function() {
                var vp = new ViewerPage();
                vp.sleep(vp.reactionDelay).then(
                    function() {
                        new ViewerPage().navigationPrevDisabledButton().then(
                            function(disabledNavigationPrevButton) {
                                new ViewerPage().resetFrame(
                                    function() {
                                        new ViewerPage().canvasPrevDisabledButton().then(
                                            function(disabledCanvasPrevButton) {
                                                callback();
                                            },
                                            function() {
                                                callback.fail('Canvas previous page arrow should be disabled');
                                            });
                                    });
                            },
                            function() {
                                callback.fail('Previous button should be disabled');
                            });
                    });
            });
    });

    this.Given(/^the user is viewing the Viewer in its last page$/, function (callback) {
        if(showsteps) { console.log('Given the user is viewing the Viewer in its last page'); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().navigationLastButton().then(
                    function (lastButton) {
                        lastButton.click().then(
                            callback,
                            function() {
                                callback.fail('clicking navigation last item button failed');
                            });
                    },
                    function () {
                        callback.fail("button last page not found");
                    });
            });
    });

    this.Then(/^the Next arrow is disabled$/, function (callback) {
        if(showsteps) { console.log('Then the Next arrow is disabled'); }
        new ViewerPage().resetFrame(
            function() {
                var vp = new ViewerPage();
                vp.sleep(vp.reactionDelay).then(
                    function() {
                        new ViewerPage().navigationNextDisabledButton().then(
                            function (disabledNavigationNextButton) {
                                new ViewerPage().resetFrame(
                                    function() {
                                        new ViewerPage().canvasNextDisabledButton().then(
                                            function(disabledCanvasNextButton) {
                                                callback();
                                            },
                                            function () {
                                                callback.fail('Canvas next page arrow should be disabled');
                                            });
                                    });
                            },
                            function () {
                                callback.fail('Next button should be disabled');
                            });
                    });
            });
    });

    this.When(/^they go to the page (\d+)$/, function (arg1, callback) {
        if(showsteps) { console.log('When they go to the page "'+ arg1); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().searchText().then(
                    function (searchText) {
                        searchText.clear();
                        searchText.sendKeys(arg1);
                        new ViewerPage().resetFrame(
                            function() {
                                new ViewerPage().goButton().then(
                                    function (goButton) {
                                        goButton.click().then(
                                            callback,
                                            function() {
                                                callback.fail('clicking go button failed');
                                            });
                                    },
                                    function () {
                                        callback.fail("button go not found");
                                    });
                            });
                    },
                    function () {
                        callback.fail("page search text box not found");
                    });
            });
    });

    this.Then(/^the image is labeled with page (\d+)$/, function (arg1, callback) {
        if(showsteps) { console.log('Then the image is labeled with page "'+ arg1); }
        new ViewerPage().resetFrame(
            function() {
                new ViewerPage().selectedThumbnailLabels().then(
                    function (labels) {
                        var label;
                        var actual;
                        for(i = 0; i < labels.length; i++){
                            label = labels[i];
                            label.getText().then(
                                function (labelText) {
                                    labelText = labelText.trim();
                                    if(labelText.substring(0,2) == arg1) {
                                        callback();
                                    } else {
                                        actual =+ labelText;
                                        if(i == labels.length - 1) {
                                            callback.fail("page label (" + actual + ") should be (" + arg1 + ")");
                                        }
                                    }
                                },
                                function () {
                                    callback.fail('could not get text of thumbnail label');
                                });
                        }
                    },
                    function () {
                        callback.fail('could not find thumbnail labels');
                    });
            });
    });
};

module.exports = Navigation;