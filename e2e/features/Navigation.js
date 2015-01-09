var ViewerPage = require("./PageObjects/ViewerPage.js");

var Navigation = function() {

    this.Given(/^the user is viewing the Viewer on page (\d+)$/, function (arg1, callback) {
        console.log('Given the user is viewing the Viewer on page ' + arg1 + ' - Navigation.js');

        new ViewerPage()
            .searchText()
            .then(function (searchText) {
                console.log('searchText: ' + searchText);
                searchText.clear();
                searchText.sendKeys(arg1);
                new ViewerPage()
                    .goButton()
                    .then(function (go) {
                        go.click()
                            .then(function() {
                                console.log('switched to default content');
                                callback();
                            },
                            function() {
                                callback.fail('Could not click in button GO');
                            }
                        );
                    },
                    function () {
                        callback.fail("button go not found");
                    }
                )
            },
            function () {
                callback.fail("page search text box not found");
            }
        );
    });

    this.When(/^they click the Next arrow button$/, function (callback) {
        console.log('When they click the Next arrow button - Navigation.js');

        new ViewerPage()
            .navigationNextButton()
            .then(function(next){
                next.click();
                callback();
            },
            function(){
                callback.fail("button next not found");
            }
        );
    });

    this.When(/^they click the Previous arrow button$/, function (callback) {
        console.log('When they click the Previous arrow button - Navigation.js');

            new ViewerPage()
                .navigationPrevButton()
                .then(function (prev) {
                    prev.click();
                    callback();
                },
                function () {
                    callback.fail("button next not found");
                }
            );
    });

    this.Then(/^the content of the page (\d+) is displayed to the user$/, function (arg1, done) {
        console.log('Then the content of the page "' + arg1 + '" is displayed to the user - Navigation.js');

            new ViewerPage()
                .selectedThumbnailLabels()
                .then(function (labels) {
                    var actual = '';
                    var label = labels[0];
                    for(i = 0; i < labels.length; i++){
                        label = labels[i];
                        label
                            .getText()
                            .then(function (labelText) {
                                labelText = labelText.trim();
                                if(labelText == arg1)
                                    done();
                                else {
                                    actual =+ labelText;
                                    if(i == labels.length - 1) {
                                        done.fail("Expected labelText(" + actual + ") to be equal arg1(" + arg1 + ")");
                                    }
                                }
                            });
                    }
                },
                function () {
                    done.fail("incorrect page label");
                });
    });

    //TODO: Assert that Viewer is on full screen
    this.Given(/^the Viewer is on full screen mode$/, function (callback) {
        console.log('Given the Viewer is on full screen mode - Navigation.js');

        new ViewerPage()
            .fullScreenButton()
            .then(function (fs) {
                fs.click();
                callback();
            },
            function () {
                callback();
            });
    });

    this.Given(/^the user is viewing the Viewer on its very first page$/, function (callback) {
        console.log('Given the user is viewing the Viewer on its very first page - Navigation.js');

        new ViewerPage()
            .navigationFirstButton()
            .then(function(fs){
                fs.click();
                callback();
            },
            function(){
                callback.fail("Full screen option not found");
            }
        );
    });

    this.Then(/^the Previous arrow button is disabled$/, function (callback) {
        console.log('Then the Previous arrow button is disabled - Navigation.js');
        new ViewerPage()
            .sleep(3000)
            .then(function() {
                new ViewerPage()
                    .navigationPrevDisabledButton()
                    .then(function(el) {
                        new ViewerPage()
                            .canvasPrevDisabledButton()
                            .then(function(el) {
                                callback();
                            },
                            function() {
                                callback.fail('Canvas previous page arrow should be disabled');
                            });
                    },
                    function() {
                        callback.fail('Previous button should be disabled');
                    });
            });
    });

    this.Given(/^the user is viewing the Viewer in its last page$/, function (callback) {
        console.log('Given the user is viewing the Viewer in its last page - Navigation.js');

            new ViewerPage()
                .navigationLastButton()
                .then(function (go) {
                    go.click();
                    callback();
                },
                function () {
                    callback.fail("button last page not found");
                });
    });

    this.Then(/^the Next arrow is disabled$/, function (callback) {
        console.log('Then the Next arrow is disabled - Navigation.js');
        new ViewerPage()
            .sleep(3000)
            .then(function() {
            new ViewerPage()
                .navigationNextDisabledButton()
                .then(function () {
                    new ViewerPage()
                        .canvasNextDisabledButton()
                        .then(function () {
                            callback();
                        }, function () {
                            callback.fail('Canvas next page arrow should be disabled');
                        });
                },
                function () {
                    callback.fail('Previous button should be disabled');
                });
        });
    });

    this.When(/^they go to the page (\d+)$/, function (arg1, callback) {
        console.log('When they go to the page "'+ arg1 + '" - Navigation.js');

        new ViewerPage()
            .searchText()
            .then(function (searchText) {
                searchText.clear();
                searchText.sendKeys(arg1);
                new ViewerPage()
                    .goButton()
                    .then(function (go) {
                        go.click();
                        callback();
                    },
                    function () {
                        callback.fail("button go not found");
                    }
                );
            },
            function () {
                callback.fail("page search text box not found");
            });
    });

    this.Then(/^the image is labeled with page (\d+)$/, function (arg1, callback) {
        console.log('Then the image is labeled with page "'+ arg1 + '" - Navigation.js');

        new ViewerPage()
            .selectedThumbnailLabels()
            .then(function (labels) {
                var label;
                var actual;
                for(i = 0; i < labels.length; i++){
                    label = labels[i];
                    label.getText()
                        .then(function (labelText) {
                            labelText = labelText.trim();
                            if(labelText.substring(0,2) == arg1){
                                callback();
                            }else{
                                actual =+ labelText;
                                if(i == labels.length - 1) {
                                    callback.fail("page label (" + actual + ") should be (" + arg1 + ")");
                                }
                            }
                        },
                        function () {
                            callback.fail("problems");
                        });
                }

            },
            function () {
                callback.fail("ino label found");
            });
    });

};

module.exports = Navigation;